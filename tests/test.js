var vows = require('vows'),
    assert = require('assert'),
    app = require('../server.js'),
    fetch = require('./fetch.js');

var test = {
    'Is loaded': {
        topic: function() {
            return app;
        },
        'is server': function(topic) {
            assert.ok(topic);
        }
    },
    'make request': {
        'to': {
            'GET /': {
                topic: function() {
                    var self = this;
                    fetch.get('/', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET /about': {
                topic: function() {
                    var self = this;
                    fetch.get('/about', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET /study': {
                topic: function() {
                    var self = this;
                    fetch.get('/study', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET 404 page': {
                topic: function() {
                    var self = this;
                    fetch.get('/fakepage', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with /': function(topic) {
                    assert.equal(topic.req.path, '/');
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET /start': {
                topic: function() {
                    var self = this;
                    fetch.get('/start', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET /next': {
                topic: function() {
                    var self = this;
                    fetch.get('/next', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with /start': function(topic) {
                    assert.equal(topic.req.path, '/start');
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET /next with cookie': {
                topic: function() {
                    var self = this;
                    fetch.get('/next', true,  function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET /next end': {
                topic: function() {
                    var self = this;
                    fetch.getEnd('/next', true,  function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'GET /check': {
                topic: function() {
                    var self = this;
                    fetch.get('/check', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with /': function(topic) {
                    assert.equal(topic.req.path, '/');
                    assert.equal(topic.statusCode, 200);
                }
            },
            'POST /check': {
                topic: function() {
                    var self = this;
                    fetch.post('/check', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 500': function(topic) {
                    assert.equal(topic.statusCode, 500);
                }
            },
            'POST /check with cookie': {
                topic: function() {
                    var self = this;
                    fetch.post('/check', true, function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'POST /check with cookie and incorrect payload': {
                topic: function() {
                    var self = this;
                    fetch.post('/check', true, {'question': ['2']}, function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'POST /check with cookie and correct payload': {
                topic: function() {
                    var self = this;
                    fetch.post('/check', true, {'question': ['2', '3']},  function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'POST /check with cookie and correct size but wrong answer': {
                topic: function() {
                    var self = this;
                    fetch.post('/check', true, {'question': ['2', '4']},  function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            },
            'POST /check end': {
                topic: function() {
                    var self = this;
                    fetch.postEnd('/check', true, function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                }
            }
        }
    }
};

vows.describe('test.js').addBatch(test).export(module);
