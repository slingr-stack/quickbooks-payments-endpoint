---
title: QuickBooks Payments endpoint
keywords: 
last_updated: August 09, 2017
tags: []
summary: "Detailed description of the API of the QuickBooks endpoint."
---

## Overview

The QuickBooks Payments endpoint allows you to interact with the QuickBooks Payments API.

Some of the futures are:

- Shortcuts for the REST API

In most cases the provided helpers and events are enough, but if you need to
use the QuickBooks Payments REST API you should go to their documentation for
 [API explorer](https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts).

## Configuration

To obtain the requested fields for configuration you need to log in to your intuit developer account and go to
 [Test connect to app (OAuth)](https://developer.intuit.com/v2/ui#/playground). On this page you need to:

 - Complete the form selecting the app you want to configure on the endpoint.

 - Once you select the app the Client ID and Client Secret fields are being populated. You can copy this values to the endpoint configuration.

 - Select the Scopes (make sure to select `Payments`).

 - Click on Get authorization code and authorize the app.

 - Then click on Get Tokens button.

 - Once you have the Tokens you can start making calls to the API. On this screen you need to access to the step 4 and copy
 the Access Token, the Refresh Token and Minor Version to the endpoint configuration. QuickBooks Online data services support 
 minor versions in order to provide a way for you to access incremental changes without breaking existing apps.

## Javascript API

The Javascript API provides direct access to the QuickBook Accounting API so you can make regular HTTP
request. 

Additionally the endpoint provides some helpers as well as some utilities to convert date times.

### HTTP requests

You can make `GET`, `POST`, `PUT`, and `DELETE` request to the 
[QuickBooks Payments API](https://developer.intuit.com/app/developer/qbpayments/docs/api/resources/all-entities/bankaccounts/) like this:

```js
var res = app.endpoints.quickbookspayments.post('customers/45/cards', {...});

var res = app.endpoints.quickbookspayments.customers.cards.post(45, {...});
```

Please take a look at the documentation of the [HTTP endpoint]({{site.baseurl}}/endpoints_http.html#javascript-api)
for more information.

### Shortcuts Helpers

Instead of having to use the generic HTTP methods, you can make use of the shortcuts provided in the endpoint. These
shortcuts follow these rules:

- **Path sections get converted to namespaces**: for example if the method is GET `~/customers/:customerId/cards` in section Core Resources 
  it is converted to `app.endpoints.quickbookspayments.customers.cards.get(58)`. 
- **If they have dashes, we should remove them**: GET `~/customers/:customerId/bank-accounts` is converted to 
  `app.endpoints.quickbookspayments.customers.bankaccounts.get()`. 
- **HTTP method is appended at the end of the method**: for example if the method is `GET`, you will see a method with 
  the suffix `.get(...)`.  
  This is the mapping of names:
  - `GET`: `get`
  - `POST`: `create`
  - `PUT`: `update`
  - `PATCH`: `update`
  - `DELETE`: `delete`
- **Path variables become method parameters**: if the method has variables in the path, they will become parameters for 
  the method. For example `GET ~/customers/:customerId/` will become 
  `app.endpoints.quickbookspayments.customers.cards.get(123)` where `123` is the `:customerId`.
- **Additional parameters or body are sent in the last param as JSON**: if the method accepts more parameters or it 
  allows to send a body, that will be sent in the last parameter. For example the method `POST ~/customers/:customerId/cards`, 
  so it will become `app.endpoints.quickbookspayments.customers.cards.post(123, {...})`.

Additionally, QuickBooks Payments API require to send a `request-Id` on the headers of `POST`, `PUT` or `DELETE` requests.
You can generate it in your app and send it like this:

```js
app.endpoint.quickbookspayments.customers.cards.post(123, {
    _requestId: 'uuid',
    ...
});
```

Another option, if you don't want to generate it, the endpoint will do it automatically and will return it in case
you want to use it:

```js
var res = app.endpoint.quickbookspayments.customers.cards.post(123, {...});
log(res._requestId);
```
  
Following is a list of available helpers:

    - endpoint.customers.bankaccounts.post = function() { ... }
    - endpoint.customers.bankaccounts.createfromtoken.post = function() { ... }
    - endpoint.customers.bankaccounts.delete = function() { ... }
    - endpoint.customers.bankaccounts.get = function() { ... }
    - endpoint.customers.cards.post = function() { ... }
    - endpoint.customers.cards.createfromtoken.post = function() { ... }
    - endpoint.customers.cards.delete = function() { ... }
    - endpoint.customers.cards.get = function() { ... }
    - endpoint.payments.charges.post = function() { ... }
    - endpoint.payments.charges.refunds.get = function() { ... }
    - endpoint.payments.charges.get = function() { ... }
    - endpoint.payments.charges.refunds.post = function() { ... }
    - endpoint.payments.charges.capture.post = function() { ... }
    - endpoint.payments.txnrequests.void.post = function() { ... }
    - endpoint.payments.echecks.post = function() { ... }
    - endpoint.payments.echecks.refunds.get = function() { ... }
    - endpoint.payments.echecks.get = function() { ... }
    - endpoint.payments.echecks.refunds.post = function() { ... }
    - endpoint.payments.tokens.post = function() { ... }
    - endpoint.payments.tokens.ie.post = function() { ... }

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
