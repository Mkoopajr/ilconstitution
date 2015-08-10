var handler = require('./api-handler');

module.exports = [
    {
        method: 'GET',
        path: '/grab',
        config: handler.grab
    }
]
