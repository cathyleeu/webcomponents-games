var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  code: String,
  school: String,
  className: String
}, {collection: 'users'});

module.exports = mongoose.model('users', schema);
