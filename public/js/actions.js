Actions = function(kidscoding, loader, mazeInfo) {
  this.kidscoding = kidscoding;
  this.loader = loader;
  this.map = mazeInfo.map;
  this.canvas = mazeInfo.canvas;
  this.width = mazeInfo.width;
  this.height = mazeInfo.height;
  this.view_size = mazeInfo.view_size;
  this.tile_size = mazeInfo.tile_size;
};

Actions.prototype._rotateCharacter = function(direct, callback) {
  var _this = this,
      character = this.canvas.character;
  if(character.direct == direct) {
    callback();
    return;
  }
  character.direct = direct;
  if(character.rotate_mode == "image") {
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
      direct = character.direct;
  if(character.px == x_next && character.py != y_next) {
    direct = character.py > y_next ? "u" : "d";
  } else if (character.px != x_next && character.py == y_next) {
    direct = character.px > x_next ? "l" : "r";
  }
  this._rotateCharacter(direct, function() {
    var tween = createjs.Tween.get(character);
    tween.wait(100)
         .to({
           x: _this.tile_size*x_next + _this.tile_size/2,
           y: _this.tile_size*y_next + _this.tile_size/2
         }, 500)
         .call(function() {
           character.rotation = (character.rotation + 360) % 360;
           character.px = x_next;
           character.py = y_next;
           callback();
         })
         .addEventListener("change", function(e) {
           _this.canvas.stage.update();
         });
    if(_this.view_size != _this.width) {
      var stage_tween = createjs.Tween.get(_this.canvas.stage);
      var x = _this.canvas.stage.x - _this.tile_size * {u:0, r:1, d:0, l:-1}[direct],
          y = _this.canvas.stage.y - _this.tile_size * {u:-1, r:0, d:1, l:0}[direct];
      if(x > 0) {
        x = 0;
      } else if(x < -_this.tile_size * (_this.width - _this.view_size)) {
        x = -_this.tile_size * (_this.width - _this.view_size);
      }
      if((_this.tile_size * x_next + x) / _this.tile_size != _this.view_size / 2 - 1) {
        x = _this.canvas.stage.x;
      }
      if(y > 0) {
        y = 0;
      } else if(y < -_this.tile_size * (_this.height - _this.view_size)) {
        y = -_this.tile_size * (_this.height - _this.view_size);
      }
      if((_this.tile_size * y_next + y) / _this.tile_size != _this.view_size / 2 - 1) {
        y = _this.canvas.stage.y;
      }
      stage_tween.wait(100)
           .to({x:x, y:y}, 500)
           .addEventListener("change", function(e) {
             _this.canvas.stage.update();
           });
    }
  });
};

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

Actions.prototype._trapCharacter = function(x_next, y_next, callback) {
  var _this = this;
  this._moveCharacter(x_next, y_next, function() {
    var character = _this.canvas.character,
        tween = createjs.Tween.get(character);
    tween.to({rotation: character.rotation+720}, 1000)
         .call(function() {
           character.rotation = (character.rotation + 360) % 360;
           callback();
         })
         .addEventListener("change", function() {
           _this.canvas.stage.update();
         });
  });
};

Actions.prototype._getCanvasObject = function(x, y) {
  var foods = this.canvas.foods,
      obstacles = this.canvas.obstacles;
  if(0 <= x && x < this.width && 0 <= y && y < this.height) {
    if( this.canvas.item &&
        this.canvas.item.px == x &&
        this.canvas.item.py == y &&
        this.canvas.item.visible == true) {
      return this.canvas.item;
    }

    for(var i = 0; i < foods.length; i++) {
      if( foods[i].px == x &&
          foods[i].py == y &&
          foods[i].visible == true) {
        return foods[i];
      }
    }
    for(var i = 0; i < obstacles.length; i++) {
      if( obstacles[i].px == x &&
          obstacles[i].py == y &&
          obstacles[i].visible == true) {
        return obstacles[i];
      }
    }
    return {
      role: "empty",
      obstacle: false
    };
  }
  return {
    role: "obstacle",
    obstacle: true
  };
};

Actions.prototype._gameMove = function(direct, callback) {
  if(createjs.Tween.hasActiveTweens()) {
    return;
  }
  var character = this.canvas.character,
      x_next = character.px + {'u':0, 'r':1, 'd':0, 'l':-1}[direct],
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[direct];

  var obj = this._getCanvasObject(x_next, y_next);
  if( obj.role == "food" ) {
    this._moveCharacter(x_next, y_next, function() {
      callback(obj);
    });
  } else if( obj.obstacle ) {
    if(obj.role == "rock" || obj.role == "obstacle") {
      this._bounceCharacter(x_next, y_next, function() {
        callback(null);
      });
    } else if(obj.role == "spider") {
      this._trapCharacter(x_next, y_next, function() {
        callback(null);
      });
    } else if(obj.role == "trap") {
      this._trapCharacter(x_next, y_next, function() {
        callback(null);
      });
    }
  } else {
    this._moveCharacter(x_next, y_next, function() {
      callback(null);
    });
  }
};

Actions.prototype.move = function(type, callback) {
  var _this = this,
      character = this.canvas.character,
      foods = this.canvas.foods,
      obstacles = this.canvas.obstacles,
      spiders = this.canvas.spiders,
      x_next = character.px,
      y_next = character.py,
      diff = type == "jump_forward" ? 2 : 1,
      direct = type.slice(0, 1);

  if(type == "forward" || type == "jump_forward") {
    direct = character.direct;
  }
  x_next += {'u':0, 'r':1, 'd':0, 'l':-1}[direct] * diff;
  y_next += {'u':-1, 'r':0, 'd':1, 'l':0}[direct] * diff;

  var obj = this._getCanvasObject(x_next, y_next);
  if( obj.role == "food" ) {
    this._moveCharacter(x_next, y_next, function() {
      obj.visible = false;
      createjs.Sound.play("success");
      _this.canvas.stage.update();
      callback();
    });
  } else if( obj.obstacle ) {
    if(obj.role == "rock" || obj.role == "obstacle") {
      this._bounceCharacter(x_next, y_next, function() {
        callback(obj.role == "rock" ? "바위에 막혔어요" : "벽에 부딪쳤어요");
      });
    } else if(obj.role == "spider") {
      this._trapCharacter(x_next, y_next, function() {
        callback("거미줄에 걸렸어요");
      });
    } else if(obj.role == "trap") {
      this._trapCharacter(x_next, y_next, function() {
        callback("덫에 걸렸어요");
      });
    }
  } else {
    this._moveCharacter(x_next, y_next, function() {
      callback();
    });
  }
};

Actions.prototype.rotate = function(type, callback) {
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

Actions.prototype.getItem = function(callback) {
  var character = this.canvas.character,
      item = this._getCanvasObject(character.px, character.py);
  if( item.role == "item") {
    character.item = true;
    item.visible = false;
    this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);
  } else { // 아이템을 가져올 수 없다면
    callback("아이템을 가져올 수 없어요");
  }
};

Actions.prototype.useItem = function(callback) {
  var character = this.canvas.character,
      x_next = character.px + {'u':0, 'r':1, 'd':0, 'l':-1}[character.direct],
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[character.direct];
  if(!character.item) {
    callback("아이템을 가지고 있지 않아요");
    return;
  }
  var rock = this._getCanvasObject(x_next, y_next);
  if(rock.role == "rock") {
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
  } else {
    callback("아이템을 사용할 수 없어요");
  }
};

Actions.prototype.action = function(hand, callback) {
  var character = this.canvas.character,
      x_next = character.px + {'u':0, 'r':1, 'd':0, 'l':-1}[character.direct],
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[character.direct];
  var spider = this._getCanvasObject(x_next, y_next);
  if(spider.role == "spider") {
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
    spider.visible = false;
    this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);
  } else {
    callback("가위바위보를 할 수 없어요");
  }
};

Actions.prototype.condition = function(type, if_code, else_code, callback) {
  var character = this.canvas.character,
      queue = this.kidscoding.queue,
      q_idx = this.kidscoding.q_idx,
      arr = ["u", "r", "d", "l"],
      if_move_left = type == "if_move_left" ? -1 : 0,
      if_move_right = type == "if_move_right" ? 1 : 0,
      idx = arr.indexOf(character.direct) + if_move_left + if_move_right;
      direct = arr[(idx + 4) % 4],
      x_next = character.px + {'u':0, 'r':1, 'd':0, 'l':-1}[direct],
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[direct],
      tile = this.map[y_next][x_next],
      move_forward = tile == "." || tile == ")" || tile == "%",
      blocks = move_forward ? if_code : else_code;

  var temp = queue.splice(q_idx+1, queue.length);
  eval("with(this.kidscoding){\n" + blocks + "\n}");
  queue = queue.concat(temp);
  setTimeout(function() {
    callback();
  }, 1);
};

Actions.prototype.repeat = function(count, code, callback) {
  var character = this.canvas.character,
      queue = this.kidscoding.queue,
      q_idx = this.kidscoding.q_idx,
      tile = this.map[character.py][character.px],
      repeat = (tile != "%" && count == "repeat_until") || count > 0;
  if(repeat) {
    var temp = queue.splice(q_idx + 1, queue.length);
    eval("with(this.kidscoding){\n" + code + "\n}");
    queue.push($.extend({}, queue[q_idx]));
    if(typeof count == "number") {
      --queue[queue.length -1].args[0];
    }
    queue = queue.concat(temp);
  }
  setTimeout(function() {
    callback();
  }, 1);
};
