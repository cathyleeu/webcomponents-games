var User = require('../model/user');

module.exports = {
  all: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield User.find({});
  },
  add: function *(next) {
    if('POST' != this.method) return yield next;
    var user = new User(this.request.body);
    this.body = yield user.save();
  },
  fetch: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield User.find({
      uuid: this.params.uuid
    });
  },
  modify: function *(next) {
    if('PUT' != this.method) return yield next;
    var body = this.request.body;
    var user = yield User.find({
      uuid: body.uuid
    });
    if(user.length === 0){
      this.throw(404, 'user with uuid = ' + body.id + ' was not found');
    }
    var updated = yield User.update(user[0], {
      $set: body
    });
    if(!updated) {
      this.throw(405, "Unable to update");
    } else {
      this.body = "done";
    }
  },
  remove: function *(next) {
    console.log(this.params.uuid)
    if('DELETE' != this.method) return yield next;
    var user = yield User.find({
      uuid: this.params.uuid
    })
    if(user.length === 0){
      this.throw(404, 'user with uuid = ' + this.params.uuid + ' was not found');
    }
    var removed = yield User.remove(user[0]);
    if(!removed){
      this.throw(405, "Unable to delete.");
    } else {
      this.body = "done";
    }
  }
};
