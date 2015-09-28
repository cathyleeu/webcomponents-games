var mongoose = require('mongoose');

var schema = mongoose.Schema({
  uuid: String,
  platform: String,
  company_no: { type: Number, ref: 'company'},
  restaurant_no: { type: Number, ref: 'restaurant'},
  sex: String,
  age: Number,
  terms: Boolean
}, {collection: 'users'});

module.exports = mongoose.model('user', schema);
