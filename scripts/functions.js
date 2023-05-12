////////////////////////////////////////////////////////////////////////////
//                                                                        //
//             This file was generated with "slingr-helpgen"              //
//                                                                        //
//               For more info, check the following links:                //
//             https://www.npmjs.com/package/slingr-helpgen               //
//           https://github.com/slingr-stack/slingr-helpgen               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////

endpoint.customers = {};

endpoint.customers.bankAccounts = {};

endpoint.customers.bankAccounts.createFromToken = {};

endpoint.customers.cards = {};

endpoint.customers.cards.createFromToken = {};

endpoint.payments = {};

endpoint.payments.charges = {};

endpoint.payments.charges.refunds = {};

endpoint.payments.charges.capture = {};

endpoint.payments.txnRequests = {};

endpoint.payments.txnRequests.void = {};

endpoint.payments.echecks = {};

endpoint.payments.echecks.refunds = {};

endpoint.payments.tokens = {};

endpoint.payments.tokens.ie = {};

endpoint.customers.bankAccounts.post = function(customerId, httpOptions) {
    if (!customerId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [customerId].');
        return;
    }
    var url = parse('/customers/:customerId/bank-accounts', [customerId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.customers.bankAccounts.createFromToken.post = function(customerId, httpOptions) {
    if (!customerId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [customerId].');
        return;
    }
    var url = parse('/customers/:customerId/bank-accounts/createFromToken', [customerId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.customers.bankAccounts.delete = function(customerId, accountId, httpOptions) {
    if (!customerId || !accountId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [customerId,accountId].');
        return;
    }
    var url = parse('/customers/:customerId/bank-accounts/:accountId', [customerId, accountId]);
    sys.logs.debug('[quickbookspayments] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.customers.bankAccounts.get = function(customerId, accountId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        } 
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/customers/:customerId/bank-accounts', [customerId]);
			break;
		case 2:
			url = parse('/customers/:customerId/bank-accounts/:accountId', [customerId, accountId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[quickbookspayments] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};

endpoint.customers.cards.post = function(customerId, httpOptions) {
    if (!customerId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [customerId].');
        return;
    }
    var url = parse('/customers/:customerId/cards', [customerId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.customers.cards.createFromToken.post = function(customerId, httpOptions) {
    if (!customerId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [customerId].');
        return;
    }
    var url = parse('/customers/:customerId/cards/createFromToken', [customerId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.customers.cards.delete = function(customerId, cardId, httpOptions) {
    if (!customerId || !cardId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [customerId,cardId].');
        return;
    }
    var url = parse('/customers/:customerId/cards/:cardId', [customerId, cardId]);
    sys.logs.debug('[quickbookspayments] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.customers.cards.get = function(customerId, cardId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        } 
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/customers/:customerId/cards', [customerId]);
			break;
		case 2:
			url = parse('/customers/:customerId/cards/:cardId', [customerId, cardId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[quickbookspayments] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};

endpoint.payments.charges.post = function(httpOptions) {
    var url = parse('/payments/charges');
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.payments.charges.refunds.get = function(chargeId, refundId, httpOptions) {
    if (!chargeId || !refundId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [chargeId,refundId].');
        return;
    }
    var url = parse('/payments/charges/:chargeId/refunds/:refundId', [chargeId, refundId]);
    sys.logs.debug('[quickbookspayments] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.payments.charges.get = function(chargeId, httpOptions) {
    if (!chargeId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [chargeId].');
        return;
    }
    var url = parse('/payments/charges/:chargeId', [chargeId]);
    sys.logs.debug('[quickbookspayments] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.payments.charges.refunds.post = function(chargeId, httpOptions) {
    if (!chargeId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [chargeId].');
        return;
    }
    var url = parse('/payments/charges/:chargeId/refunds', [chargeId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.payments.charges.capture.post = function(chargeId, httpOptions) {
    if (!chargeId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [chargeId].');
        return;
    }
    var url = parse('/payments/charges/:chargeId/capture', [chargeId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.payments.txnRequests.void.post = function(chargeRequestId, httpOptions) {
    if (!chargeRequestId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [chargeRequestId].');
        return;
    }
    var url = parse('/payments/txn-requests/:chargeRequestId/void', [chargeRequestId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.payments.echecks.post = function(httpOptions) {
    var url = parse('/payments/echecks');
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.payments.echecks.refunds.get = function(echeckId, refundId, httpOptions) {
    if (!echeckId || !refundId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [echeckId,refundId].');
        return;
    }
    var url = parse('/payments/echecks/:echeckId/refunds/:refundId', [echeckId, refundId]);
    sys.logs.debug('[quickbookspayments] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.payments.echecks.get = function(echeckId, httpOptions) {
    if (!echeckId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [echeckId].');
        return;
    }
    var url = parse('/payments/echecks/:echeckId', [echeckId]);
    sys.logs.debug('[quickbookspayments] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.payments.echecks.refunds.post = function(echeckId, httpOptions) {
    if (!echeckId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [echeckId].');
        return;
    }
    var url = parse('/payments/echecks/:echeckId/refunds', [echeckId]);
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.payments.tokens.post = function(httpOptions) {
    var url = parse('/payments/tokens');
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.payments.tokens.ie.post = function(httpOptions) {
    var url = parse('/payments/tokens/ie');
    sys.logs.debug('[quickbookspayments] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

////////////////////////////////////
// Public API - Generic Functions //
////////////////////////////////////

endpoint.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options, callbackData, callbacks);
};

endpoint.post = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options, callbackData, callbacks);
};

endpoint.put = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._put(options, callbackData, callbacks);
};

endpoint.patch = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._patch(options, callbackData, callbacks);
};

endpoint.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options, callbackData, callbacks);
};

endpoint.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._head(options, callbackData, callbacks);
};

endpoint.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._options(options, callbackData, callbacks);
};

endpoint.utils = {};

endpoint.utils.parseTimestamp = function(dateString) {
    if (!dateString) {
        return null;
    }
    var dt = dateString.split(/[: T\-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
};

endpoint.utils.formatTimestamp = function(date) {
    if (!date) {
        return null;
    }
    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() )
        + 'T' + pad( date.getUTCHours() )
        + ':' + pad( date.getUTCMinutes() )
        + ':' + pad( date.getUTCSeconds() )
        + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
};

endpoint.utils.fromDateToTimestamp = function(params) {
    if (!!params) {
        return {timestamp: new Date(params).getTime()};
    }
    return null;
};

endpoint.utils.fromMillisToDate = function(params) {
    if (!!params) {
        var sdf = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'UTC'
        });
        return {date: sdf.format(new Date(parseInt(params)))};
    }
    return null;
};

///////////////////////
//  Private helpers  //
///////////////////////

var mergeJSON = function (json1, json2) {
    const result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}

var concatQuery = function (url, key, value) {
    return url + ((!url || url.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
}

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
}

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

var stringType = Function.prototype.call.bind(Object.prototype.toString)

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
                if (typeof (args[i]) != 'string') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
}