
const express = require('express');
const app = express();
require("dotenv").config();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.API_SECRET,
  userProperty: 'payload'
});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const passport = require('passport');
app.use(passport.initialize());
// [SH] Bring in the data model
require('./models/User');
require('./models/Customer');
// [SH] Bring in the Passport config after model is defined
require('./config/passport');
const customerController = require('./controller/CustomerController');
// [SH] Bring in the routes for the API (delete the default routes)
const routesApi = require('./routes/index');

app.use('/auth', routesApi);

app.use('/customer', auth, customerController);

const port = process.env.PORT || 8080;

const url = 'mongodb://mongodb:27017/ericDB';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
 });