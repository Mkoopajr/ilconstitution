#!/usr/bin/env node

var MongoClient = require('mongodb').MongoClient;

var uri = process.env.MONGOLAB_URI;

var data1 = {
    "question" : "What are two main topics covered in the Declaration of Independence?",
    "options" : {
        "0" : "Articles of Confederation",
        "1" : "Bill of Rights",
        "2" : "Theory of American Government",
        "3" : "The wrongs done to the colonies by the English government",
        "4" : "The Amendments"
    },
    "answer" : ["2", "3"],
    "multi" : true,
    "randomizer" : [
        0.004628593567758799,
        0.20673484704457223
    ]
};

var data2 = {
    "question" : "What is the theory of American government?",
    "options" : {
        "0" : "That the government works for the people and the citizens do not exist for the good of the government",
        "1" : "The document written to declare independence from England",
        "2" : "The idea of a central, national, and federal branches of government",
        "3" : "The seven articles of the Constitution",
        "4" : "That America is the best country in the world"
    },
    "answer" : ["0"],
    "multi" : false,
    "randomizer" : [
        0.9244870271068066,
        0.7100111313629895
    ]
};

MongoClient.connect(uri, function(err, db) {
    if (err) {
        console.log(err);
    }

    db.createCollection('questions', function(err, col) {
        if (err) {
            db.close();
            console.log(err);
        }
        
        col.insert([data1, data2], function(err, result) {
            db.close();
            console.log(result);
        });
    });
});
