var Hapi = require('hapi'),
    fs = require('fs'),
    routes = require('./lib/routes');

var server = new Hapi.Server();
server.connection({host: '0.0.0.0', port: parseInt(process.env.PORT, 10) || 3000});

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

server.views({
    path: './views',
    layoutPath: './views/layout',
    layout: 'main',
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
    engines: {
        html: require('handlebars')
    }
});

server.route(routes);
server.start(console.log(server.info.uri));
