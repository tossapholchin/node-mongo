const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    dboper.insertDocument(db, {"name": "Tossaphol", "description": "Insert Test"}, "dishes", (result) => {
      console.log('Insert Document:\n', result.ops);

      dboper.findDocuments(db, 'dishes', (docs) => {
        console.log('Found Documents:\n', docs);

        dboper.updateDocument(db, {"name": "Tossaphol"}, {"description": "Update Test"}, 'dishes', (result) => {
          console.log('Updated Document:\n', result.result);

          dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Updated Documents:\n', docs);

            db.dropCollection('dishes', (result) => {
              console.log('Droped Collection:', result);

              db.close();
            });
          });
        });
      });
    });

});