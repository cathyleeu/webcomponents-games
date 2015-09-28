var mongoose = require('mongoose');

var schema = mongoose.Schema({
  no: Number,
  name: String,
  foodcategory_no: Number,
  img: String
}, {collection: 'food'});

module.exports = mongoose.model('food', schema);
