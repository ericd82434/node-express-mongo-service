
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerRoute = require('./routes/CustomerRoute');

app.use(bodyParser.json());
app.use(cors());
app.use('/customer', customerRoute);
const port = process.env.PORT || 8080;

/* var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
//var url = 'mongodb://localhost:27017/ericDB';
var str = "";

// Connection URL
//const url = 'mongodb://172.20.0.2:27017/ericDB';
const url = 'mongodb://localhost:27017/ericDB';

// Database Name
const dbName = 'ericDB';

// Create a new MongoClient
const client = new MongoClient(url); */

//const url = 'mongodb://mongodb:27017/ericDB';
const url = 'mongodb://mongodb:27017/ericDB';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

/* app.route('/customer/all').get(function(req, res)

{

    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
          console.log('start mongo connection');
          const db = client.db('ericDB');

          db.collection("customer").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            client.close();
          });

    });

}); */

/* app.route('/customer/delete/:id').delete(function(req, res)
{
  console.log('start mongo connection');
  var id = req.params.id;
  console.log('id: '+id);

  // Use connect method to connect to the Server
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
     const db = client.db('ericDB');

     db.collection("customer").deleteOne({ _id: new mongo.ObjectId(id) }, function(err, obj) {
       if (err) throw err;
       console.log("customer deleted");
       res.send('customer deleted');
       client.close();
     });

  });

}); */

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
 });