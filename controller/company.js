var Company = require('../model/company');

module.exports = {
  all: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Company.find({});
  },
  fetch: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Company.find({
      no: this.params.no
    });
  },
  add: function *(next) {
    if('POST' != this.method) return yield next;
    var company = new Company(this.request.body);
    this.body = yield company.save();
  }
};
