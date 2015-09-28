var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var schema = mongoose.Schema({
  name: String,
  inserttime: String,
  updatetime: String,
  isdelete: Number
}, {collection: 'company'});

schema.plugin(autoIncrement.plugin, {
  model: "company",
  field: "no"
});

module.exports = mongoose.model('company', schema);
