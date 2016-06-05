var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  email: String,
  password: String
}, {collection: 'users'});

module.exports = mongoose.model('users', schema);
