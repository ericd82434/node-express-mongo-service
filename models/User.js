// User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config();
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  }
},{
  collection: 'user'
});

User.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

User.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

User.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.API_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE! It is .env file!!
};

module.exports = mongoose.model('User', User);