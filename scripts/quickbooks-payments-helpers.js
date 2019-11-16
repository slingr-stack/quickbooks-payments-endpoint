//////////////////////////////////////////////////////////////////////////
//                                                                      //
//    This file is generated with gen/gen-quickbooks-payments-helpers.js//
//                                                                      //
//            Sat Nov 16 2019 16:09:47 GMT-0300 (Argentina Standard Time)                   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


var urlsData = {
	"customers.bankaccounts.post": {
		"1": "customers/:customerId/bank-accounts"
	},
	"customers.bankaccounts.createfromtoken.post": {
		"1": "customers/:customerId/bank-accounts/createFromToken"
	},
	"customers.bankaccounts.delete": {
		"2": "customers/:customerId/bank-accounts/:accountId"
	},
	"customers.bankaccounts.get": {
		"1": "customers/:customerId/bank-accounts",
		"2": "customers/:customerId/bank-accounts/:accountId/"
	},
	"customers.cards.post": {
		"1": "customers/:customerId/cards"
	},
	"customers.cards.createfromtoken.post": {
		"1": "customers/:customerId/cards/createFromToken"
	},
	"customers.cards.delete": {
		"2": "customers/:customerId/cards/:cardId"
	},
	"customers.cards.get": {
		"1": "customers/:customerId/cards",
		"2": "customers/:customerId/cards/:cardId/"
	},
	"payments.charges.post": {
		"0": "payments/charges"
	},
	"payments.charges.refunds.get": {
		"2": "payments/charges/:chargeId/refunds/:refundId"
	},
	"payments.charges.get": {
		"1": "payments/charges/:chargeId"
	},
	"payments.charges.refunds.post": {
		"1": "payments/charges/:chargeId/refunds"
	},
	"payments.charges.capture.post": {
		"1": "payments/charges/:chargeId/capture"
	},
	"payments.txnrequests.void.post": {
		"1": "payments/txn-requests/:chargeRequestId/void"
	},
	"payments.echecks.post": {
		"0": "payments/echecks"
	},
	"payments.echecks.refunds.get": {
		"2": "payments/echecks/:echeckId/refunds/:refundId"
	},
	"payments.echecks.get": {
		"1": "payments/echecks/:echeckId"
	},
	"payments.echecks.refunds.post": {
		"1": "payments/echecks/:echeckId/refunds"
	},
	"payments.tokens.post": {
		"0": "payments/tokens"
	},
	"payments.tokens.ie.post": {
		"0": "payments/tokens/ie"
	}
};

var analyzeParams = function (args) {
    var paramsSize = 0;
    var params = [];
    var argumentsObj = null;
    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] != 'object') {
            paramsSize++;
            params.push(args[i]);
        } else {
            argumentsObj = args[i];
        }

    }
    return {
        paramsSize: paramsSize,
        argumentsObj: argumentsObj,
        params: params
    };
};

var getUrl = function (url, params, args, argsToPath) {

    if (!url) {
        return null;
    }

    if (params.length > 0) {
        var i = 0;
        url = url.replace(/:(\w+)/g, function () {
            return params[i++];
        });
    }

    if (args && argsToPath) {
        var tmp = Object.keys(args).map(function (k) {
            return encodeURIComponent(k) + '=' + args[k];
        }).join('&');

        if (url.split("\?").length > 1) {
            url += '&' + tmp;
        } else {
            url += '?' + tmp;
        }
    }

    return url;
};

endpoint.customers = {};
endpoint.customers.bankaccounts = {};
endpoint.customers.bankaccounts.post = function() {
	var obj = urlsData['customers.bankaccounts.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.customers.bankaccounts.createfromtoken = {};
endpoint.customers.bankaccounts.createfromtoken.post = function() {
	var obj = urlsData['customers.bankaccounts.createfromtoken.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.customers.bankaccounts.delete = function() {
	var obj = urlsData['customers.bankaccounts.delete'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.delete(url);
};

endpoint.customers.bankaccounts.get = function() {
	var obj = urlsData['customers.bankaccounts.get'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.get(url);
};

endpoint.customers.cards = {};
endpoint.customers.cards.post = function() {
	var obj = urlsData['customers.cards.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.customers.cards.createfromtoken = {};
endpoint.customers.cards.createfromtoken.post = function() {
	var obj = urlsData['customers.cards.createfromtoken.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.customers.cards.delete = function() {
	var obj = urlsData['customers.cards.delete'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.delete(url);
};

endpoint.customers.cards.get = function() {
	var obj = urlsData['customers.cards.get'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.get(url);
};

endpoint.payments = {};
endpoint.payments.charges = {};
endpoint.payments.charges.post = function() {
	var obj = urlsData['payments.charges.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.payments.charges.refunds = {};
endpoint.payments.charges.refunds.get = function() {
	var obj = urlsData['payments.charges.refunds.get'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.get(url);
};

endpoint.payments.charges.get = function() {
	var obj = urlsData['payments.charges.get'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.get(url);
};

endpoint.payments.charges.refunds.post = function() {
	var obj = urlsData['payments.charges.refunds.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.payments.charges.capture = {};
endpoint.payments.charges.capture.post = function() {
	var obj = urlsData['payments.charges.capture.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.payments.txnrequests = {};
endpoint.payments.txnrequests.void = {};
endpoint.payments.txnrequests.void.post = function() {
	var obj = urlsData['payments.txnrequests.void.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.payments.echecks = {};
endpoint.payments.echecks.post = function() {
	var obj = urlsData['payments.echecks.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.payments.echecks.refunds = {};
endpoint.payments.echecks.refunds.get = function() {
	var obj = urlsData['payments.echecks.refunds.get'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.get(url);
};

endpoint.payments.echecks.get = function() {
	var obj = urlsData['payments.echecks.get'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, true);
	return endpoint.get(url);
};

endpoint.payments.echecks.refunds.post = function() {
	var obj = urlsData['payments.echecks.refunds.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.payments.tokens = {};
endpoint.payments.tokens.post = function() {
	var obj = urlsData['payments.tokens.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

endpoint.payments.tokens.ie = {};
endpoint.payments.tokens.ie.post = function() {
	var obj = urlsData['payments.tokens.ie.post'];
	var params = analyzeParams(arguments);
	var url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, false);
	return endpoint.post(url, params.argumentsObj);
};

