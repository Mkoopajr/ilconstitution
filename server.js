var Hapi = require('hapi'),
    fs = require('fs'),
    routes = require('./lib/routes'),
    apiRoutes = require('./lib/api-routes');

var server = new Hapi.Server();

// API server only for testing right now
server.connection({host: '127.0.0.1', port: parseInt(process.env.APIPORT, 10) || 3000, labels: 'api'});
server.connection({host: '0.0.0.0', port: parseInt(process.env.PORT, 10) || 3001, labels: 'web'});

var api = server.select('api'),
    web = server.select('web');

server.state('question', {
    ttl: null,
    isHttpOnly: true,
    encoding: 'base64json'
});

server.state('randomizer', {
    ttl: null,
    isHttpOnly: true,
    encoding: 'base64json'
});

web.views({
    path: './views',
    layoutPath: './views/layout',
    layout: 'main',
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
    engines: {
        html: require('handlebars')
    }
});

web.route(routes);
api.route(apiRoutes);

server.start( function (err) {

    for (x in server.connections) {
        console.log('Server started at: ' + server.connections[x].info.uri);
    }
});
