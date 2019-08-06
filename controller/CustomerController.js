// customer.route.js

const express = require('express');
const app = express();
const customerRoutes = express.Router();

// Require Customer model in our routes module
let Customer = require('../models/Customer');

// Defined store route
customerRoutes.route('/create').post(function (req, res) {
  console.log("payload "+req.payload._id);
  let customer = new Customer(req.body);
  customer.save()
    .then(customer => {
      res.json(customer); //Angular expects customer object
      //res.status(200).json({'customer': 'customer in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
customerRoutes.route('/all').get(function (req, res) {
    console.log("payload "+req.payload._id);
    if (!req.payload._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {
      Customer.find(function (err, customers){
        if(err){
          console.log(err);
        }
        else {
          res.json(customers);
        }
      });
    } 
});

//  Defined update route
customerRoutes.route('/update/:id').post(function (req, res) {
    Customer.findById({_id: req.params.id}, function(err, customer) {
    if (customer) {
      customer.firstName = req.body.firstName;
      customer.lastName = req.body.lastName;
      customer.address = req.body.address;
      customer.city = req.body.city;
      customer.state = req.body.state;
      customer.zipCode = req.body.zipCode;
      customer.phoneNumber = req.body.phoneNumber;
      customer.save().then(customer => {
        res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
customerRoutes.route('/delete/:id').delete(function (req, res) {
    Customer.findByIdAndRemove({_id: req.params.id}, function(err, customer){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = customerRoutes;