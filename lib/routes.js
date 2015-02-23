var handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/static/{path*}',
        handler: {
            directory: {
                path: './static',
                listing: false,
                index: false
            }
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: function(req, res) {
            res.view('home.html');
        }
    },
    {
        method: 'GET',
        path: '/start',
        config: handler.startTest
    },
    {
        method: 'GET',
        path: '/next',
        config: handler.nextQuestion
    },
    {
        method: 'POST',
        path: '/check',
        config: handler.checkAnswer
    },
    {
        method: 'GET',
        path: '/about',
        handler: function(req, res) {
            res.view('about.html');
        }
    },
    {
        method: 'GET',
        path: '/study',
        handler: function(req, res) {
            res.view('study.html');
        }
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: function(req, res) {
            res.redirect('/');
        }
    }
]
