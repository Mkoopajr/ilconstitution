var vows = require('vows'),
    assert = require('assert'),
    app = require('../server.js'),
    fetch = require('./fetch.js');

var temp = {};

var test = {
    'Is loaded': {
        topic: function() {
            return app;
        },
        'is server': function(topic) {
            assert.ok(topic);
        }
    },
    'Make request': {
        'to': {
            'GET /': {
                topic: function() {
                    var self = this;
                    fetch.get('/', function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.req.path, '/');
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
                    assert.equal(topic.req.path, '/about');
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
                    assert.equal(topic.req.path, '/study');
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
                    fetch.get('/start', true, function(err, res) {
                        self.callback(err, res);
                    });
                },
                'should answer with 200': function(topic) {
                    assert.equal(topic.statusCode, 200);
                },
                'then POST /check (with cookie no answer)': {
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
                'then POST /check (with cookie and answer)': {
                    topic: function() {
                        var self = this;

                        fetch.getApi('/grab', true, function(err, res) {
                            temp.question = res.body.answer;

                            fetch.post('/check', true, temp, function(err, res) {
                                self.callback(err, res);
                            });
                        });
                    },
                    'should answer with 200': function(topic) {
                        assert.equal(topic.statusCode, 200);
                    }
                },
                'then POST /check (with cookie and wrong answer)': {
                    topic: function() {
                        var self = this;
                        fetch.post('/check', true, {'question': ['100']}, function(err, res) {
                            self.callback(err, res);
                        });
                    },
                    'should answer with 200': function(topic) {
                        assert.equal(topic.statusCode, 200);
                    }
                },
                'then GET /next (with cookie)': {
                    topic: function() {
                        var self = this;
                        fetch.get('/next', true, function(err, res) {
                            self.callback(err, res);
                        });
                    },
                    'should answer with 200': function(topic) {
                        assert.equal(topic.req.path, '/next');
                        assert.equal(topic.statusCode, 200);
                    }
                }
            },
            'GET /next (no cookie)': {
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
            }
        }
    }
}

vows.describe('test.js').addBatch(test).export(module);
