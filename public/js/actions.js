Actions = function(kidscoding, loader, mazeInfo, run) {
  this.kidscoding = kidscoding;
  this.loader = loader;
  this.map = mazeInfo.map;
  this.canvas = mazeInfo.canvas;
  this.width = mazeInfo.width;
  this.height = mazeInfo.height;
  this.view_size = mazeInfo.view_size;
  this.tile_size = mazeInfo.tile_size;
  this.run = run;
  this.setTimeoutKey = null;
  this.getItemCount = kidscoding.tileFactory.getItemCount;
  this.setItemCount = kidscoding.tileFactory.setItemCount;
  this.addItemImage = kidscoding.tileFactory.addItemImage;
  this.setCoord = kidscoding.tileFactory.setCoord;
  this.setScale = kidscoding.tileFactory.setScale;
  this.delay = 0;
};

Actions.prototype._rotateCharacter = function(direct, callback) {
  var _this = this,
      character = this.canvas.character;
  if(character.direct == direct) {
    callback();
    return;
  }
  character.direct = direct;
  if(character.sprite) {
    character.bitmap.gotoAndStop("stand_" + direct);
    _this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 100);
  } else if(character.rotate_mode == "image") {
    character.image = this.loader.getResult('character_' + character.direct);
    setTimeout(function() {
      _this.canvas.stage.update();
      callback();
    }, 100);
  } else { // character.rotate_mode == "rotation"
    var rotation = {"u":0, "r":90, "d":180, "l":270}[direct];
    if(character.rotation == 0 && rotation == 270) {
      rotation = -90;
    } else if(character.rotation == 270 && rotation == 0) {
      rotation = 360;
    }
    var tween = createjs.Tween.get(character);
    tween.to({rotation: rotation}, 3 * this.delay)
        .call(function() {
          character.rotation = (character.rotation + 360) % 360;
          callback();
        })
        .addEventListener("change", function() {
          _this.canvas.stage.update();
        });
  }
};

Actions.prototype._moveCharacter = function(x_next, y_next, callback) {
  var _this = this,
      character = this.canvas.character,
      direct = character.direct,
      jump = Math.abs(character.px - x_next) >= 2 || Math.abs(character.py - y_next) >= 2;
  this._restoreObject(function() {

    if(character.px == x_next && character.py != y_next) {
      direct = character.py > y_next ? "u" : "d";
    } else if (character.px != x_next && character.py == y_next) {
      direct = character.px > x_next ? "l" : "r";
    }
    _this._rotateCharacter(direct, function() {

      if(character.sprite) {
        character.bitmap.gotoAndPlay( (jump ? "jump_" : "walk_") + direct);
      }
      var tween = createjs.Tween.get(character);
      tween.wait(character.sprite ? 0 : _this.delay)
           .to({
             x: _this.tile_size*x_next + _this.tile_size/2,
             y: _this.tile_size*y_next + _this.tile_size/2
           }, 5 * _this.delay)
           .call(function() {

             character.rotation = (character.rotation + 360) % 360;
             character.px = x_next;
             character.py = y_next;
             if(character.sprite) {
               character.bitmap.stop();
             }
             callback();
           })
           .addEventListener("change", function(e) {
             _this.canvas.stage.update();
           });
      _this._setFocus(x_next, y_next, character.sprite ? 0 : _this.delay, 500);
    });
  });
};

Actions.prototype._splitObjects = function(spider, callback) {
  var _this = this,
      character = this.canvas.character,
      px = character.px,
      py = character.py;
  // ?????? ????????? ????????? ???????????? ?????? ?????????
  if(character._splitObject) {
    callback();
    return;
  }
  // ????????? ??????????????? ????????? ???????????? ??????
  character._splitObject = spider;
  // ????????? ???????????? ??? ??????
  this.canvas.stage.removeChild(spider);
  this.canvas.stage.addChild(spider);
  this.canvas.stage.removeChild(character);
  this.canvas.stage.addChild(character);
  var tween1 = createjs.Tween.get(character)
        .wait(character.sprite ? 0 : _this.delay)
        .to({
          x: _this.tile_size*(px - 0.5) + _this.tile_size/2,
          y: _this.tile_size*py + _this.tile_size/2
        }, 5 * _this.delay),
      tween2 = createjs.Tween.get(spider)
        .wait(character.sprite ? 0 : _this.delay)
        .to({
          x: _this.tile_size*(px + 0.5) + _this.tile_size/2,
          y: _this.tile_size*py + _this.tile_size/2
        }, 5 * _this.delay),
      timeline = new createjs.Timeline({
        loop: 0,
        paused: false,
        onChange: function(e) {
          _this.canvas.stage.update();
        },
        onComplete: callback
      });
  timeline.addTween(tween1, tween2);
};

Actions.prototype._restoreObject = function(callback) {
  if(!this.canvas.character._splitObject) {
    callback();
    return;
  }
  var _this = this,
      character = this.canvas.character,
      px = character.px,
      py = character.py;
      tween1 = createjs.Tween.get(character)
        .wait(character.sprite ? 0 : _this.delay)
        .to({
          x: _this.tile_size*px + _this.tile_size/2,
          y: _this.tile_size*py + _this.tile_size/2
        }, 5 * _this.delay),
      tween2 = createjs.Tween.get(character._splitObject)
        .wait(character.sprite ? 0 : _this.delay)
        .to({
          x: _this.tile_size*px + _this.tile_size/2,
          y: _this.tile_size*py + _this.tile_size/2
        }, 5 * _this.delay),
      timeline = new createjs.Timeline({
        loop: 0,
        paused: false,
        onChange: function(e) {
          _this.canvas.stage.update();
        },
        onComplete: callback
      });
  timeline.addTween(tween1, tween2);
  character._splitObject = null;
};


Actions.prototype._setFocus = function(center_x, center_y, wait, time, callback) {
  var _this = this,
      view_size = this.view_size || this.width;
  wait = wait || 0;
  time = time || 0;
  var stage_tween = createjs.Tween.get(this.canvas.stage),
      half = parseInt(view_size / 2 - 0.5, 10),
      stage_x = 0,
      stage_y = 0;
  if(this.width > view_size) {
    if(center_x < half) {
      center_x = half;
    }
    if(center_x > this.width - half - 2) {
      center_x = this.width - half - 2;
    }
    stage_x = -(center_x - half) * this.tile_size;
  }
  if(this.height > view_size) {
    if(center_y < half) {
      center_y = half;
    }
    if(center_y > this.height - half - 2) {
      center_y = this.height - half - 2;
    }
    stage_y = -(center_y - half) * this.tile_size;
  }
  stage_tween.wait(wait)
        .to({x:stage_x, y:stage_y}, time)
        .addEventListener("change", function(e) {
          _this.canvas.stage.update();
        });
}

Actions.prototype._bounceCharacter = function(x_next, y_next, callback) {
  var _this = this,
      character = this.canvas.character,
      direct = character.direct,
      rotation = character.rotation;
  if(character.px == x_next && character.py != y_next) {
    direct = character.py > y_next ? "u" : "d";
  } else if (character.px != x_next && character.py == y_next) {
    direct = character.px > x_next ? "l" : "r";
  }
  x_next = (character.px + x_next) / 2;
  y_next = (character.py + y_next) / 2;
  this._rotateCharacter(direct, function() {
    var tween = createjs.Tween.get(character);
    tween.wait(2 * _this.delay)
         .to({
           x: _this.tile_size*x_next + _this.tile_size/2,
           y: _this.tile_size*y_next + _this.tile_size/2}
          , 3.5 * _this.delay)
         .to({
           x: _this.tile_size*character.px + _this.tile_size/2,
           y: _this.tile_size*character.py + _this.tile_size/2},
          3.5 * _this.delay)
         .to({rotation: rotation+720}, 1000)
         .call(function() {
           character.rotation = (character.rotation + 360) % 360;
           callback();
         })
         .addEventListener("change", function() {
           _this.canvas.stage.update();
         });
  });
};

Actions.prototype._getCanvasObject = function(x, y, role) {
  var objs = [
    this.canvas.items,
    this.canvas.foods,
    this.canvas.obstacles,
    this.canvas.others
  ];
  if(typeof role == "string") {
    role = [role];
  }
  if(0 <= x && x < this.width && 0 <= y && y < this.height) {
    for(var i = 0; i < objs.length; i++) {
      for(var j = 0; j < objs[i].length; j++) {
        if( objs[i][j].px == x &&
            objs[i][j].py == y &&
            objs[i][j].visible &&
            (!role || role.indexOf(objs[i][j].role) >= 0) ) {
          return objs[i][j];
        }
      }
    }
    return null;
  }
  return {
    role: "obstacle",
    obstacle: true
  };
};

Actions.prototype._getFieldValue = function(block, name) {
  var val = block.getFieldValue(name);
  if(val === null) {
    val = block.getInputTargetBlock(name).getFieldValue(name);
  }
  if(Number(val) == val) {
    val = Number(val);
  }
  return val;
};

Actions.prototype.setFoodOrder = function(order) {
  var foods = this.canvas.foods;
  for(var i = 0; i < foods.length; i++){
    if(order == foods[i].order){
      foods.push(foods[i]);
      // others??? ?????? ????????? ?????? food??? ???????????? reset?????? ????????? ??????
      this.canvas.others = this.canvas.others.concat(foods.splice(0,foods.length-1));
      break;
    }
  }
}

Actions.prototype.move = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      obstacles = this.canvas.obstacles,
      spiders = this.canvas.spiders,
      x_next = character.px,
      y_next = character.py,
      diff = type == "jump_forward" ? 2 : 1,
      direct = type.slice(0, 1),
      obj;

  if(type == "forward" || type == "jump_forward") {
    direct = character.direct;
  }
  x_next += {'u':0, 'r':1, 'd':0, 'l':-1}[direct] * diff;
  y_next += {'u':-1, 'r':0, 'd':1, 'l':0}[direct] * diff;

  obj = this._getCanvasObject(character.px, character.py, ["spider", "trap", "rock"]);
  if(obj) {
    this._bounceCharacter(x_next, y_next, function() {
      var message = {
        rock: "????????? ????????????",
        spider: "??????????????? ????????????",
        trap: "?????? ????????????"
      }[obj.role];
      callback(message);
    });
    return;
  }

  obj = this._getCanvasObject(x_next, y_next);

  var id = store.session.get("user", {id:null}).id,
      local = id ? store.namespace(id) : store.session.namespace("anonymous"),
      hash = location.hash.slice(2),
      idx = hash.indexOf("?"),
      path = (idx >= 0 ? hash.slice(0, idx) : hash).split("/").slice(0, -1).join("/"),
      localData = local.get(path, {score:0,complete:[],worldmap:null});
  if( obj && obj.obstacle || (obj && obj.link && obj.min_score && localData.score < obj.min_score)) {
    this._bounceCharacter(x_next, y_next, function() {
      callback(obj);
    });
  } else {
    this._moveCharacter(x_next, y_next, function() {
      callback(obj);
    });
  }
};

Actions.prototype.hello = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      obstacles = this.canvas.obstacles,
      spiders = this.canvas.spiders,
      x_next = character.px,
      y_next = character.py+1,
      stepList = ["step1","step2","step3","step4"],
      obj;

  if(character.step){
    var idx_pre = stepList.indexOf(character.step);
    var idx_cur = stepList.indexOf(type);
    if(idx_cur-idx_pre != 1){
      callback("????????? ???????????????");
      return;
    }
    character.step = type;
  }else{
    character.step = "step1";
  }

  var food = this._getCanvasObject(x_next, y_next, "food");
  obj = this._getCanvasObject(x_next, y_next);
  if(food) {
    foods.splice(0,foods.length)
    this.canvas.stage.update();
    createjs.Sound.play("success");
    callback();
  }else{
    this._moveCharacter(x_next, y_next, function() {
      callback(obj);
    });
  }
};

Actions.prototype.steploop = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      obstacles = this.canvas.obstacles,
      spiders = this.canvas.spiders,
      x_next = character.px,
      y_next = character.py,
      stepList = [""],
      obj;

  if(type == "immigrant") {
    stepList = ["r","r","r","r","d","d","d","r","r","r","d","r","r","u","u","u","r","r","d","d"];
  } else if(type == "frog_left") {
    stepList = ["l","l"];
  } else if(type == "frog_up") {
    stepList = ["u","u"];
  } else if(type == "frog_right") {
    stepList = ["r","r","r","r"];
  } else if(type == "frog_down") {
    stepList = ["d","d","d"];
  } else if(type == "a6w1_move") {
    stepList = ["u","u","u","u","u","u"];
  } else if(type == "a6w1_move_right") {
    stepList = ["r","r","r","r","r","r"];
  } else if(type == "go_cloud") {
    stepList = ["u","u","u","u"];
  } else if(type == "go_rain") {
    stepList = ["r","r","r","d","d"];
  } else if(type == "go_snow") {
    stepList = ["r","r","r","r","r","d","d"];
  } else if(type == "go_valley") {
    stepList = ["d","r"];
  } else if(type == "go_lake") {
    stepList = ["d","l"];
  } else if(type == "go_river") {
    stepList = ["l","l"];
  } else if(type == "go_under") {
    stepList = ["d","d"];
  } else if(type == "go_sea1") {
    stepList = ["l","l","l"];
  } else if(type == "go_sea2") {
    stepList = ["l","l","l","l","l","u","u"];
  } else if(type == "go_sea3") {
    stepList = ["l","l","l","u","u"];
  } else if(type == "go_filter") {
    stepList = ["r","r","u","u","l","u"];
  } else if(type == "go_sewage") {
    stepList = ["l","l","l","l","d","d"];
  } else if(type == "go_dam") {
    stepList = ["d","d","d","r","r","r"];
  } else if(type == "go_dam_1") {
    stepList = ["d","d","d","r","r"];
  } else{
    stepList = type.split("");
  }

  setNextMove(stepList.shift(),x_next,y_next);

  function travel(p1,p2){
    obj = _this._getCanvasObject(p1, p2);
    _this._moveCharacter(p1, p2, function() {
      setNextMove(stepList.shift(),p1,p2);
    });
  }
  function setNextMove(direction,a,b){
    setTimeout(function() {
      if(direction){
        if(direction == "r"){
          travel(a+1,b);
        }else if(direction == "l"){
          travel(a-1,b);
        }else if(direction == "d"){
          travel(a,b+1);
        }else{
          travel(a,b-1);
        }
      }else{
        callback(obj);
      }
    }, 100);
  }
};

Actions.prototype.memigrowing = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      obstacles = this.canvas.obstacles,
      spiders = this.canvas.spiders,
      x_next = character.px,
      y_next = character.py,
      stepList = [""],
      obj;

  var chest = this._getCanvasObject(character.px, character.py, "chest");

  if(chest) {
    chest.bitmap.image = this.loader.getResult(chest.contents[1].img);
    this.setScale(chest.bitmap);
    this.setCoord(chest, chest.px, chest.py);
    createjs.Sound.play("success");
    this.canvas.stage.update();
  }

  if(!character.step){
    character.step = 1;
  }

  if(type == "memi_step1" && character.step==1) {
    stepList = ["l"];
    character.step++;
  } else if(type == "memi_step2" && character.step==2) {
    stepList = ["d","d","d","l"];
    character.step++;
  } else if(type == "memi_step3" && character.step==3) {
    stepList = ["u","u"];
    character.step++;
  } else if(type == "memi_step4" && character.step==4) {
    stepList = ["u"];
    character.step++;
  } else if(type == "memi_step5" && character.step==5) {
    stepList = ["l", "l"];
    character.step++;
  } else{
    callback("????????? ??????????????? ??????????????????!");
    return;
  }

  travel(x_next,y_next);
  function travel(a,b){
    obj = _this._getCanvasObject(a, b);
    _this._moveCharacter(a, b, function() {
      if(stepList.length>0){
        var direction = stepList.shift();
        setTimeout(function() {
          if(direction == "r"){
            travel(a+1,b);
          }else if(direction == "l"){
            travel(a-1,b);
          }else if(direction == "d"){
            travel(a,b+1);
          }else{
            travel(a,b-1);
          }
        }, 10);
      }else{
        changeImage(a,b);
      }
    });
  }

  function changeImage(a,b){
    chest = _this._getCanvasObject(a, b, "chest");
    if(chest) {
      chest.bitmap.image = _this.loader.getResult(chest.contents[0].img);
      _this.setScale(chest.bitmap);
      _this.setCoord(chest, chest.px, chest.py);
      createjs.Sound.play("success");
      _this.canvas.stage.update();
      if(chest.contents[0].img == "bg01_step5"){
        foods.splice(0,foods.length);
        callback(obj);
      }else{
        setTimeout(function() {
          callback(obj);
        }, 2000);
      }
    }
  }
};

Actions.prototype.harvesting = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      obstacles = this.canvas.obstacles,
      spiders = this.canvas.spiders,
      x_next = character.px,
      y_next = character.py,
      chest;
      stepList = ["l","l","l","l"],
      changePoint = 2;
      obj = null;

  if(type == "type2"){
    stepList = ["l","l"],
    changePoint = 1;
  }else if(type == "type3"){
    changeImage(x_next,y_next);
    stepList = [];
  }
  setNextMove(stepList.shift(),x_next,y_next);
  function travel(p1,p2){
    obj = _this._getCanvasObject(p1, p2);
    _this._moveCharacter(p1, p2, function() {

      if(stepList.length==changePoint){
        changeImage(p1,p2);
      }
      setNextMove(stepList.shift(),p1,p2);
    });
  }
  function setNextMove(direction,a,b){
    setTimeout(function() {
      if(direction){
        if(direction == "r"){
          travel(a+1,b);
        }else if(direction == "l"){
          travel(a-1,b);
        }else if(direction == "d"){
          travel(a,b+1);
        }else{
          travel(a,b-1);
        }
      }else{
        callback(obj);
      }
    }, 500);
  }
  function changeImage(a,b){
    chest = _this._getCanvasObject(a, b, "chest");
    if(chest) {
      chest.bitmap.image = _this.loader.getResult(chest.contents[0].img);
      _this.setScale(chest.bitmap)
      _this.setCoord(chest, chest.px, chest.py);
      _this.addItemImage(character, chest.contents[1].img);
      createjs.Sound.play("success");
      _this.canvas.stage.update();
    }
  }
};

Actions.prototype.rotate = function(type, block, callback) {
  var character = this.canvas.character,
      direct = character.direct,
      arr = ["u", "r", "d", "l"];
  if(character.rotate_mode == "rotation") {
    direct = {0:"u", 90:"r", 180:"d", 270:"l"}[character.rotation];
  }
  var idx = arr.indexOf(direct);
  direct = arr[( idx + (type == "clock_wise" ? 1 : -1) + 4 ) % 4];
  this._rotateCharacter(direct, function() {
    callback();
  });
};

Actions.prototype.getItem = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      item = this._getCanvasObject(character.px, character.py, "item");
  if( !item ) {
    // ???????????? ????????? ??? ?????????
    callback("???????????? ????????? ??? ?????????");
    return;
  }
  character.hasItem = true;
  if(item.itemCount) {
    // ????????? ?????????
    // ???????????? ?????? ??????
    var itemCount = this.getItemCount(item);
    if(itemCount == 0) {
      callback("???????????? ????????? ??? ?????????");
      return;
    }
    if(this.getItemCount(character) >= item.limitCount) {
      callback("????????? " + item.limitCount + "?????? ???????????? ????????? ??? ?????????.");
      return;
    }
    this._splitObjects(item, function() {
      if(itemCount - 1 == 0) {
        item.visible = false;
      }
      _this.setItemCount(item, itemCount - 1);
      // ???????????? ????????? ?????? ?????? ??????
      itemCount = _this.getItemCount(character);
      _this.setItemCount(character, itemCount + 1);
      _this.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        callback();
      }, 500);
    });
  } else {
    // ?????????, ??????(?????? ?????? ?????????)
    item.visible = false;
    character.itemBitmap = item;
    this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);
  }
};

Actions.prototype.getItemNotuse = function(block, callback) {
  var _this = this,
      foods = this.canvas.foods,
      character = this.canvas.character,
      item = this._getCanvasObject(character.px, character.py, "item");
  if( !item ) {
    // ???????????? ????????? ??? ?????????
    callback("???????????? ????????? ??? ?????????");
    return;
  }
    character.hasItem = true;
    // ?????????, ??????(?????? ?????? ?????????)
    item.visible = false;
    character.itemBitmap = item;
    foods.splice(0,1);
    this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);

};

//????????? ????????? ???????????? ??????????????? ???????????? ?????? ??????
Actions.prototype.getItem2 = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      item = this._getCanvasObject(character.px, character.py, "item");
  if( !item ) {
    // ???????????? ????????? ??? ?????????
    callback("???????????? ????????? ??? ?????????");
    return;
  }

  character.hasItem = true;
  var itemCount = this.getItemCount(item);

  if(item.itemCount) {
    if(itemCount == 0) {
      callback("???????????? ????????? ??? ?????????");
      return;
    }
    if(this.getItemCount(character) >= item.limitCount) {
      callback("????????? " + item.limitCount + "?????? ???????????? ????????? ??? ?????????.");
      return;
    }
    // ????????? ?????????
    //???????????? ?????? ?????? ??????
    this.setItemCount(item, itemCount - 1);
    // ???????????? ????????? ?????? ?????? ??????
    var itemCount = this.getItemCount(character);
    this.setItemCount(character, itemCount + 1);
    if(!character.itemList){
      character.itemList = [];
    }
    character.itemList.push(item);
    if(item.disappear && this.getItemCount(item)==0){
      item.visible = false;
    }
  }else{
    item.visible = false;
    character.itemBitmap = item;
    if(item.disappear){
      var itemCount = this.getItemCount(character);
      this.setItemCount(character, itemCount + 1);

      if(!character.itemList){
        character.itemList = [];
      }
      character.itemList.push(item);
    }

  }
  this.canvas.stage.update();
  createjs.Sound.play("success");
  setTimeout(function() {
    callback();
  }, 500);
};

Actions.prototype.getItem2split = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      item = this._getCanvasObject(character.px, character.py, "item");
  if( !item ) {
    // ???????????? ????????? ??? ?????????
    callback("???????????? ????????? ??? ?????????");
    return;
  }
  character.hasItem = true;
  var itemCount = this.getItemCount(item);
  this._splitObjects(item, function() {
    if(item.itemCount) {
      if(itemCount == 0) {
        callback("???????????? ????????? ??? ?????????");
        return;
      }
      if(this.getItemCount(character) >= item.limitCount) {
        callback("????????? " + item.limitCount + "?????? ???????????? ????????? ??? ?????????.");
        return;
      }
      // ????????? ?????????
      //???????????? ?????? ?????? ??????
      _this.setItemCount(item, itemCount - 1);
      // ???????????? ????????? ?????? ?????? ??????
      var itemCount = this.getItemCount(character);
      _this.setItemCount(character, itemCount + 1);
      if(!character.itemList){
        character.itemList = [];
      }
      character.itemList.push(item);
      if(item.disappear && _this.getItemCount(item)==0){
        item.visible = false;
      }
    }else{
      item.visible = false;
      character.itemBitmap = item;
      if(item.disappear){
        var itemCount = _this.getItemCount(character);
        _this.setItemCount(character, itemCount + 1);

        if(!character.itemList){
          character.itemList = [];
        }
        character.itemList.push(item);
      }

    }
    _this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);
  });
};

//??????????????? ????????? ?????? ?????? ????????? ?????? ??????????????? ?????? ????????? ??????
Actions.prototype.getItem3 = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      items = this.canvas.items,
      item = this._getCanvasObject(character.px, character.py, "item");

  var total_itemCount = 0;
  if(items.length){
    for(var i =0; i<items.length;i++){
      total_itemCount = total_itemCount + items[i].itemCount;
    }
  }
  if( !item ) {
    // ???????????? ????????? ??? ?????????
    callback("???????????? ????????? ??? ?????????");
    return;
  }
  character.hasItem = true;
  if(item.itemCount) {
    // ????????? ?????????
    // ???????????? ?????? ??????
    var itemCount = this.getItemCount(item);
    if(itemCount == 0) {
      callback("???????????? ????????? ??? ?????????");
      return;
    }
    if(this.getItemCount(character) >= item.limitCount) {
      callback("????????? " + item.limitCount + "?????? ???????????? ????????? ??? ?????????.");
      return;
    }
    this._splitObjects(item, function() {
      if(itemCount - 1 == 0) {
        item.visible = false;
      }
      _this.setItemCount(item, itemCount - 1);
      // ???????????? ????????? ?????? ?????? ??????
      itemCount = _this.getItemCount(character);
      _this.setItemCount(character, itemCount + 1);
      _this.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        if(total_itemCount == _this.getItemCount(character)){
          foods.splice(0,foods.length);
        }
        callback();
      }, 500);
    });
  } else {
    // ?????????, ??????(?????? ?????? ?????????)
    item.visible = false;
    character.itemBitmap = item;
    this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);
  }
};

Actions.prototype.useItem = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      itemBitmap = character.itemBitmap;
  if(!character.hasItem) {
    callback("???????????? ????????? ?????? ?????????");
    return;
  }
  // ?????? ????????? ????????? ??????(?????? ??????)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItem) {
    if(character.itemCountBitmap) {
      // ????????? ?????????
      this._splitObjects(food, function() {
        var itemCount = _this.getItemCount(character);
        if(itemCount == 0) {
          callback("???????????? ????????? ?????? ?????????");
          return;
        }
        _this.setItemCount(character, itemCount - 1);
        itemCount = _this.getItemCount(food);
        _this.setItemCount(food, itemCount + 1);
        _this.canvas.stage.update();
        createjs.Sound.play("success");
        setTimeout(function() {
          callback();
        }, 500);
      });
    } else {
      // ????????? ????????????
      food.visible = false;
      itemBitmap.visible = true;
      itemBitmap.px = food.px;
      itemBitmap.py = food.py;
      itemBitmap.x = food.x;
      itemBitmap.y = food.y;
      this.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        callback();
      }, 500);
    }
    return;
  }

  // ?????? ????????? ????????? ??????
  var rock = this._getCanvasObject(character.px, character.py, "rock");
  if(rock) {
    var num = rock.num - 1;

    if(num > 0) {
      // replace rock image
      rock.num = num;
      rock.image = rock["img" + num];
    } else {
      // hide rock
      rock.visible = false;
    }

    createjs.Sound.play("hammer");
    this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 1000);
    return;
  }

  // ???????????? ????????? ??? ?????? ??????
  callback("???????????? ????????? ??? ?????????");
}

Actions.prototype.useItem2 = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      itemBitmap = character.itemBitmap;
  if(!character.hasItem) {
    callback("???????????? ????????? ?????? ?????????");
    return;
  }

  // ?????? ????????? ????????? ??????(?????? ??????)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItem) {
    if(character.itemList && character.itemList.length>0) {
      // ????????? ?????????
      this._splitObjects(food, function() {
        var itemCount = _this.getItemCount(character);
        if(itemCount == 0) {
          callback("???????????? ????????? ?????? ?????????");
          return;
        }
        _this.setItemCount(character, itemCount - 1);
        var dropItem = character.itemList.shift();
        _this.addItemImage(food, dropItem.itemImg);
        _this.canvas.stage.update();
        createjs.Sound.play("success");
        setTimeout(function() {
          callback();
        }, 500);
      });
      return;
    }else if(itemBitmap){
      this._splitObjects(food, function() {
        food.visible = false;
        itemBitmap.bitmap.image = _this.loader.getResult(itemBitmap.itemImg);
        _this.setScale(itemBitmap.bitmap);
        _this.setCoord(itemBitmap, food.px, food.py);
        itemBitmap.visible = true;
        _this.canvas.stage.update();
        createjs.Sound.play("success");
        setTimeout(function() {
          callback();
        }, 500);
      });
      return;
    }
    callback("???????????? ????????? ??? ?????????");
    return;
  }
  // ???????????? ????????? ??? ?????? ??????
  callback("???????????? ????????? ??? ?????????");
}

//????????? ????????? ???????????? ??????????????? ???????????? ?????? ??????
Actions.prototype.ride = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      item;
  if(type = "right"){
    item = this._getCanvasObject(character.px + 1, character.py, "item");
  }

  if(!item) {
    // ???????????? ????????? ??? ?????????
    callback("?????? ??? ?????? ????????? ?????????");
    return;
  }
  character.hasItem = true;
  var itemCount = this.getItemCount(item);

  if(item.itemCount) {
    if(itemCount == 0) {
      callback("?????? ??? ?????? ????????? ?????????");
      return;
    }
    // ????????? ?????????
    //???????????? ?????? ?????? ??????
    this.setItemCount(item, itemCount - 1);
    // ???????????? ????????? ?????? ?????? ??????
    var itemCount = this.getItemCount(character);
    this.setItemCount(character, itemCount + 1);
    if(!character.itemList){
      character.itemList = [];
    }
    character.itemList.push(item);
    if(item.disappear && this.getItemCount(item)==0){
      item.visible = false;
    }
  }else{
    item.visible = false;
    character.itemBitmap = item;
    //?????? ?????? ????????? ?????????
    this.addItemImage(character, item.img, "one");
  }
  this.canvas.stage.update();
  createjs.Sound.play("success");
  setTimeout(function() {
    callback();
  }, 500);
};
Actions.prototype.getout = function(type, block, callback) {
  var _this = this,
      foods = this.canvas.foods,
      character = this.canvas.character,
      itemBitmap = character.itemBitmap;
  if(!character.hasItem) {
    callback("???????????? ????????? ?????? ?????????");
    return;
  }

  // ?????? ????????? ????????? ??????(?????? ??????)
  var food;
  if(type = "left"){
    food = this._getCanvasObject(character.px-1, character.py, "food");
  }
  if(food && food.useItem) {
    var itemCount = this.getItemCount(character);
    if(itemCount>1) {
      // ????????? ?????????
      this._splitObjects(food, function() {
        var itemCount = _this.getItemCount(character);
        if(itemCount == 0) {
          callback("???????????? ????????? ?????? ?????????");
          return;
        }
        _this.setItemCount(character, itemCount - 1);
        var dropItem = character.itemList.shift();
        _this.addItemImage(food, dropItem.itemImg);
        _this.canvas.stage.update();
        createjs.Sound.play("success");
        setTimeout(function() {
          callback();
        }, 500);
      });
      return;
    }else if(itemBitmap){
      food.visible = false;
      itemBitmap.bitmap.image = _this.loader.getResult(itemBitmap.img);
      _this.setScale(itemBitmap.bitmap);
      _this.setCoord(itemBitmap, food.px, food.py);
      //????????? ?????? ????????? ?????????
      character.removeChildAt(1);
      itemBitmap.visible = true;
      foods.splice(0,1);
      _this.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        callback();
      }, 500);
      return;
    }
    callback("???????????? ????????? ??? ?????????");
    return;
  }
  // ???????????? ????????? ??? ?????? ??????
  callback("???????????? ????????? ??? ?????????");
}

Actions.prototype.check = function(block, callback) {
  var foods = this.canvas.foods,
      character = this.canvas.character;
  // ?????? ????????? ????????? ??????
  var chest = this._getCanvasObject(character.px, character.py, "chest");
  if(chest) {
    var ranNum = parseInt(Math.random()*chest.contents.length, 10);
    if(chest.contents[ranNum].role == "food"){
      chest.role = "food";
      chest.useItem = true;
      chest.order = chest.contents[ranNum].order;
      foods.push(chest);
      foods.shift();
    }
    else if(chest.contents[ranNum].role == "item") {
      chest.role = "item";
      chest.order = chest.contents[ranNum].order;
      if(chest.contents[ranNum].disappear){
        chest.itemImg = chest.contents[ranNum].itemImg;
        chest.disappear = true;
      }
    }else if(chest.contents[ranNum].role == "friend") {
      chest.img = chest.contents[ranNum].img;
      chest.role = "friend";
      chest.order = chest.contents[ranNum].order;
    }else if(chest.contents[ranNum].role == "spider") {
      chest.role = "spider";
      chest.order = chest.contents[ranNum].order;
    }else if(chest.contents[ranNum].role == "justmove") {
      chest.img = chest.contents[ranNum].img;
      chest.role = "justmove";
      chest.order = chest.contents[ranNum].order;
    }else if(chest.contents[ranNum].role == "clock") {
      character.clock = chest.contents[ranNum].order;
    }else{
      chest.role = chest.contents[ranNum].role;
    }
    chest.bitmap.image = this.loader.getResult(chest.contents[ranNum].img);
    this.setScale(chest.bitmap);
    this.setCoord(chest, chest.px, chest.py);
    createjs.Sound.play("success");
    this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 1000);
    return;
  }
  callback("????????? ?????? ?????????");
}

Actions.prototype.check2 = function(block, callback) {
  var foods = this.canvas.foods,
      character = this.canvas.character;
  // ?????? ????????? ????????? ??????
  var chest = this._getCanvasObject(character.px, character.py, "chest");
  if(chest) {
    var namesOfif = chest.contents[0].if;
    var namesOfelseif = chest.contents[0].elseif;
    var namesOfelse = chest.contents[0].else;

    var orderNum = parseInt(Math.random()*3, 10);

    if(orderNum == 0){
      chest.role = "item";
      chest.order = "if";
      var imgNum = parseInt(Math.random()*namesOfif.length, 10);
      chest.bitmap.image = _this.loader.getResult(namesOfif[imgNum]);
    } else if(orderNum == 1){
      chest.role = "item";
      chest.order = "else_if";
      var imgNum = parseInt(Math.random()*namesOfelseif.length, 10);
      chest.bitmap.image = _this.loader.getResult(namesOfelseif[imgNum]);
    } else {
      chest.role = "item";
      chest.order = "else";
      var imgNum = parseInt(Math.random()*namesOfelse.length, 10);
      chest.bitmap.image = _this.loader.getResult(namesOfelse[imgNum]);
    }
    this.setScale(chest.bitmap);
    this.setCoord(chest, chest.px, chest.py);

    createjs.Sound.play("success");
    this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 1000);
    return;
  }
  callback("????????? ?????? ?????????");
}

Actions.prototype.checkfinish = function(block, callback) {
  var _this = this,
      foods = this.canvas.foods,
      character = this.canvas.character;
  // ?????? ????????? ????????? ??????
  var chest = this._getCanvasObject(character.px, character.py, "chest");
  if(chest) {
    this._splitObjects(chest, function() {
      var ranNum = parseInt(Math.random()*chest.contents.length, 10);
      chest.bitmap.image = _this.loader.getResult(chest.contents[ranNum].img);
      _this.setScale(chest.bitmap);
      createjs.Sound.play("success");
      _this.canvas.stage.update();
      setTimeout(function() {
        callback("??????#!"+_this.loader.getImgsrc(chest.contents[ranNum].img));
      }, 1000);
    });
    return;
  }
  callback("????????? ?????? ?????????");
}
Actions.prototype.check_multi = function(block, callback) {
  var foods = this.canvas.foods,
      character = this.canvas.character;
  // ?????? ????????? ????????? ??????
  var chest = this._getCanvasObject(character.px, character.py, "chest");
  if(chest) {
    var ranNum = parseInt(Math.random()*chest.contents.length, 10);
    if(chest.contents[ranNum].role == "item") {
      chest.role = "item";
      chest.order = chest.contents[ranNum].order;
      foods.push(foods[0]);
      if(chest.contents[ranNum].disappear){
        chest.itemImg = chest.contents[ranNum].itemImg;
        chest.disappear = true;
      }
    }else{
      chest.role = chest.contents[ranNum].role;
    }
    chest.bitmap.image = this.loader.getResult(chest.contents[ranNum].img);
    this.setScale(chest.bitmap);
    this.setCoord(chest, chest.px, chest.py);
    createjs.Sound.play("success");
    this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 1000);
    return;
  }
  callback("????????? ?????? ?????????");
}

Actions.prototype.action = function(hand, block, callback) {
  var character = this.canvas.character;
  var spider = this._getCanvasObject(character.px, character.py, "spider");
  var _this = this;
  this._splitObjects(spider, function() {
    if(spider) {
      if(hand == spider.hand) {
        callback("????????????");
        return;
      }
      if( (hand == "rock"     && spider.hand == "paper") ||
          (hand == "scissors" && spider.hand == "rock") ||
          (hand == "paper"    && spider.hand == "scissors") ) {
        callback("?????????");
        return;
      }
      setTimeout(function() {
        spider.visible = false;
        _this.canvas.stage.update();
        createjs.Sound.play("success");
        _this._restoreObject(callback);
      }, 500);
    } else {
      callback("?????????????????? ??? ??? ?????????");
    }
  });
};

Actions.prototype.conditioncheck = function(options, block, callback) {
  var character = this.canvas.character,
      foods = this.canvas.foods,
      _this = this;
  if(options == "tile"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo.role == "item"){
      if_block = block.getInputTargetBlock("if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else{
      setTimeout(function() {
        callback();
      }, 500);
    }
  }else if (options == "card"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.role == "if"){
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.role==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.role==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        setTimeout(function() {
          callback();
        }, 500);
      }
    });
    /*
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.role == "if"){
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.role==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.role==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
    */
  }else if(options == "item_notuse"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    var errorMsg = "???????????? ????????? ????????? ????????? ?????? ????????? ????????? ?????????.";
    if(!tileInfo) callback(errorMsg);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.role == "item"){
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else if(tileInfo.role == "img") {
        foods.splice(0,1);
        setTimeout(function() {
          callback();
        }, 500);
      }else if (tileInfo.role == "chest"){
        setTimeout(function() {
          callback(errorMsg);
        }, 500);
      }else{
        setTimeout(function() {
          callback(errorMsg);
        }, 500);
      }
    });
  } else if(options == "character"){
    var itemBitmap = character.itemBitmap;
    if(itemBitmap){
      if_block = block.getInputTargetBlock("if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else{
      var food = this._getCanvasObject(character.px, character.py, "food");
      food.useItem = false;
      food.visible = false;
      setTimeout(function() {
        callback();
      }, 500);
    }
  } else if(options == "sign"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.role == "stop"){
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        var nextTileInfo;
        switch(tileInfo.position) {
            case "up":
                nextTileInfo = _this._getCanvasObject(character.px, character.py-1);
                break;
            case "down":
                nextTileInfo = _this._getCanvasObject(character.px, character.py+1);
                break;
            case "right":
                nextTileInfo = _this._getCanvasObject(character.px+1, character.py);
                break;
            default:
                nextTileInfo = _this._getCanvasObject(character.px-1, character.py);
        }
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          callback();
        }, 500);
      }
    });
  }else if(options == "emergency"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "friend") {
      if(tileInfo.order == "if"){
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.order==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        callback();
      }
    }else{
      callback();
    }
  }else if(options == "not_emergency"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "friend") {
      this._splitObjects(tileInfo, function() {
        if(tileInfo.order == "else"){
          for(var i = 0; i<foods.length;i++){
            if(tileInfo.order==foods[i].order){
              foods[i].useItem = false;
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }
          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      });
    }else{
      callback();
    }
  }else if(options == "recycle"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "item") {
      if(tileInfo.order == "if"){
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.order==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        callback();
      }
    }else{
      if(character.itemList.length == 1){
        if(character.itemList[0].order == "if"){
          for(var i = 0; i<foods.length;i++){
            if(character.itemList[0].order==foods[i].order){
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }
          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      }
    }
  }else if(options == "notrecycle"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "item") {
      if(tileInfo.order == "else"){
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.order==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        callback();
      }
    }else{
      if(character.itemList.length == 1){
        if(character.itemList[0].order == "else"){
          for(var i = 0; i<foods.length;i++){
            if(character.itemList[0].order==foods[i].order){
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }
          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      }
    }
  }else if(options == "move_wo_item_if"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "justmove") {
      this._splitObjects(tileInfo, function() {
        if(tileInfo.order == "if"){
          for(var i = 0; i<foods.length;i++){
            if(tileInfo.order==foods[i].order){
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }

          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      });
    }else{
      callback();
    }
  }else if(options == "move_wo_item_elseif"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "justmove") {
      this._splitObjects(tileInfo, function() {
        if(tileInfo.order == "elseif"){
          for(var i = 0; i<foods.length;i++){
            if(tileInfo.order==foods[i].order){
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }
          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      });
    }else{
      callback();
    }
  }else if(options == "move_wo_item_else"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "justmove") {
      this._splitObjects(tileInfo, function() {
        if(tileInfo.order == "else"){
          for(var i = 0; i<foods.length;i++){
            if(tileInfo.order==foods[i].order){
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }
          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      });
    }else{
      callback();
    }
  }else if(options == "move_wo_item_4"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "justmove") {
      this._splitObjects(tileInfo, function() {
        if(tileInfo.order=="4"){
          for(var i = 0; i<foods.length;i++){
            if(tileInfo.order==foods[i].order){
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }
          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      });
    }else{
      callback();
    }
  }else if(options == "move_wo_item_5"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    if(tileInfo && tileInfo.role == "justmove") {
      this._splitObjects(tileInfo, function() {
        if(tileInfo.order=="5"){
          for(var i = 0; i<foods.length;i++){
            if(tileInfo.order==foods[i].order){
              foods.push(foods[i]);
              foods.splice(0,foods.length-1);
            }
          }
          if_block = block.getInputTargetBlock("if_statements");
          setTimeout(function() {
            block.removeSelect();
            _this.run(if_block, callback);
          }, 500);
        }else{
          callback();
        }
      });
    }else{
      callback();
    }
  }else if(options == character.clock){
    for(var i = foods.length-1; i>=0;i--){
      if(character.clock!=foods[i].order){
          foods.splice(i,1);
      }
    }
    character.hasItem = true;
    if_block = block.getInputTargetBlock("if_statements");
    setTimeout(function() {
      block.removeSelect();
      _this.run(if_block, callback);
    }, 500);
  }else{
    callback();
  }


};

Actions.prototype.conditioncheck2 = function(options, block, callback) {
  var character = this.canvas.character,
      foods = this.canvas.foods,
      items = this.canvas.items,
      _this = this;
  if(options == "food"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.role == "if"){
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.role==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.role==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  } else if(options == "direction_up"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      var nextTileInfo;
      if(tileInfo.role == "up"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py-1);
        if_block = block.getInputTargetBlock("if_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      } else if(tileInfo.role == "down"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py+1);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role == "left"){
        nextTileInfo = _this._getCanvasObject(character.px-1, character.py);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role== "right"){
        nextTileInfo = _this._getCanvasObject(character.px+1, character.py);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  } else if(options == "direction_down"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      var nextTileInfo;
      if(tileInfo.role == "up"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py-1);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role == "down"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py+1);
        if_block = block.getInputTargetBlock("if_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      } else if(tileInfo.role == "left"){
        nextTileInfo = _this._getCanvasObject(character.px-1, character.py);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role== "right"){
        nextTileInfo = _this._getCanvasObject(character.px+1, character.py);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  }else if(options == "direction_left"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      var nextTileInfo;
      if(tileInfo.role == "up"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py-1);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role == "down"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py+1);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role == "left"){
        nextTileInfo = _this._getCanvasObject(character.px-1, character.py);
        if_block = block.getInputTargetBlock("if_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      } else if(tileInfo.role== "right"){
        nextTileInfo = _this._getCanvasObject(character.px+1, character.py);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  }else if(options == "direction_right"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      var nextTileInfo;
      if(tileInfo.role == "up"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py-1);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role == "down"){
        nextTileInfo = _this._getCanvasObject(character.px, character.py+1);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role == "left"){
        nextTileInfo = _this._getCanvasObject(character.px-1, character.py);
        else_block = block.getInputTargetBlock("else_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      } else if(tileInfo.role== "right"){
        nextTileInfo = _this._getCanvasObject(character.px+1, character.py);
        if_block = block.getInputTargetBlock("if_statements");
        nextTileInfo.obstacle = false;
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }
    });
  } else if(options == "itemfood"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.order == "if"){
        for(var i = 0; i<items.length;i++){
          if(tileInfo.order==items[i].order){
            items[i].obstacle = false;
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        for(var i = 0; i<items.length;i++){
          if(tileInfo.order==items[i].order){
            items[i].obstacle = false;
          }
        }
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  } else if(options == "itemkey"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.role == "if"){
        for(var i = 0; i<items.length;i++){
          if(tileInfo.role==items[i].order){
            items[i].obstacle = false;
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        for(var i = 0; i<items.length;i++){
          if(tileInfo.role==items[i].order){
            items[i].obstacle = false;
          }
        }
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  }else if(options == "guide"){
    var tileInfo = character.itemBitmap;
      if(tileInfo.order == "if"){
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.order==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        for(var i = 0; i<foods.length;i++){
          if(tileInfo.order==foods[i].order){
            foods.push(foods[i]);
            foods.splice(0,foods.length-1);
          }
        }
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
  }else if(options == "andorcheck2"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      if(tileInfo.order == "if"){
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  } else if(options == "recycle") {
    var tileInfo = this._getCanvasObject(character.px, character.py),
        order = null,
        if_block = block.getInputTargetBlock("if_statements"),
        else_block = block.getInputTargetBlock("else_statements");
    if(tileInfo && tileInfo.role == "item") {
      order = tileInfo.order;
    } else {
      order = character.itemList[0].order;
    }
    this.setFoodOrder(order);
    setTimeout(function() {
      block.removeSelect();
      _this.run(order == "if" ? if_block : else_block, callback);
    }, 500);
  }
};

Actions.prototype.conditioncheck3 = function(options, block, callback) {
  var character = this.canvas.character,
      foods = this.canvas.foods,
      items = this.canvas.items,
      get_block_by = {
        if: block.getInputTargetBlock("if_statements"),
        else_if: block.getInputTargetBlock("else_if_statements"),
        else: block.getInputTargetBlock("else_statements")
      },
      _this = this;

  if(options == "trash"  || options == "guide"){
    var tileInfo = character.itemBitmap;
    this.setFoodOrder(tileInfo.order);
    setTimeout(function() {
      block.removeSelect();
      _this.run(get_block_by[tileInfo.order], callback);
    }, 500);
  } else if(options == "aClock" || options == "dClock"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      for(var i = foods.length-1; i>=0;i--){
        if(tileInfo.order!=foods[i].order){
            foods.splice(i,1);
        }
      }
      character.hasItem = true;
      //character.itemBitmap = tileInfo;
      if(tileInfo.order == "if"){
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else if(tileInfo.order == "else_if"){
        if_block = block.getInputTargetBlock("else_if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  } else if(options == "rsp"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    foods.shift();
    if(tileInfo.order == "if"){
      tileInfo.hand = "rock";
      if_block = block.getInputTargetBlock("if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else if(tileInfo.order == "else_if"){
      tileInfo.hand = "scissors";
      if_block = block.getInputTargetBlock("else_if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else{
      tileInfo.hand = "paper";
      else_block = block.getInputTargetBlock("else_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(else_block, callback);
      }, 500);
    }
  } else if(options == "rps"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    foods.shift();
    if(tileInfo.order == "if"){
      tileInfo.hand = "rock";
      if_block = block.getInputTargetBlock("if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else if(tileInfo.order == "else_if"){
      tileInfo.hand = "paper";
      if_block = block.getInputTargetBlock("else_if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else{
      tileInfo.hand = "scissors";
      else_block = block.getInputTargetBlock("else_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(else_block, callback);
      }, 500);
    }
  } else if(options == "srp"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    foods.shift();
    if(tileInfo.order == "if"){
      tileInfo.hand = "scissors";
      if_block = block.getInputTargetBlock("if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else if(tileInfo.order == "else_if"){
      tileInfo.hand = "rock";
      if_block = block.getInputTargetBlock("else_if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else{
      tileInfo.hand = "paper";
      else_block = block.getInputTargetBlock("else_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(else_block, callback);
      }, 500);
    }
  } else if(options == "prs"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    foods.shift();
    if(tileInfo.order == "if"){
      tileInfo.hand = "paper";
      if_block = block.getInputTargetBlock("if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else if(tileInfo.order == "else_if"){
      tileInfo.hand = "rock";
      if_block = block.getInputTargetBlock("else_if_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(if_block, callback);
      }, 500);
    }else{
      tileInfo.hand = "scissors";
      else_block = block.getInputTargetBlock("else_statements");
      setTimeout(function() {
        block.removeSelect();
        _this.run(else_block, callback);
      }, 500);
    }
  } else if(options == "bok"){
    var tileInfo = this._getCanvasObject(character.px, character.py);
    this._splitObjects(tileInfo, function() {
      for(var i = 0; i<foods.length;i++){
        if(tileInfo.order==foods[i].order){
          foods.push(foods[i]);
          foods.splice(0,foods.length-1);
        }
      }
      if(tileInfo.order == "if"){
        if_block = block.getInputTargetBlock("if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else if(tileInfo.order == "else_if"){
        if_block = block.getInputTargetBlock("else_if_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(if_block, callback);
        }, 500);
      }else{
        else_block = block.getInputTargetBlock("else_statements");
        setTimeout(function() {
          block.removeSelect();
          _this.run(else_block, callback);
        }, 500);
      }
    });
  }
};

Actions.prototype.together = function(block, callback) {
  var character = this.canvas.character,
      foods = this.canvas.foods,
      items = this.canvas.items,
      _this = this;
  var tileInfo = this._getCanvasObject(character.px, character.py);
  if(tileInfo.role == "friend"){
    character.hasItem = true;
    this._splitObjects(tileInfo, function() {
        setTimeout(function() {
          tileInfo.visible = false;
          createjs.Sound.play("success");
        }, 500);
        character.itemBitmap = tileInfo;
        _this.canvas.stage.update();
        setTimeout(function() {
          callback();
        }, 500);
    });
  }
};

Actions.prototype.support = function(block, callback) {
  var character = this.canvas.character,
      foods = this.canvas.foods,
      _this = this;
  var tileInfo = this._getCanvasObject(character.px, character.py);
  if(!tileInfo || tileInfo.role != "friend") {
   callback("????????? ????????? ?????????");
   return;
  }
  if(foods.length != 1){
    callback("?????? ????????? ???????????? ????????????");
    return;
  }
  if(tileInfo.order == "if"){
    this._splitObjects(tileInfo, function() {
          if(foods.length == 1){
            foods[0].useItem = false;
          }
          tileInfo.visible = false;
          _this.addItemImage(character, tileInfo.img, "one");
          createjs.Sound.play("success");
        _this.canvas.stage.update();
        setTimeout(function() {
          callback();
        }, 500);
    });
  }
};

Actions.prototype.present = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      itemBitmap = character.itemBitmap;
  if(!character.hasItem) {
    callback("??????????????? ???????????? ????????????.");
    return;
  }
  // ?????? ????????? ????????? ??????(?????? ??????)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItem) {
    this._splitObjects(food, function() {
      var pImage = "";
      if(food.img == "house_r") pImage = "house_r_present";
      else if(food.img == "house_g") pImage = "house_g_present";
      else if(food.img == "house_b") pImage = "house_b_present";
      else if(food.img == "house_y") pImage = "house_y_present";
      else pImage = "house_present";
      food.bitmap.image = _this.loader.getResult(pImage)
      _this.setScale(food.bitmap);
      var idx = foods.indexOf(food);
      foods.splice(idx,1);
      _this.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        callback();
      }, 500);
    });
    return;
  }
  // ???????????? ????????? ??? ?????? ??????
  callback("????????? ??? ??? ?????????");
}

Actions.prototype.make_picture_func = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      itemBitmap = character.itemBitmap;

  setTimeout(function() {
    character.draw_shape = "none";
    character.draw_color = "default";
    callback();
  }, 10);

  return;

}

Actions.prototype.make_picture_list_func = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      itemBitmap = character.itemBitmap;

  setTimeout(function() {
    character.draw_list= [];
    var draw_item = new Object();
    draw_item.shape = "none";
    draw_item.color = "default";
    character.draw_list.push(draw_item);
    character.draw_shape = "none";
    character.draw_color = "default";
    callback();
  }, 10);
  return;
}
Actions.prototype.make_number_list_func = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      itemBitmap = character.itemBitmap;

  setTimeout(function() {
    character.number_list= [];
    var list_item = new Object();
    list_item.num = 0;
    character.number_list.push(list_item);
    callback();
  }, 10);
  return;
}

Actions.prototype.run_function_func = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      itemBitmap = character.itemBitmap;

  setTimeout(function() {
    callback();
  }, 10);

  return;

}

Actions.prototype.define_shape = function(type, block, callback) {
  this.canvas.character.draw_shape = this._getFieldValue(block, "shape");
  setTimeout(function() {
    callback();
  }, 100);
};

Actions.prototype.define_color = function(type, block, callback) {
  this.canvas.character.draw_color = this._getFieldValue(block, "color");
  setTimeout(function() {
    callback();
  }, 100);
};

Actions.prototype.add_shape = function(type, block, callback) {
  var draw_item = new Object();
  draw_item.shape = this._getFieldValue(block, "shape");
  draw_item.color = "default";
  this.canvas.character.draw_list.push(draw_item);
  setTimeout(function() {
    callback();
  }, 100);
};
Actions.prototype.add_shape_color = function(type, block, callback) {
  var draw_item = new Object();
  draw_item.shape = this._getFieldValue(block, "shape");
  draw_item.color = this._getFieldValue(block, "color");
  this.canvas.character.draw_list.push(draw_item);
  setTimeout(function() {
    callback();
  }, 100);
};
Actions.prototype.add_number = function(type, block, callback) {
  var number_item = new Object();
  number_item.num = this._getFieldValue(block, "number");
  this.canvas.character.number_list.push(number_item);
  setTimeout(function() {
    callback();
  }, 100);
};

Actions.prototype.set_shape = function(type, block, callback) {
  if(this.canvas.character.draw_shape == "none"){
    callback("????????? ????????? ????????? ????????????.");
    return;
  }
  this.canvas.character.draw_shape = this._getFieldValue(block, "shape");
  setTimeout(function() {
    callback();
  }, 100);
};

Actions.prototype.set_color = function(type, block, callback) {
  if(this.canvas.character.draw_color == "default"){
    callback("????????? ????????? ????????? ????????????.");
    return;
  }
  this.canvas.character.draw_color = this._getFieldValue(block, "color");
  setTimeout(function() {
    callback();
  }, 100);
};

Actions.prototype.draw = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      itemBitmap = character.itemBitmap,
      draw_item_shape,
      draw_item_color;

  if(type == "list"){
    var list_num =  Number(this._getFieldValue(block, "list_num"));
    if(character.draw_list.length <= list_num){
      callback("???????????? ?????? ?????? ?????????.");
      return;
    }
    draw_item_shape =character.draw_list[list_num].shape;
    draw_item_color =character.draw_list[list_num].color;
  }else if(type == "loop_x"){
    if(character.x_num == 0) {
      callback("???????????? ??????????????? ?????? ?????? ?????? ??????????????? ?????????.");
      return;
    }
    if(!character.x_num ) {
      callback("X??? ????????? ???????????????.");
      return;
    }
    var list_num =  character.x_num;
    if(character.draw_list.length <= list_num){
      callback("???????????? ?????? ?????? ?????????.");
      return;
    }
    draw_item_shape =character.draw_list[list_num].shape;
    draw_item_color =character.draw_list[list_num].color;
  }else{
    draw_item_shape = character.draw_shape;
    draw_item_color = character.draw_color;
  }

  if(draw_item_shape=="none") {
    callback("????????? ?????? ????????? ????????? ????????????.");
    return;
  }
  if(draw_item_color == "default") {
    draw_item_color = "white";
  }
  // ?????? ????????? ????????? ??????(?????? ??????)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItem) {
    this._splitObjects(food, function() {
      var pImage = "";
      if(food.shape == draw_item_shape && food.color == draw_item_color){
        pImage = food.shape+"_"+food.color;
      }else{
        callback("????????? ???????????? ?????????");
        return;
      }
      setTimeout(function() {
        _this._restoreObject(function() {
          createjs.Sound.play("success");
          food.bitmap.image = _this.loader.getResult(pImage)
          _this.setScale(food.bitmap);
          food.complete = true;
          _this.canvas.stage.update();
          callback();
        });
      }, 500);
    });
    return;
  }
  // ???????????? ????????? ??? ?????? ??????
  callback("????????? ????????? ?????? ????????????");
}

Actions.prototype.wait = function(block, callback) {
  var character = this.canvas.character,
      _this = this,
      stopInfo = this._getCanvasObject(character.px, character.py, "stop");
  if(stopInfo && stopInfo.role=="stop") {
    stopInfo.bitmap.image = this.loader.getResult(stopInfo.contents[0].img);
    stopInfo.role = stopInfo.contents[0].role;
    this.setScale(stopInfo.bitmap);
    this.setCoord(stopInfo, stopInfo.px, stopInfo.py);
    var nextTileInfo;
    switch(stopInfo.position) {
        case "up":
            nextTileInfo = this._getCanvasObject(character.px, character.py-1);
            break;
        case "down":
            nextTileInfo = this._getCanvasObject(character.px, character.py+1);
            break;
        case "right":
            nextTileInfo = this._getCanvasObject(character.px+1, character.py);
            break;
        default:
            nextTileInfo = this._getCanvasObject(character.px-1, character.py);
    }
    nextTileInfo.obstacle = false;
    setTimeout(function() {
      createjs.Sound.play("success");
      _this.canvas.stage.update();
      callback();
    }, 5000);
    return;
  }
};

Actions.prototype.condition = function(type, block, callback) {
  var character = this.canvas.character,
      arr = ["u", "r", "d", "l"],
      if_move_left = type == "if_move_left" ? -1 : 0,
      if_move_right = type == "if_move_right" ? 1 : 0,
      idx = arr.indexOf(character.direct) + if_move_left + if_move_right;
      direct = arr[(idx + 4) % 4],
      x_next = character.px + {'u':0, 'r':1, 'd':0, 'l':-1}[direct],
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[direct],
      tile = this.map[y_next][x_next],
      move_forward = tile == "." || tile == ")" || tile == "%",
      if_block = block.getInputTargetBlock("if_statements"),
      else_block = block.getInputTargetBlock("else_statements"),
      child = move_forward ? if_block : else_block,
      _this = this;
  setTimeout(function() {
    block.removeSelect();
    _this.run(child, callback);
  }, 100);
};
Actions.prototype.condition_nodirentio = function(type, block, callback) {
  var character = this.canvas.character,
      isUpIndex = type == "no_up" ? -1 : 0,
      isDownIndex = type == "no_down" ? 1 : 0,
      isLeftIndex = type == "no_left" ? -1 : 0,
      isRigthIndex = type == "no_right" ? 1 : 0,
      idx = isLeftIndex + isRigthIndex;
      idy = isUpIndex + isDownIndex;
      x_next = character.px + idx,
      y_next = character.py + idy,
      tile = this.map[y_next][x_next],
      move_forward = tile == "." || tile == ")" || tile == "%",
      if_block = block.getInputTargetBlock("if_statements"),
      else_block = block.getInputTargetBlock("else_statements"),
      child = move_forward ? else_block : if_block,
      _this = this;
  setTimeout(function() {
    block.removeSelect();
    _this.run(child, callback);
  }, 100);
};

/*
??? ??? ?????????(f) wall ??????(f) ?????????
??? ??? ?????????(f) wall ??????(t) ?????? ??????
??? ??? ?????????(t) wall ??????(f) ?????? ??????
??? ??? ?????????(t) wall ??????(t) ?????????
*/
Actions.prototype.condition_movable = function(type, block, callback) {
  var character = this.canvas.character;
  if(!character.ifstep||!character.ifcount){
    character.ifcount = 0;
    character.ifstep = 0;
  } else if((character.ifstep + character.ifcount) > 1){
    character.ifcount = 0;
    character.ifstep = 0;
    callback();
    return;
  }
  var isMove = (type.substring(0,2) == "no") ? 0 : 1,
      isUpIndex = (type == "no_up" || type == "up") ? -1 : 0,
      isDownIndex = (type == "no_down" || type == "down") ? 1 : 0,
      isLeftIndex = (type == "no_left" || type == "left") ? -1 : 0,
      isRigthIndex =(type == "no_right" || type == "right") ? 1 : 0,
      idx = isLeftIndex + isRigthIndex;
      idy = isUpIndex + isDownIndex;
      x_next = character.px + idx,
      y_next = character.py + idy,
      tile = this.map[y_next][x_next],
      move_forward = tile == "." || tile == ")" || tile == "%",
      if_block = block.getInputTargetBlock("if_statements"),
      child = if_block,
      _this = this;

  character.ifstep ++;

  if(move_forward) move_forward = 1;
  else move_forward = 0;

  if(isMove + move_forward == 1){
    callback();
    return;
  }else{
    character.ifcount++;
  }
  if((character.ifstep + character.ifcount) > 2){
    character.ifcount = 0;
    character.ifstep = 0;
  }

  setTimeout(function() {
    block.removeSelect();
    _this.run(child, callback);
  }, 100);
};

Actions.prototype.condition_shape = function(type, block, callback) {
  var _this = this,
      character = this.canvas.character,
      target = this._getCanvasObject(character.px, character.py),
      if_block = block.getInputTargetBlock("if_statements"),
      else_block = block.getInputTargetBlock("else_statements"),
      child = type == target.shape + "_" + target.color ? if_block : else_block;
  setTimeout(function() {
    block.removeSelect();
    _this.run(child, callback);
  }, 100);
};

Actions.prototype.define_x = function(type, block, callback) {
  var character = this.canvas.character,
      count = this._getFieldValue(block, "count"),
      _this = this;

  setTimeout(function() {
    character.x_num = count;
    callback();
  }, 10);
};

Actions.prototype.repeat = function(type, block, callback) {
  var character = this.canvas.character,
      child = block.getInputTargetBlock("statements"),
      count = (type == "repeat_until" || type == "repeat_until_item") ? 0 : this._getFieldValue(block, "count"),
      _this = this;
  if(!child) {
    callback("?????? ????????? ????????????");
    return;
  }
  function proc() {
    var tile = _this.map[character.py][character.px],
        item = _this._getCanvasObject(character.px, character.py, "item");
    if( (type == "repeat_until" && tile != "%") ||
        (type == "repeat_until_item" && item && item.itemCount > 0) ||
        count > 0) {
      _this.setTimeoutKey = setTimeout(function() {
        block.removeSelect();
        count--;
        _this.delay = 50;
        _this.run(child, function() {
          block.addSelect();
          proc();
        });
      }, 0);
    } else {
      block.addSelect();
      _this.delay = 100;
      _this.setTimeoutKey = setTimeout(callback, 0);
    }
  };
  proc();
};
Actions.prototype.forloop = function(type, block, callback) {
  var character = this.canvas.character,
      child = block.getInputTargetBlock("statements"),
      start_num = 0,
      end_num = 0,
      increase_num = 0,
      _this = this;
  if(type == "type1"){
    start_num = 1;
    end_num = this._getFieldValue(block, "end_num");
    increase_num = 1;
  }else if(type == "type2"){
    start_num = this._getFieldValue(block, "start_num");
    end_num = this._getFieldValue(block, "end_num");
    increase_num = 1;
  }else{
    start_num = this._getFieldValue(block, "start_num");
    end_num = this._getFieldValue(block, "end_num");
    increase_num = this._getFieldValue(block, "increase_num");
  }
  if(!child) {
    callback("?????? ????????? ????????????");
    return;
  }
  var x_num = start_num;
  function proc() {
    var tile = _this.map[character.py][character.px];
    if(child && x_num <= end_num) {
      _this.setTimeoutKey = setTimeout(function() {
        block.removeSelect();
        character.x_num = x_num;
        x_num = x_num + increase_num;
        _this.delay = 50;
        _this.run(child, function() {
          block.addSelect();
          proc();
        });
      }, 0);
    } else {
      block.addSelect();
      character.x_num = 0;
      _this.delay = 100;
      _this.setTimeoutKey = setTimeout(callback, 0);
    }
  };
  proc();
};

Actions.prototype.repeat_x_num = function(block, callback) {
  var character = this.canvas.character,
      child = block.getInputTargetBlock("statements"),
      _this = this;

  if(!child) {
    callback("?????? ????????? ????????????");
    return;
  }
  if(character.x_num == 0) {
    callback("???????????? ??????????????? ?????? ?????? ?????? ??????????????? ?????????.");
    return;
  }
  if(!character.x_num ) {
    callback("X??? ????????? ???????????????.");
    return;
  }

  var count = character.x_num;
  function proc() {
    var tile = _this.map[character.py][character.px];
    if(child && count > 0) {
      _this.setTimeoutKey = setTimeout(function() {
        block.removeSelect();
        count--;
        _this.delay = 50;
        _this.run(child, function() {
          block.addSelect();
          proc();
        });
      }, 0);
    } else {
      block.addSelect();
      _this.delay = 100;
      _this.setTimeoutKey = setTimeout(callback, 0);
    }
  };
  proc();
};

Actions.prototype.repeat_list_num = function(type, block, callback) {
  var character = this.canvas.character,
      child = block.getInputTargetBlock("statements"),
      _this = this;

  if(!child) {
    callback("?????? ????????? ????????????");
    return;
  }
  if(type == "loop_x"){
    if(character.x_num == 0) {
      callback("???????????? ??????????????? ?????? ?????? ?????? ??????????????? ?????????.");
      return;
    }
    if(!character.x_num ) {
      callback("X??? ????????? ???????????????.");
      return;
    }
    var list_num =  character.x_num;
  }else{
    var list_num =  this._getFieldValue(block, "list_num");
  }

  if(character.number_list.length <= list_num){
    callback("???????????? ?????? ?????? ?????????.");
    return;
  }

  var count = character.number_list[list_num].num;
  function proc() {
    var tile = _this.map[character.py][character.px];
    if(child && count > 0) {
      _this.setTimeoutKey = setTimeout(function() {
        block.removeSelect();
        count--;
        _this.delay = 50;
        _this.run(child, function() {
          block.addSelect();
          proc();
        });
      }, 0);
    } else {
      block.addSelect();
      _this.delay = 100;
      _this.setTimeoutKey = setTimeout(callback, 0);
    }
  };
  proc();
};


Actions.prototype._makePseudoBlock = function(json) {
  var _this = this;
  var obj = $.extend({
    addSelect: function() {},
    removeSelect: function() {},
    getInputTargetBlock: function(target) {
      return _this._makePseudoBlock(this[target]);
    },
    getFieldValue: function(field) {
      return this[field];
    },
    getNextBlock: function() {
      return this.nextStatement || null;
    }
  }, json);
  return obj;
};

Actions.prototype.func = function(contents, block, callback) {
  var _this = this;
  if(typeof contents == "object") {
    contents = Object.assign({}, contents);
    Object.keys(contents).forEach(function(key) {
      if(typeof contents[key] == "string" && contents[key].slice(0, 1) == "@") {
        contents[key] = _this._getFieldValue(block, contents[key].slice(1));
      }
    });
    var pseudoBlock = this._makePseudoBlock(contents);
    this.run(pseudoBlock, callback);
  } else if(typeof contents == "string") {
    var blocks = this.kidscoding.workspace.getAllBlocks(),
        target = blocks.filter(function(block) {
          return block.type === contents;
        })[0];
    this.run(target, callback);
  }
};
