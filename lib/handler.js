var MongoClient = require('mongodb').MongoClient;

var uri = process.env.MONGOLAB_URI || 'mongodb://sessionHandler:supersecretpassword@localhost:27017/constitution/?ssl=true';

exports.startTest = {
    handler: function(req, res) {

        MongoClient.connect(uri, function(err, db) {
            if (err) {
                return res(err);
            }

            db.collection('questions', function(err, col) {
                if (err) {
                    db.close();
                    return res(err);
                }

                col.find({}, function(err, cur) {
                    if (err) {
                        db.close();
                        return res(err)
                    }

                    cur.nextObject(function(err, item) {
                        if (err) {
                            db.close();
                            return res(err);
                        }

                        db.close();
                        res.view('questions.html', item)
                            .state('question', {'count': 0, 'right': 0});
                    });
                });
            });
        });
    }
};

exports.nextQuestion = {
    handler: function(req, res) {

        if (!req.state.question) {
            return res.redirect('/start');
        }

        ++req.state.question.count;

        MongoClient.connect(uri, function(err, db) {
            if (err) {
                return res(err);
            }

            db.collection('questions', function(err, col) {
                if (err) {
                    db.close();
                    return res(err);
                }

                col.find({}, {skip: req.state.question.count}, function(err, cur) {
                    if (err) {
                        db.close();
                        return res(err)
                    }

                    cur.nextObject(function(err, item) {
                        if (err) {
                            db.close();
                            return res(err);
                        }

                        db.close();

                        if (item === null) {
                            res.view('done.html', req.state.question);
                        }
                        else {
                            res.view('questions.html', item).state('question', req.state.question);
                        }
                    });
                });
            });
        });
    }
};

exports.checkAnswer = {
    handler: function(req, res) {

        MongoClient.connect(uri, function(err, db) {
            if (err) {
                return res(err);
            }


            db.collection('questions', function(err, col) {
                if (err) {
                    db.close();
                    return res(err);
                }

                col.find({}, {skip: req.state.question.count}, function(err, cur) {
                    if (err) {
                        db.close();
                        return res(err);
                    }

                    cur.nextObject(function(err, item) {
                        if (err) {
                            db.close();
                            return res(err);
                        }

                        db.close();

                        if (item === null) {
                            res.view('done.html');
                        }
                        else {
                            if (!req.payload.question || (req.payload.question.length !== item.answer.length)) {
                                res(item.answer);
                            }
                            else{
                                for (var i = 0; i < item.answer.length; ++i) {
                                    if (req.payload.question[i] !== item.answer[i]) {

                                        return res(item.answer);
                                    }
                                }

                                ++req.state.question.right;

                                res(item.answer).state('question', req.state.question);
                            }
                        }
                    });
                });
            });
        });
    }
};
