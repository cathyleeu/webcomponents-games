var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  password: String,
  class: String,
  school: String
}, {collection: 'students'});

module.exports = mongoose.model('students', schema);
