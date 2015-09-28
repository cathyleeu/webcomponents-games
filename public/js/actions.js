Actions = function(kidscoding, loader, mazeInfo) {
  this.kidscoding = kidscoding;
  this.loader = loader;
  this.map = mazeInfo.map;
  this.canvas = mazeInfo.canvas;
  this.width = mazeInfo.width;
  this.height = mazeInfo.height;
  this.view_size = mazeInfo.view_size || null;
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
         .to({x:50*x_next + 25, y: 50*y_next + 25}, 500)
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
      var x = _this.canvas.stage.x - 50 * {u:0, r:1, d:0, l:-1}[direct],
          y = _this.canvas.stage.y - 50 * {u:-1, r:0, d:1, l:0}[direct];
      if(x > 0) {
        x = 0;
      } else if(x < -50 * (_this.width - _this.view_size)) {
        x = -50 * (_this.width - _this.view_size);
      }
      if((50 * x_next + x) / 50 != _this.view_size / 2 - 1) {
        x = _this.canvas.stage.x;
      }
      if(y > 0) {
        y = 0;
      } else if(y < -50 * (_this.height - _this.view_size)) {
        y = -50 * (_this.height - _this.view_size);
      }
      if((50 * y_next + y) / 50 != _this.view_size / 2 - 1) {
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
         .to({x:50*x_next + 25, y: 50*y_next + 25}, 350)
         .to({x:50*character.px + 25, y: 50*character.py + 25}, 350)
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

Actions.prototype._gameMove = function(direct, callback) {
  if(createjs.Tween.hasActiveTweens()) {
    return;
  }
  var character = this.canvas.character,
      x_next = character.px + {'u':0, 'r':1, 'd':0, 'l':-1}[direct],
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[direct];

  var tile = "#";
  if(0 <= x_next && x_next < this.width && 0 <= y_next && y_next < this.height) {
    tile = this.map[y_next][x_next];
  }
  if( tile == "." ) {
    this._moveCharacter(x_next, y_next, function() {
      callback(tile);
    });
  } else if( tile == "^" ) {
    this._trapCharacter(x_next, y_next, function() {
      callback(tile);
    });
  } else {
    this._bounceCharacter(x_next, y_next, function() {
      callback(tile);
    });
  }
}

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

  var tile = "#";
  if(0 <= x_next && x_next < this.width && 0 <= y_next && y_next < this.height) {
    tile = this.map[y_next][x_next];
  }
  if( tile == "." || tile == ")" ) {
    this._moveCharacter(x_next, y_next, function() {
      callback();
    });
  } else if( tile == "%" ) {
    this._moveCharacter(x_next, y_next, function() {
      for(var i = 0; i < foods.length; i++) {
        if(foods[i].px == x_next && foods[i].py == y_next) {
          foods[i].visible = false;
          break;
        }
      }
      createjs.Sound.play("success");
      _this.canvas.stage.update();
      callback();
    });
  } else if( tile == "5" || tile == "4" || tile == "3" || tile == "2" || tile == "1" ) {
    for(var i = 0; i < obstacles.length; i++) {
      if( obstacles[i].px == x_next &&
          obstacles[i].py == y_next) {
        this._bounceCharacter(x_next, y_next, function() {
          callback("바위에 막혔어요");
        });
      }
    }
    if(i == obstacles.length) {
      this._moveCharacter(x_next, y_next, function() {
        callback();
      });
    }
  } else if( tile == "R" || tile == "S" || tile == "P" ) {
    for(var i = 0; i < spiders.length; i++) {
      if( spiders[i].px == x_next &&
          spiders[i].py == y_next &&
          spiders[i].visible == true) {
        this._trapCharacter(x_next, y_next, function() {
          callback("거미줄에 걸렸어요");
        });
        break;
      }
    }
    if(i == spiders.length) {
      this._moveCharacter(x_next, y_next, function() {
        callback();
      });
    }
  } else if( tile == "^" ) {
    this._trapCharacter(x_next, y_next, function() {
      callback("덫에 걸렸어요");
    });
  } else { // 이동할 수 없다면
    this._bounceCharacter(x_next, y_next, function() {
      callback("벽에 부딪쳤어요");
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
  var character = this.canvas.character;
  if( character.px == this.canvas.item.px &&
      character.py == this.canvas.item.py) {
    character.item = true;
    this.canvas.stage.removeChild(this.canvas.item);
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
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[character.direct],
      rotation = character.rotation,
      num = +this.map[y_next][x_next];
  if(!character.item) {
    callback("아이템을 가지고 있지 않아요");
    return;
  }
  if(!isNaN(num)) {
    for(var i = 0; i < this.canvas.obstacles.length; i++) {
      if( this.canvas.obstacles[i].px == x_next &&
          this.canvas.obstacles[i].py == y_next) {
        var bitmap = this.canvas.obstacles[i];
        num = bitmap.num - 1;

        if(num > 0) {
          // add rock
          bitmap.num = num;
          bitmap.image = bitmap["img" + num];
        } else {
          // remove rock
          this.canvas.stage.removeChild(this.canvas.obstacles[i]);
          this.canvas.obstacles.splice(i, 1);
        }

        createjs.Sound.play("hammer");
        this.canvas.stage.update();
        setTimeout(function() {
          callback();
        }, 1000);
        return;
      }
    }
    // 이미 바위가 없어져 아이템을 사용하지 않은 경우는 실패
  }
  callback("아이템을 사용할 수 없어요");
};

Actions.prototype.action = function(hand, callback) {
  var character = this.canvas.character,
      x_next = character.px + {'u':0, 'r':1, 'd':0, 'l':-1}[character.direct],
      y_next = character.py + {'u':-1, 'r':0, 'd':1, 'l':0}[character.direct],
      spiders = this.canvas.spiders;
  if( this.map[y_next][x_next] != "R" &&
      this.map[y_next][x_next] != "S" &&
      this.map[y_next][x_next] != "P") {
    callback("가위바위보를 할 수 없어요");
    return;
  }
  var spider;
  for(var i = 0; i < spiders.length; i++) {
    if( spiders[i].px == x_next &&
        spiders[i].py == y_next) {
      spider = spiders[i];
    }
  }
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
