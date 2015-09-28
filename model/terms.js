var mongoose = require('mongoose');

var schema = mongoose.Schema({
  no: Number,
  termstype: String,
  content: String,
  inserttime: String
}, {collection: 'terms'});

module.exports = mongoose.model('terms', schema);
