var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

var uri = process.env.MONGOLAB_URI || 'mongodb://sessionHandler:supersecretpassword@localhost:27017/constitution/?ssl=true';

exports.grab = {
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

                        res(item);
                    });
                });
            });
        });
    }
};
