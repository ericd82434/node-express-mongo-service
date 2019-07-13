// customer.route.js

const express = require('express');
const app = express();
const customerRoutes = express.Router();

// Require Customer model in our routes module
let Customer = require('../models/Customer');

// Defined store route
customerRoutes.route('/create').post(function (req, res) {
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
    Customer.find(function (err, customers){
    if(err){
      console.log(err);
    }
    else {
      res.json(customers);
    }
  });
});

// Defined edit route
customerRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Customer.findById(id, function (err, customer){
      res.json(customer);
  });
});

//  Defined update route
customerRoutes.route('/update/:id').post(function (req, res) {
    customer.findById(req.params.id, function(err, next, customer) {
    if (!customer)
      return next(new Error('Could not load Document'));
    else {
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
    let id = req.params.id;
    Customer.findByIdAndRemove({_id: id}, function(err, customer){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = customerRoutes;