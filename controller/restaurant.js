var Restaurant = require('../model/restaurant');

module.exports = {
  all: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Restaurant.find({});
  },
  fetch: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Restaurant.find({
      company_no: this.params.company_no
    });
  }
};
