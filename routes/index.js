var express = require('express');
var router = express.Router();
require("dotenv").config();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.API_SECRET,
  userProperty: 'payload'
});

var ctrlRegister = require('../controller/RegistrationController');
var ctrlAuth = require('../controller/AuthenticationController');

// registration
router.post('/register', ctrlRegister.register);

// authentication
router.post('/login', ctrlAuth.login);

module.exports = router;