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


/////////////////////
// Public API - Generic Functions
/////////////////////

endpoint.get = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._get(options);
};

endpoint.post = function (url, options, callbackData, callbacks) {
    options = checkHttpOptions(url, options);
    return endpoint._post(options, callbackData, callbacks);
};

endpoint.patch = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._patch(options);
};

endpoint.put = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._put(options);
};

endpoint.delete = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._delete(options);
};

/////////////////////////////
//  Private helpers
/////////////////////////////

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
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);
