var mongoose = require('mongoose');

var schema = mongoose.Schema({
  restaurant_no: { type: Number, ref: 'restaurant'},
  menudate: String,
  timetype: String,
  course: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, {collection: 'vote'});

module.exports = mongoose.model('vote', schema);
