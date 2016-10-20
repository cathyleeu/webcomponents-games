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
    tween.to({rotation: rotation}, 300)
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
      tween.wait(character.sprite ? 0 : 100)
           .to({
             x: _this.tile_size*x_next + _this.tile_size/2,
             y: _this.tile_size*y_next + _this.tile_size/2
           }, 500)
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
      _this._setFocus(x_next, y_next, character.sprite ? 0 : 100, 500);
    });
  });
};

Actions.prototype._splitObjects = function(spider, callback) {
  var _this = this,
      character = this.canvas.character,
      px = character.px,
      py = character.py;
  // 이미 갈라서 있다면 아무것도 하지 않는다
  if(character._splitObject) {
    callback();
    return;
  }
  // 캐릭터 반대편으로 움직일 캐릭터를 저장
  character._splitObject = spider;
  // 거미와 캐릭터를 맨 위로
  this.canvas.stage.removeChild(spider);
  this.canvas.stage.addChild(spider);
  this.canvas.stage.removeChild(character);
  this.canvas.stage.addChild(character);
  var tweens = [
    createjs.Tween.get(character)
        .wait(character.sprite ? 0 : 100)
        .to({
          x: _this.tile_size*(px - 0.5) + _this.tile_size/2,
          y: _this.tile_size*py + _this.tile_size/2
        }, 500)
        .call(callback)
        .addEventListener("change", function(e) {
          _this.canvas.stage.update();
        }),
    createjs.Tween.get(spider)
        .wait(character.sprite ? 0 : 100)
        .to({
          x: _this.tile_size*(px + 0.5) + _this.tile_size/2,
          y: _this.tile_size*py + _this.tile_size/2
        }, 500)
  ];
  var timeline = new createjs.Timeline(tweens, "split", {
    loop: false,
    paused: false
  });
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
      tweens = [
        createjs.Tween.get(character)
            .wait(character.sprite ? 0 : 100)
            .to({
              x: _this.tile_size*px + _this.tile_size/2,
              y: _this.tile_size*py + _this.tile_size/2
            }, 500)
            .call(callback)
            .addEventListener("change", function(e) {
              _this.canvas.stage.update();
            }),
        createjs.Tween.get(character._splitObject)
            .wait(character.sprite ? 0 : 100)
            .to({
              x: _this.tile_size*px + _this.tile_size/2,
              y: _this.tile_size*py + _this.tile_size/2
            }, 500)
      ];
  character._splitObject = null;
  var timeline = new createjs.Timeline(tweens, "split", {
    loop: false,
    paused: false
  });
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
    tween.wait(200)
         .to({
           x: _this.tile_size*x_next + _this.tile_size/2,
           y: _this.tile_size*y_next + _this.tile_size/2}
          , 350)
         .to({
           x: _this.tile_size*character.px + _this.tile_size/2,
           y: _this.tile_size*character.py + _this.tile_size/2},
          350)
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
        rock: "바위에 막혔어요",
        spider: "사냥꾼에게 잡혔어요",
        trap: "덫에 걸렸어요"
      }[obj.role];
      callback(message);
    });
    return;
  }

  obj = this._getCanvasObject(x_next, y_next);

  var localData = store.get('data') || {};
  var hash = location.hash.slice(2),
      idx = hash.indexOf("?"),
      path = idx >= 0 ? hash.slice(0, idx) : hash;
  path = path.split("/").slice(0, -1).join("/");
  var score = localData[path] ? localData[path].score || 0 : 0;


  if( obj && obj.obstacle || (obj && obj.link && obj.min_score && score < obj.min_score)) {
    this._bounceCharacter(x_next, y_next, function() {
      callback(obj);
    });
  } else {
    this._moveCharacter(x_next, y_next, function() {
      callback(obj);
    });
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
    // 아이템을 가져올 수 없다면
    callback("아이템을 가져올 수 없어요");
    return;
  }
  character.hasItem = true;
  if(item.itemCount) {
    // 다수의 아이템
    // 아이템의 개수 감소
    var itemCount = this.getItemCount(item);
    if(itemCount == 0) {
      callback("아이템을 가져올 수 없어요");
      return;
    }
    this._splitObjects(item, function() {
      if(itemCount - 1 == 0) {
        item.visible = false;
      }
      _this.setItemCount(item, itemCount - 1);
      // 캐릭터의 아이템 소유 개수 증가
      itemCount = _this.getItemCount(character);
      _this.setItemCount(character, itemCount + 1);
      _this.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        callback();
      }, 500);
    });
  } else {
    // 곡괭이, 연꽃(숫자 없는 아이템)
    item.visible = false;
    character.itemBitmap = item;
    this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);
  }
};

Actions.prototype.getItem2 = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      item = this._getCanvasObject(character.px, character.py, "item");
  if( !item ) {
    // 아이템을 가져올 수 없다면
    callback("아이템을 가져올 수 없어요");
    return;
  }

  character.hasItem = true;
  var itemCount = this.getItemCount(item);

  if(item.itemCount) {
    if(itemCount == 0) {
      callback("아이템을 가져올 수 없어요");
      return;
    }
    // 다수의 아이템
    //아이템의 소유 개수 감소
    this.setItemCount(item, itemCount - 1);
    // 캐릭터의 아이템 소유 개수 증가
    var itemCount = this.getItemCount(character);
    this.setItemCount(character, itemCount + 1);
    if(!character.itemList){
      character.itemList = [];
    }
    character.itemList.push(item);
  }else{
    item.visible = false;
    character.itemBitmap = item;
  }
  this.canvas.stage.update();
  createjs.Sound.play("success");
  setTimeout(function() {
    callback();
  }, 500);
};

Actions.prototype.useItem = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      itemBitmap = character.itemBitmap;
  if(!character.hasItem) {
    callback("아이템을 가지고 있지 않아요");
    return;
  }
  // 목표 위에서 아이템 사용(패턴 매칭)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItem) {
    if(character.itemCountBitmap) {
      // 다수의 아이템
      this._splitObjects(food, function() {
        var itemCount = _this.getItemCount(character);
        if(itemCount == 0) {
          callback("아이템을 가지고 있지 않아요");
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
      // 아이템 이동하기
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

  // 바위 위에서 아이템 사용
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

  // 아이템을 사용할 수 없는 경우
  callback("아이템을 사용할 수 없어요");
}

Actions.prototype.useItem2 = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      itemBitmap = character.itemBitmap;
  if(!character.hasItem) {
    callback("아이템을 가지고 있지 않아요");
    return;
  }

  // 목표 위에서 아이템 사용(패턴 매칭)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItem) {
    if(character.itemList && character.itemList.length>0) {
      // 다수의 아이템
      this._splitObjects(food, function() {
        var itemCount = _this.getItemCount(character);
        if(itemCount == 0) {
          callback("아이템을 가지고 있지 않아요");
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
        itemBitmap.visible = true;
        itemBitmap.px = food.px;
        itemBitmap.py = food.py;
        itemBitmap.x = food.x;
        itemBitmap.y = food.y;
        _this.canvas.stage.update();
        createjs.Sound.play("success");
        setTimeout(function() {
          callback();
        }, 500);
      });
      return;
    }
    callback("아이템을 사용할 수 없어요");
    return;
  }
  // 아이템을 사용할 수 없는 경우
  callback("아이템을 사용할 수 없어요");
}

Actions.prototype.check = function(block, callback) {
  var _this = this,
      foods = this.canvas.foods,
      character = this.canvas.character;
  // 바위 위에서 아이템 사용
  var chest = this._getCanvasObject(character.px, character.py, "chest");
  if(chest) {
    var ranNum = parseInt(Math.random()*chest.contents.length, 10);
    if(chest.contents[ranNum].role == "food"){
      chest.bitmap.image = _this.loader.getResult(chest.contents[ranNum].img);
      chest.role = "food";
      chest.useItem = true;
      chest.order = chest.contents[ranNum].order;
      foods.push(chest);
      foods.shift();
      _this.setCoord(chest, chest.px, chest.py);
    }
    else if(chest.contents[ranNum].role == "item") {
      chest.bitmap.image = _this.loader.getResult(chest.contents[ranNum].img);
      chest.role = "item";
      chest.order = chest.contents[ranNum].order;
      _this.setCoord(chest, chest.px, chest.py);
    }else if(chest.contents[ranNum].role == "friend") {
      chest.bitmap.image = _this.loader.getResult(chest.contents[ranNum].img);
      chest.role = "friend";
      chest.order = chest.contents[ranNum].order;
      _this.setCoord(chest, chest.px, chest.py);
    }else{
      chest.bitmap.image = _this.loader.getResult(chest.contents[ranNum].img);
      chest.role = chest.contents[ranNum].role;
      _this.setCoord(chest, chest.px, chest.py);
    }
    createjs.Sound.play("success");
    _this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 1000);
    return;
  }
  callback("확인할 것이 없어요");
}

Actions.prototype.check2 = function(block, callback) {
  var _this = this,
      foods = this.canvas.foods,
      character = this.canvas.character;
  // 바위 위에서 아이템 사용
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
    _this.setCoord(chest, chest.px, chest.py);

    createjs.Sound.play("success");
    _this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 1000);
    return;
  }
  callback("확인할 것이 없어요");
}

Actions.prototype.action = function(hand, block, callback) {
  var character = this.canvas.character;
  var spider = this._getCanvasObject(character.px, character.py, "spider");
  var _this = this;
  this._splitObjects(spider, function() {
    if(spider) {
      if(hand == spider.hand) {
        callback("비겼어요");
        return;
      }
      if( (hand == "rock"     && spider.hand == "paper") ||
          (hand == "scissors" && spider.hand == "rock") ||
          (hand == "paper"    && spider.hand == "scissors") ) {
        callback("졌어요");
        return;
      }
      setTimeout(function() {
        spider.visible = false;
        _this.canvas.stage.update();
        createjs.Sound.play("success");
        _this._restoreObject(callback);
      }, 500);
    } else {
      callback("가위바위보를 할 수 없어요");
    }
  });
};

Actions.prototype.conditioncheck = function(options, block, callback) {
  var character = this.canvas.character,
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
  }
};

Actions.prototype.conditioncheck3 = function(options, block, callback) {
  var character = this.canvas.character,
      foods = this.canvas.foods,
      items = this.canvas.items,
      _this = this;

  if(options == "trash"  || options == "guide" ){
    var tileInfo = character.itemBitmap;
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
  } else if(options == "aClock" || options == "dClock"){
    var tileInfo = this._getCanvasObject(character.px, character.py);

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

Actions.prototype.present = function(block, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      itemBitmap = character.itemBitmap;
  if(!character.hasItem) {
    callback("선물이 없어요");
    return;
  }
  // 목표 위에서 아이템 사용(패턴 매칭)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItem) {
      var pImage = "";
      if(food.img == "house_r") pImage = "house_r_present";
      else if(food.img == "house_g") pImage = "house_g_present";
      else if(food.img == "house_y") pImage = "house_y_present";
      else pImage = "house_present";
      food.bitmap.image = _this.loader.getResult(pImage)
      var idx = foods.indexOf(food);
      foods.splice(idx,1);
      this.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        callback();
      }, 500);
    return;
  }
  // 아이템을 사용할 수 없는 경우
  callback("선물을 할 수 없어요");
}

Actions.prototype.wait = function(block, callback) {
  var character = this.canvas.character,
      _this = this,
      stopInfo = this._getCanvasObject(character.px, character.py, "stop");
  if(stopInfo && stopInfo.role=="stop") {
    stopInfo.bitmap.image = this.loader.getResult(stopInfo.contents[0].img);
    stopInfo.role = stopInfo.contents[0].role;
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
  }, 500);
};

Actions.prototype.repeat = function(type, block, callback) {
  var character = this.canvas.character,
      child = block.getInputTargetBlock("statements"),
      count = +block.getFieldValue("count"),
      _this = this;
  function proc() {
    var tile = _this.map[character.py][character.px];
    if(child && ((tile != "%" && type == "repeat_until") || count > 0)) {
      _this.setTimeoutKey = setTimeout(function() {
        block.removeSelect();
        count--;
        _this.run(child, function() {
          block.addSelect();
          proc();
        });
      }, 0);
    } else {
      block.addSelect();
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
  if(typeof contents == "object") {
    var pseudoBlock = this._makePseudoBlock(contents);
    this.run(pseudoBlock, callback);
  }
};
