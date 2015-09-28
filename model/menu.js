var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var schema = mongoose.Schema({
  restaurant_no: { type: Number, ref: 'restaurant' }, //식당 정보 기본키
  name: String, //메뉴이름
  timetype: String, //조식,중식,석식
  course: String, //식단코스
  origin: String, //원산지 텍스트
  price: String, // 식단가격
  menudate: String, // 식단배급일자
  food_no: { type: Number, ref: 'food' }, // 대표이미지의 food 기본키
  foodlist: [Number] // 식단
}, {collection: 'menu'});

schema.plugin(autoIncrement.plugin, {
  model: "menu",
  field: "no"
});

module.exports = mongoose.model('menu', schema);
