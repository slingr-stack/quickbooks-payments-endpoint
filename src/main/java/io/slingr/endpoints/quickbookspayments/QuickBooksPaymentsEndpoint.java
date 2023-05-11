package io.slingr.endpoints.quickbookspayments;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.HttpService;
import io.slingr.endpoints.services.datastores.DataStore;
import io.slingr.endpoints.services.datastores.DataStoreResponse;
import io.slingr.endpoints.services.rest.RestClient;
import io.slingr.endpoints.services.rest.RestMethod;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.ws.rs.core.Form;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 * <p>QuickBooks Payments endpoint
 * <p>
 * <p>Created by dgaviola on 11/16/19.
 */
@SlingrEndpoint(name = "quickbookspayments", functionPrefix = "_")
public class QuickBooksPaymentsEndpoint extends HttpEndpoint {
    private static final Logger logger = Logger.getLogger(QuickBooksPaymentsEndpoint.class);

    private static final String QUICKBOOKS_PAYMENTS_SANDBOX_URL = "https://sandbox.api.intuit.com/quickbooks/v4";
    private static final String QUICKBOOKS_PAYMENTS_PRODUCTION_URL = "https://api.intuit.com/quickbooks/v4";
    private static final String QUICKBOOKS_REFRESH_TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
    private static final String INVALID_TOKEN_ERROR = "Bearer realm=\"Intuit\", error=\"invalid_token\"";
    private static final String INTUIT_SIGNATURE = "intuit-signature";
    private static final String ALGORITHM = "HmacSHA256";
    private static final String LAST_TOKEN = "_LAST_TOKEN";
    private static final String ID = "_id";
    private static final String TIMESTAMP = "timestamp";
    private static final String REFRESH_TOKEN = "refreshToken";
    private static final String ACCESS_TOKEN = "accessToken";
    private static final String VERIFIER_TOKEN = "verifierToken";

    @EndpointDataStore
    private DataStore tokens;

    @EndpointProperty
    private String clientId;

    @EndpointProperty
    private String clientSecret;

    @EndpointProperty
    private String quickBooksEnvironment;

    @EndpointProperty
    private String accessToken;

    @EndpointProperty
    private String refreshToken;

    @EndpointProperty
    private String verifierToken;

    @Override
    public String getApiUri() {
        if (quickBooksEnvironment.equalsIgnoreCase("PRODUCTION")) {
            return QUICKBOOKS_PAYMENTS_PRODUCTION_URL;
        }
        return QUICKBOOKS_PAYMENTS_SANDBOX_URL;
    }

    @Override
    public void endpointStarted() {
        logger.info("Starting endpoint");

        Json filter = Json.map();
        filter.set(ACCESS_TOKEN, this.accessToken);
        filter.set(REFRESH_TOKEN, this.refreshToken);
        Json lastToken = this.getLastToken();
        DataStoreResponse dsResp = tokens.find(filter);
        if (dsResp != null && dsResp.getItems().size() == 0 || lastToken == null) {
            Json newToken = Json.map();
            newToken.set(ACCESS_TOKEN, this.accessToken);
            newToken.set(REFRESH_TOKEN, this.refreshToken);
            newToken.set(VERIFIER_TOKEN, verifierToken);
            newToken.set(TIMESTAMP, System.currentTimeMillis());
            newToken.set(ID, LAST_TOKEN);
            this.tokens.save(newToken);
        } else {
            this.accessToken = lastToken.string(ACCESS_TOKEN);
            this.refreshToken= lastToken.string(REFRESH_TOKEN);
            this.verifierToken = lastToken.string(VERIFIER_TOKEN);
        }
        httpService().setupBearerAuthenticationHeader(this.accessToken);
        httpService().setupDefaultHeader("Content-Type", "application/json");
        httpService().setupDefaultHeader("Accept", "application/json");
    }

    @EndpointFunction(name = "_get")
    public Json get(FunctionRequest request) {
        try {
            return defaultGetRequest(request);
        } catch (EndpointException restException) {
            if (checkInvalidTokenError(restException)) {
                this.refreshQuickBooksToken();
                return defaultGetRequest(request);
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) {
        try {
            return defaultPostRequest(request);
        } catch (EndpointException restException) {
            if (checkInvalidTokenError(restException)) {
                this.refreshQuickBooksToken();
                return defaultPostRequest(request);
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_delete")
    public Json delete(FunctionRequest request) {
        try {
            return defaultDeleteRequest(request);
        } catch (EndpointException restException) {
            if (checkInvalidTokenError(restException)) {
                this.refreshQuickBooksToken();
                return defaultPostRequest(request);
            } else if (restException.getMessage() != null && restException.getMessage().contains("Unable to parse \"Content-Type\"")) {
                return Json.map();
            }
            throw restException;
        }
    }

    private boolean checkInvalidTokenError(Exception e) {
        if (e instanceof EndpointException) {
            EndpointException restException = (EndpointException) e;
            return restException.getAdditionalInfo() != null && restException.getAdditionalInfo().json("headers") != null &&
                    StringUtils.isNotBlank(restException.getAdditionalInfo().json("headers").string("WWW-Authenticate")) &&
                    restException.getAdditionalInfo().json("headers").string("WWW-Authenticate").equals(INVALID_TOKEN_ERROR);
        }
        return false;
    }

    @EndpointWebService
    public WebServiceResponse webhooks(WebServiceRequest request) {
        if (request.getMethod().equals(RestMethod.POST) && request.getBody() != null) {
            if (verifyWebHooksSignature(request.getHeader(INTUIT_SIGNATURE), request.getBody().toString())) {
                final Json json = HttpService.defaultWebhookConverter(request);
                events().send(HttpService.WEBHOOK_EVENT, json);
            }
        }
        return HttpService.defaultWebhookResponse();
    }

    private boolean verifyWebHooksSignature(String signature, String payload) {
        if (StringUtils.isBlank(verifierToken)) {
            return true;
        }
        if (signature == null) {
            return false;
        }
        try {
            SecretKeySpec secretKey = new SecretKeySpec(verifierToken.getBytes(StandardCharsets.UTF_8), ALGORITHM);
            Mac mac = Mac.getInstance(ALGORITHM);
            mac.init(secretKey);
            String hash = Base64.getEncoder().encodeToString(mac.doFinal(payload.getBytes()));
            return hash.equals(signature);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            return false;
        }
    }

    private Json getLastToken() {
        try {
            return this.tokens.findById(LAST_TOKEN);
        } catch (Exception ex) {
            return null;
        }
    }

    private void refreshQuickBooksToken() {
        Json refreshTokenResponse = RestClient.builder(QUICKBOOKS_REFRESH_TOKEN_URL)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "application/json")
                .basicAuthenticationHeader(clientId, clientSecret)
                .post(new Form().param("grant_type", "refresh_token").param("refresh_token", refreshToken));
        accessToken = refreshTokenResponse.string("access_token");
        refreshToken = refreshTokenResponse.string("refresh_token");
        Json lastToken = this.getLastToken();
        if (lastToken != null) {
            lastToken
                    .set(ACCESS_TOKEN, accessToken)
                    .set(REFRESH_TOKEN, refreshToken)
                    .set(TIMESTAMP, System.currentTimeMillis());
        }
        this.tokens.save(lastToken);
        httpService().setupBearerAuthenticationHeader(this.accessToken);
        httpService().setupDefaultHeader("Accept", "application/json");
    }
}