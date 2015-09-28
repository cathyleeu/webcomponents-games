var Menu = require('../model/menu'),
    Food = require('../model/food');

module.exports = {
  fetch: function *(next) {
    if('GET' != this.method) return yield next;
    var menu = yield Menu.find({
      restaurant_no: this.params.restaurant_no,
      menudate: this.params.menudate
    });
    var query = {
      "$or": menu.map(function(obj) {
        return {no: obj.food_no};
      })
    };
    var img = yield Food.find(query, {"no":true, "img":true});
    var hash = {};
    img.forEach(function(obj) {
      hash[obj.no] = obj.img;
    });
    this.body = menu.map(function(obj) {
      var ret = JSON.parse(JSON.stringify(obj));
      ret.food_img = hash[ret.food_no];
      return ret;
    });

  },
  fetch2: function *(next) {
    if('GET' != this.method) return yield next;
    this.body = yield Menu.find({
      restaurant_no: +this.params.restaurant_no,
      menudate: this.params.menudate,
      timetype: this.params.timetype,
      course: this.params.course
    });
  },
  details: function *(next) {
    if('GET' != this.method) return yield next;
    var menu = yield Menu.findOne({
      restaurant_no: +this.params.restaurant_no,
      menudate: this.params.menudate,
      timetype: this.params.timetype,
      course: this.params.course
    });
    var query = {
      "$or": menu.foodlist.map(function(food_no) {
        return {no: food_no};
      })
    };
    var details = Food.find(query);
    this.body = yield {
      origin: menu.origin,
      details: details
    };
  },
  add: function *(next) {
    if('POST' != this.method) return yield next;
    var body = this.request.body;
    var menu = new Menu(this.request.body);
    this.body = yield menu.save();
  },
  upsert: function *(next) {
    if('POST' != this.method) return yield next;
    var body = this.request.body;
    var menu = yield Menu.findOne({
      restaurant_no: body.restaurant_no,
      menudate: body.menudate,
      timetype: body.timetype,
      course: body.course
    });
    if(menu) {
      // update menu
      var updated = yield Menu.update(menu, body);
      if (!updated) {
        this.throw(405, "Unable to update");
      } else {
        this.body = menu;
      }
    } else {
      // insert menu
      this.body = yield new Menu(body).save();
    }
  }
};
