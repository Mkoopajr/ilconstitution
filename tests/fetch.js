var request = require('request'),
    j = request.jar(),
    altJ = request.jar();

exports.getApi = function(path, cookieJar, cb) {
    var args = [];
    for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
    }

    path = args.shift();
    cb = args.pop();
    cookieJar = (args.length > 0 && args[0] === true) ? j : null;

    var url = 'http://127.0.0.1:3000' + path;

    request({url: url, jar: cookieJar, json: true}, cb);
};

exports.get = function(path, cookieJar, cb) {

    var args = [];
    for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
    }

    path = args.shift();
    cb = args.pop();
    cookieJar = (args.length > 0 && args[0] === true) ? j : null;

    var url = 'http://127.0.0.1:3001' + path;

    request({url: url, jar: cookieJar}, cb);
};

exports.post = function(path, cookieJar, data, cb) {

    var args = [];
    for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
    }

    path = args.shift();
    cb = args.pop();
    cookieJar = null;
    data = null;

    if (args.length === 1) {
        if (typeof(args[0]) !== 'boolean') {
            data = args[0];
        }
        else {

            if (args[0] === true) {
                cookieJar = j;
            }
        }
    }

    if (args.length === 2) {
        data = args[1];

        if (args[0] === true) {
            cookieJar = j;
        }
    }

    var url = 'http://127.0.0.1:3001' + path;

    request.post({url: url, jar: cookieJar, form: data}, cb);
};

exports.getEnd = function(path, cookieJar, cb) {

    var args = [];
    for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
    }

    path = args.shift();
    cb = args.pop();
    cookieJar = (args.length > 0 && args[0] === true) ? altJ : null;

    var url = 'http://127.0.0.1:3001' + path;

    request({url: url, jar: cookieJar}, cb);
};


exports.postEnd = function(path, cookieJar, data, cb) {

    var args = [];
    for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
    }

    path = args.shift();
    cb = args.pop();
    cookieJar = null;
    data = null;

    if (args.length === 1) {
        if (typeof(args[0]) !== 'boolean') {
            data = args[0];
        }
        else {

            if (args[0] === true) {
                cookieJar = altJ;
            }
        }
    }

    if (args.length === 2) {
        data = args[1];

        if (args[0] === true) {
            cookieJar = altJ;
        }
    }

    var url = 'http://127.0.0.1:3001' + path;

    request.post({url: url, jar: cookieJar, form: data}, cb);
};
