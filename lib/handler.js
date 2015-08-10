var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

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

                var randX = Math.random(),
                    randY = Math.random();

                col.geoNear(randX, randY, {num: 1, spherical: true}, function(err, doc) {
                    if (err) {
                        db.close();
                        return res(err);
                    }

                    db.close();

                    doc.results[0].obj.count = 1;
                    res.view('questions.html', doc.results[0].obj)
                        .state('question', {'count': 1, 'right': 0})
                        .state('randomizer', {'x': randX, 'y': randY, dis: doc.results[0].dis, _id: doc.results[0].obj._id});
                });
            });
        });
    }
};

exports.nextQuestion = {
    handler: function(req, res) {


        if (!req.state.question || !req.state.randomizer) {
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

                var id = new ObjectID(req.state.randomizer._id);

                col.geoNear(req.state.randomizer.x, req.state.randomizer.y, {query: {'_id': {$nin: [id]}}, num: 1, spherical: true, minDistance: req.state.randomizer.dis}, function(err, doc) {
                    if (err) {
                        db.close();
                        return res(err);
                    }

                    db.close();

                    if (doc.results.length === 0) {
                        --req.state.question.count;
                        res.view('done.html', req.state.question);
                    }
                    else {

                        doc.results[0].obj.count = req.state.question.count;
                        req.state.randomizer.dis = doc.results[0].dis;
                        req.state.randomizer._id = doc.results[0].obj._id;

                        res.view('questions.html', doc.results[0].obj)
                            .state('question', req.state.question)
                            .state('randomizer', req.state.randomizer);
                    }
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

                var id = new ObjectID(req.state.randomizer._id);

                col.find({_id: id}, function(err, cur) {
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
