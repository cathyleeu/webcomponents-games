var Users = require('../model/users');

module.exports = {
  all: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Users.find({});
  },
  add: function *(next) {
    if('POST' != this.method) return yield next;
    var student = new Users(this.request.body);
    this.body = yield student.save();
  },
  fetch: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Users.find({
      name: this.params.name,
      class: this.params.class,
      school: this.params.school
    });
  },
  fetchClass: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Users.find({
      class: this.params.class,
      school: this.params.school
    });
  },
  modify: function *(next) {
    if('PUT' != this.method) return yield next;
    var body = this.request.body;
    var student = yield Users.find({
      uuid: body.uuid
    });
    if(student.length === 0){
      this.throw(404, 'student with uuid = ' + body.id + ' was not found');
    }
    var updated = yield Users.update(student[0], {
      $set: body
    });
    if(!updated) {
      this.throw(405, "Unable to update");
    } else {
      this.body = "done";
    }
  },
  remove: function *(next) {
    if('DELETE' != this.method) return yield next;
    var student = yield Users.find({
      uuid: this.params.uuid
    })
    if(student.length === 0){
      this.throw(404, 'student with uuid = ' + this.params.uuid + ' was not found');
    }
    var removed = yield Users.remove(student[0]);
    if(!removed){
      this.throw(405, "Unable to delete.");
    } else {
      this.body = "done";
    }
  }
};
