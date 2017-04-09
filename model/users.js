var mongoose = require('mongoose');

var schema = mongoose.Schema({
  email: String,
  password: String,
  code: String
}, {collection: 'users'});

module.exports = mongoose.model('users', schema);
