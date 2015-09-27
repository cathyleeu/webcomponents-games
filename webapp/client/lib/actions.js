Actions = function(loader, mazeInfo) {
  this.loader = loader;
  this.map = mazeInfo.map;
  this.canvas = mazeInfo.canvas;
  this.width = mazeInfo.width;
  this.height = mazeInfo.height;
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
    }, 500);
  } else { // character.rotate_mode == "rotation"
    var rotation = {"u":0, "r":90, "d":180, "l":270}[direct];
    if(character.rotation == 0 && rotation == 270) {
      rotation = -90;
    } else if(character.rotation == 270 && rotation == 0) {
      rotation = 360;
    }
    var tween = createjs.Tween.get(character);
    tween.to({rotation: rotation}, 500)
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
    tween.wait(300)
         .to({x:50*x_next + 25, y: 50*y_next + 25}, 700)
         .call(function() {
           character.rotation = (character.rotation + 360) % 360;
           character.px = x_next;
           character.py = y_next;
           callback();
         })
         .addEventListener("change", function() {
           _this.canvas.stage.update();
         });
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
  if( tile == "." || tile == "@" || tile == ")" ) {
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
      y_next = character.px + {'u':-1, 'r':0, 'd':1, 'l':0}[character.direct],
      rotation = character.rotation,
      num;
  if(!character.item) {
    callback("아이템을 가지고 있지 않아요");
    return;
  }
  num = +this.map[y_next][x_next];
  if(!isNaN(num)) {
    for(var i = 0; i < this.canvas.obstacles.length; i++) {
      if( this.canvas.obstacles[i].px == x_next &&
          this.canvas.obstacles[i].py == y_next) {
        var bitmap = this.canvas.obstacles[i];
        debugger
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
      y_next = character.px + {'u':-1, 'r':0, 'd':1, 'l':0}[character.direct],
      rotation = character.rotation,
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
      x_next = character.px,
      y_next = character.py,
      rotation = character.rotation;
  if(type == "if_move_forward") {
    rotation += 0;
  } else if(type == "if_move_left") {
    rotation -= 90;
  } else if(type == "if_move_right") {
    rotation += 90;
  }
  rotation = (rotation + 360) % 360;
  if(rotation == 0) {
    y_next -= 1;
  } else if(rotation == 90) {
    x_next += 1;
  } else if(rotation == 180) {
    y_next += 1;
  } else {
    x_next -= 1;
  }
  var tile = this.map[y_next][x_next],
      move_forward = false;
  if( tile == "." || tile == "@" || tile == ")" || tile == "%" ) {
    move_forward = true;
  }
  var blocks = move_forward ? if_code : else_code;
  var temp = kidscoding.queue.splice(q_idx+1, kidscoding.queue.length);
  eval("with(kidscoding){\n" + blocks + "\n}");
  kidscoding.queue = kidscoding.queue.concat(temp);
  setTimeout(function() {
    callback();
  }, 1);
};

Actions.prototype.repeat = function(count, code, callback) {
  var x_next = character.px,
      y_next = character.py;
  var tile = this.map[y_next][x_next];
  var count = parseInt(count, 10);
  if( tile != "%" && count == "repeat_until" ) {
    var temp = kidscoding.queue.splice(q_idx + 1, kidscoding.queue.length);
    eval("with(kidscoding){\n" + code + "\n}");
    kidscoding.queue.push(_.clone(kidscoding.queue[q_idx]));
    kidscoding.queue = kidscoding.queue.concat(temp);
  } else if(count > 0) {
    var temp = kidscoding.queue.splice(q_idx + 1, kidscoding.queue.length);
    eval("with(kidscoding){\n" + code + "\n}");
    kidscoding.queue.push(_.clone(kidscoding.queue[q_idx]));
    --kidscoding.queue[kidscoding.queue.length -1].count;
    kidscoding.queue = kidscoding.queue.concat(temp);
  }
  setTimeout(function() {
    callback();
  }, 1);
};
