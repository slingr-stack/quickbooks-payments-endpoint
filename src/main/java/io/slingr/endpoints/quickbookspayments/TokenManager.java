package io.slingr.endpoints.quickbookspayments;

import io.slingr.endpoints.services.HttpService;
import io.slingr.endpoints.services.datastores.DataStore;
import io.slingr.endpoints.services.datastores.DataStoreResponse;
import io.slingr.endpoints.services.rest.RestClient;
import io.slingr.endpoints.utils.Json;

import javax.ws.rs.core.Form;

public class TokenManager {

    private static final String QUICKBOOKS_REFRESH_TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

    public static final String DATA_STORE = "tokens";
    private static final String LAST_TOKEN = "_LAST_TOKEN";
    private static final String ID = "_id";
    private static final String TIMESTAMP = "timestamp";
    private static final String REFRESH_TOKEN = "refreshToken";
    private static final String ACCESS_TOKEN = "accessToken";
    private static final String VERIFIER_TOKEN = "verifierToken";

    private DataStore ds;
    private String clientId;
    private String clientSecret;
    private String accessToken;
    private String refreshToken;
    private String verifierToken;
    private HttpService httpService;

    TokenManager(HttpService httpService, DataStore ds, String clientId, String clientSecret, String accessToken,
                 String refreshToken, String verifierToken) {

        this.httpService = httpService;
        this.ds = ds;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.verifierToken = verifierToken;

        this.setLastToken();
        this.setupToken();
    }

    public void setLastToken() {

        Json filter = Json.map();
        filter.set(ACCESS_TOKEN, this.accessToken);
        filter.set(REFRESH_TOKEN, this.refreshToken);

        Json lastToken = this.getLastToken();
        DataStoreResponse dsResp = ds.find(filter);

        if (dsResp != null && dsResp.getItems().size() == 0 || lastToken == null) { // new token was added

            Json newToken = Json.map();
            newToken.set(ACCESS_TOKEN, this.accessToken);
            newToken.set(REFRESH_TOKEN, this.refreshToken);
            newToken.set(VERIFIER_TOKEN, this.verifierToken);
            newToken.set(TIMESTAMP, System.currentTimeMillis());

            this.ds.save(newToken);

            newToken.set(ID, LAST_TOKEN);
            this.ds.save(newToken);
        } else {
            this.accessToken = lastToken.string(ACCESS_TOKEN);
            this.refreshToken= lastToken.string(REFRESH_TOKEN);
            this.verifierToken = lastToken.string(VERIFIER_TOKEN);
        }

    }

    public String getToken() {
        return this.accessToken;
    }

    public String getVerifierToken() {
        return this.verifierToken;
    }

    public void refreshQuickBooksToken() {

        Form formBody = new Form().param("grant_type", "refresh_token").param("refresh_token", refreshToken);
        Json refreshTokenResponse = RestClient.builder(QUICKBOOKS_REFRESH_TOKEN_URL)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "application/json")
                .basicAuthenticationHeader(clientId, clientSecret)
                .post(formBody);

        refreshToken = refreshTokenResponse.string("refresh_token");
        accessToken = refreshTokenResponse.string("access_token");

        Json lastToken = this.getLastToken();

        lastToken.set(ACCESS_TOKEN, accessToken);
        lastToken.set(REFRESH_TOKEN, refreshToken);
        lastToken.set(TIMESTAMP, System.currentTimeMillis());
        ds.save(lastToken);

        this.setupToken();

    }

    public void setupToken() {
        httpService.setupBearerAuthenticationHeader(getToken());
        httpService.setupDefaultHeader("Accept", "application/json");
    }


    private Json getLastToken() {

        try {
            return this.ds.findById(LAST_TOKEN);
        } catch (Exception ex) {
            return null;
        }
    }

}
