# Javascript API

The Javascript API of the quickbookspayments endpoint has three pieces:

- **HTTP requests**: These allow to make regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the endpoint usage in SLINGR.

## HTTP requests
You can make `POST`,`DELETE`,`GET` requests to the [quickbookspayments API](API_URL_HERE) like this:
```javascript
var response = app.endpoints.quickbookspayments.post('/customers/:customerId/cards', body)
var response = app.endpoints.quickbookspayments.post('/customers/:customerId/cards')
var response = app.endpoints.quickbookspayments.delete('/customers/:customerId/bank-accounts/:accountId')
var response = app.endpoints.quickbookspayments.get('/customers/:customerId/bank-accounts')
```

Please take a look at the documentation of the [HTTP endpoint](https://github.com/slingr-stack/http-endpoint#javascript-api)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the endpoint:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/customers/:customerId/bank-accounts'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.bankAccounts.post(customerId, body)
```
---
* API URL: '/customers/:customerId/bank-accounts/createFromToken'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.bankAccounts.createFromToken.post(customerId, body)
```
---
* API URL: '/customers/:customerId/cards'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.cards.post(customerId, body)
```
---
* API URL: '/customers/:customerId/cards/createFromToken'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.cards.createFromToken.post(customerId, body)
```
---
* API URL: '/payments/charges'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.charges.post(body)
```
---
* API URL: '/payments/charges/:chargeId/refunds'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.charges.refunds.post(chargeId, body)
```
---
* API URL: '/payments/charges/:chargeId/capture'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.charges.capture.post(chargeId, body)
```
---
* API URL: '/payments/txn-requests/:chargeRequestId/void'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.txnRequests.void.post(chargeRequestId, body)
```
---
* API URL: '/payments/echecks'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.echecks.post(body)
```
---
* API URL: '/payments/echecks/:echeckId/refunds'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.echecks.refunds.post(echeckId, body)
```
---
* API URL: '/payments/tokens'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.tokens.post(body)
```
---
* API URL: '/payments/tokens/ie'
* HTTP Method: 'POST'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.tokens.ie.post(body)
```
---
* API URL: '/customers/:customerId/bank-accounts/:accountId'
* HTTP Method: 'DELETE'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.bankAccounts.delete(customerId, accountId)
```
---
* API URL: '/customers/:customerId/cards/:cardId'
* HTTP Method: 'DELETE'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.cards.delete(customerId, cardId)
```
---
* API URL: '/customers/:customerId/bank-accounts'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.bankAccounts.get()
```
---
* API URL: '/customers/:customerId/bank-accounts/:accountId'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.bankAccounts.get(customerId)
```
---
* API URL: '/customers/:customerId/cards'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.cards.get()
```
---
* API URL: '/customers/:customerId/cards/:cardId'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.customers.cards.get(customerId)
```
---
* API URL: '/payments/charges/:chargeId/refunds/:refundId'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.charges.refunds.get(chargeId, refundId)
```
---
* API URL: '/payments/charges/:chargeId'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.charges.get(chargeId)
```
---
* API URL: '/payments/echecks/:echeckId/refunds/:refundId'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.echecks.refunds.get(echeckId, refundId)
```
---
* API URL: '/payments/echecks/:echeckId'
* HTTP Method: 'GET'
* More info: https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts
```javascript
app.endpoints.quickbookspayments.payments.echecks.get(echeckId)
```
---

</details>
    
## Flow Step

As an alternative option to using scripts, you can make use of Flows and Flow Steps specifically created for the endpoint: 
<details>
    <summary>Click here to see the Flow Steps</summary>

<br>



### Generic Flow Step

Generic flow step for full use of the entire endpoint and its services.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>URL (Method)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            This is the http method to be used against the endpoint. <br>
            Possible values are: <br>
            <i><strong>POST,DELETE,GET</strong></i>
        </td>
    </tr>
    <tr>
        <td>URL (Path)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The url to which this endpoint will send the request. This is the exact service to which the http request will be made. <br>
            Possible values are: <br>
            <i><strong>/customers/{customerId}/bank-accounts<br>/customers/{customerId}/bank-accounts/createFromToken<br>/customers/{customerId}/cards<br>/customers/{customerId}/cards/createFromToken<br>/payments/charges<br>/payments/charges/{chargeId}/refunds<br>/payments/charges/{chargeId}/capture<br>/payments/txn-requests/{chargeRequestId}/void<br>/payments/echecks<br>/payments/echecks/{echeckId}/refunds<br>/payments/tokens<br>/payments/tokens/ie<br>/customers/{customerId}/bank-accounts/{accountId}<br>/customers/{customerId}/cards/{cardId}<br>/customers/{customerId}/bank-accounts<br>/customers/{customerId}/bank-accounts/{accountId}<br>/customers/{customerId}/cards<br>/customers/{customerId}/cards/{cardId}<br>/payments/charges/{chargeId}/refunds/{refundId}<br>/payments/charges/{chargeId}<br>/payments/echecks/{echeckId}/refunds/{refundId}<br>/payments/echecks/{echeckId}<br></strong></i>
        </td>
    </tr>
    <tr>
        <td>Headers</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom http header for the request.
        </td>
    </tr>
    <tr>
        <td>Query Params</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom query params for the http call.
        </td>
    </tr>
    <tr>
        <td>Body</td>
        <td>json</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A payload of data can be sent to the server in the body of the request.
        </td>
    </tr>
    <tr>
        <td>Override Settings</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td></td>
    </tr>
    <tr>
        <td>Follow Redirect</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Indicates that the resource has to be downloaded into a file instead of returning it in the response.</td>
    </tr>
    <tr>
        <td>Download</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>If true the method won't return until the file has been downloaded, and it will return all the information of the file.</td>
    </tr>
    <tr>
        <td>File name</td>
        <td>text</td>
        <td>no</td>
        <td></td>
        <td> overrideSettings </td>
        <td>If provided, the file will be stored with this name. If empty the file name will be calculated from the URL.</td>
    </tr>
    <tr>
        <td>Full response</td>
        <td> boolean </td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Include extended information about response</td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 5000 </td>
        <td> overrideSettings </td>
        <td>Connect timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    <tr>
        <td>Read Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 60000 </td>
        <td> overrideSettings </td>
        <td>Read timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


</details>

For more information about how shortcuts or flow steps works, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Flow Step


<details>
    <summary>Click here to see the Customs Flow Steps</summary>

<br>



### Custom Flow Steps Name

Description of Custom Flow Steps

*MANUALLY ADD THE DOCUMENTATION OF THESE FLOW STEPS HERE...*


</details>

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*