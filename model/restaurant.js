var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var schema = mongoose.Schema({
  restaurantname: String,
  company_no: { type: Number, ref: 'company' },
  post: Number,
  address1: String,
  address2: String,
  origin: String,
  pushtime1: String,
  pushtime2: String,
  pushtime3: String,
  pushtime4: String,
  pushendtime1: String,
  pushendtime2: String,
  pushendtime3: String,
  pushendtime4: String,
  inserttime: String,
  updatetime: String,
  isdelete: Number
}, {collection: 'restaurant'});

schema.plugin(autoIncrement.plugin, {
  model: "restaurant",
  field: "no"
});

module.exports = mongoose.model('restaurant', schema);
