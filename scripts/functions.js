endpoint.testing = function (method, url, params) {

    sys.logs.info(">> testing [" + method + "] for " + url);

    if (method === 'get') {
        return endpoint.get(url);
    } else if (method === 'post') {
        return endpoint.post(url, params);
    } else if (method === 'put') {
        return endpoint.put(url, params);
    } else if (method === 'delete') {
        return endpoint.delete(url);
    }

};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};


/////////////////////
// Public API - Generic Functions
/////////////////////

endpoint.get = function (url) {
    var options = checkHttpOptions(url, {}, false);
    return endpoint._get(options);
};

endpoint.post = function (url, options, callbackData, callbacks) {
    options = checkHttpOptions(url, options, true);
    var res = endpoint._post(options, callbackData, callbacks);
    res._requestId = options.headers['request-Id'];
    return res;
};

endpoint.delete = function (url) {
    var options = checkHttpOptions(url, {}, true);
    var res = endpoint._delete(options);
    res._requestId = options.headers['request-Id'];
    return res;
};

/////////////////////////////
//  Private helpers
/////////////////////////////

var checkHttpOptions = function (url, options, setRequestId) {
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
    if (setRequestId) {
        var requestId;
        if (options.body && options.body._requestId) {
            requestId = options.body._requestId;
            delete options.body._requestId;
        } else {
            requestId = uuidv4();
        }
        if (!options.headers) {
            options.headers = {};
        }
        options.headers['request-Id'] = requestId;
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);
