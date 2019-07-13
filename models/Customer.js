// Customer.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Customer
let Customer = new Schema({
  id: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  phoneNumber: {
    type: String
  }
},{
    collection: 'customer'
});

module.exports = mongoose.model('Customer', Customer);