var Food = require('../model/food');

module.exports = {
  all: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Food.find();
  },
  foodlist: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Food.find().sort({no:1}).skip(this.params.skip).limit(10);
  }
}
