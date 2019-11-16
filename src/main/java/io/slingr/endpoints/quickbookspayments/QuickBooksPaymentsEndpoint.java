package io.slingr.endpoints.quickbookspayments;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.HttpService;
import io.slingr.endpoints.services.datastores.DataStore;
import io.slingr.endpoints.services.rest.RestMethod;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * <p>QuickBooks Payments endpoint
 * <p>
 * <p>Created by dgaviola on 11/16/19.
 */
@SlingrEndpoint(name = "quickbookspayments", functionPrefix = "_")
public class QuickBooksPaymentsEndpoint extends HttpEndpoint {
    private static final Logger logger = Logger.getLogger(QuickBooksPaymentsEndpoint.class);

    private static final String QUICKBOOKS_PAYMENTS_SANDBOX_URL = "https://sandbox.api.intuit.com/quickbooks/v4/";
    private static final String QUICKBOOKS_PAYMENTS_PRODUCTION_URL = "https://api.intuit.com/quickbooks/v4/";
    private static final String INVALID_TOKEN_ERROR = "Bearer realm=\"Intuit\", error=\"invalid_token\"";
    private static final String QUICKBOOKS_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    private static final String INTUIT_SIGNATURE = "intuit-signature";
    private static final String ALGORITHM = "HmacSHA256";

    private static final long TOKEN_REFRESH_POLLING_TIME = TimeUnit.MINUTES.toMillis(50);

    @EndpointDataStore(name = TokenManager.DATA_STORE)
    private DataStore tokensDataStore;

    @EndpointProperty
    private String clientId;

    @EndpointProperty
    private String clientSecret;

    @EndpointProperty
    private String companyId;

    @EndpointProperty
    private String quickBooksEnvironment;

    @EndpointProperty
    private String accessToken;

    @EndpointProperty
    private String refreshToken;

    @EndpointProperty
    private String verifierToken;

    private ScheduledExecutorService cleanerExecutor;

    private TokenManager tokenManager;

    @Override
    public String getApiUri() {
        switch (quickBooksEnvironment.toUpperCase()) {
            case "PRODUCTION":
                return QUICKBOOKS_PAYMENTS_SANDBOX_URL;
            case "SANDBOX":
            default:
                return QUICKBOOKS_PAYMENTS_PRODUCTION_URL;
        }
    }

    @Override
    public void endpointStarted() {
        this.tokenManager = new TokenManager(httpService(), tokensDataStore, clientId, clientSecret, accessToken, refreshToken, verifierToken);
        Executors.newSingleThreadScheduledExecutor().scheduleWithFixedDelay(tokenManager::refreshQuickBooksToken, TOKEN_REFRESH_POLLING_TIME, TOKEN_REFRESH_POLLING_TIME, TimeUnit.MILLISECONDS);
    }

    @EndpointWebService
    public WebServiceResponse webhooks(WebServiceRequest request) {
        if (request.getMethod().equals(RestMethod.POST) && request.getBody() != null) {
            //verifying signature
            if (verifyWebHooksSignature(request.getHeader(INTUIT_SIGNATURE), request.getBody().toString())) {
                // send the webhook event
                final Json json = HttpService.defaultWebhookConverter(request);
                events().send(HttpService.WEBHOOK_EVENT, json);
            }
        }
        return HttpService.defaultWebhookResponse();
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) {
        try {
            // continue with the default processor
            return defaultPostRequest(request);
        } catch (EndpointException restException) {
            if (checkInvalidTokenError(restException)) {
                //needs to refresh token
                tokenManager.refreshQuickBooksToken();
                return defaultPostRequest(request);
            }
            throw restException;
        }
    }


    @EndpointFunction(name = "_delete")
    public Json delete(FunctionRequest request) {
        try {
            // continue with the default processor
            return defaultDeleteRequest(request);
        } catch (EndpointException restException) {
            if (checkInvalidTokenError(restException)) {
                //needs to refresh token
                tokenManager.refreshQuickBooksToken();
                return defaultPostRequest(request);
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_get")
    public Json get(FunctionRequest request) {
        try {
            // continue with the default processor
            return defaultGetRequest(request);
        } catch (EndpointException restException) {
            if (checkInvalidTokenError(restException)) {
                //needs to refresh token
                tokenManager.refreshQuickBooksToken();
                return defaultGetRequest(request);
            }
            throw restException;
        }
    }

    private boolean checkInvalidTokenError(Exception e) {
        if (e instanceof EndpointException) {
            EndpointException restException = (EndpointException) e;
            if (restException.getAdditionalInfo() != null && restException.getAdditionalInfo().json("headers") != null &&
                    StringUtils.isNotBlank(restException.getAdditionalInfo().json("headers").string("WWW-Authenticate")) &&
                    restException.getAdditionalInfo().json("headers").string("WWW-Authenticate").equals(INVALID_TOKEN_ERROR)) {
                return true;
            }
        }
        return false;
    }

    @EndpointFunction(name = "_convertDateToTimestamp")
    public Json convertDateToTimestamp(Json params) throws IllegalArgumentException {
        if (params != null && params.size() > 0) {
            String dateStr = params.string("date");
            if (StringUtils.isEmpty(dateStr)) {
                throw new IllegalArgumentException("Parameter 'date' is required");
            }
            SimpleDateFormat sdf = new SimpleDateFormat(QUICKBOOKS_DATE_FORMAT);
            try {
                Json res = Json.map();
                Date d = sdf.parse(dateStr);
                return res.set("timestamp", d.getTime());
            } catch (ParseException e) {
                throw new IllegalArgumentException(String.format("Parameter '%s' can not be converted.", dateStr));
            }
        }
        return null;
    }

    @EndpointFunction(name = "_formatFromMillis")
    public Json formatFromMillis(Json params) {
        if (params != null && params.size() > 0) {
            long millis = params.longInteger("millis");
            SimpleDateFormat sdf = new SimpleDateFormat(QUICKBOOKS_DATE_FORMAT);
            Json res = Json.map();
            Date d = new Date(millis);
            return res.set("date", sdf.format(d));
        }
        return null;
    }

    private boolean verifyWebHooksSignature(String signature, String payload) {
        if (StringUtils.isBlank(tokenManager.getVerifierToken())) {
            return true;//we can't verify the signature since the verifier token is not configured
        }
        if (signature == null) {
            return false;
        }
        try {
            SecretKeySpec secretKey = new SecretKeySpec(tokenManager.getVerifierToken().getBytes("UTF-8"), ALGORITHM);
            Mac mac = Mac.getInstance(ALGORITHM);
            mac.init(secretKey);
            // TODO check if is possible to replace with Base64Utils.encode()
            String hash = Base64.getEncoder().encodeToString(mac.doFinal(payload.getBytes()));
            return hash.equals(signature);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException | InvalidKeyException e) {
            return false;
        }
    }
}
