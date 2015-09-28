var Vote = require('../model/vote');

module.exports = {
  upsert : function *(next) {
    if('POST' != this.method) return yield next;
    var body = this.request.body;
    this.body = yield Vote.update({
      restaurant_no: body.restaurant_no,
      menudate: body.menudate,
      timetype: body.timetype,
      user: body.user
    }, body, {upsert: true});
  }
}
