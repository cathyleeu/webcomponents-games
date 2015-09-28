var Terms = require('../model/terms');

module.exports = {
  fetch: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Terms.find({
      termstype: this.params.termstype
    });
  },
};
