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
    character.gotoAndStop("stand_" + direct);
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
  if(character.px == x_next && character.py != y_next) {
    direct = character.py > y_next ? "u" : "d";
  } else if (character.px != x_next && character.py == y_next) {
    direct = character.px > x_next ? "l" : "r";
  }
  this._rotateCharacter(direct, function() {
    if(character.sprite) {
      character.gotoAndPlay( (jump ? "jump_" : "walk_") + direct);
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
           callback();
         })
         .addEventListener("change", function(e) {
           _this.canvas.stage.update();
         });
    _this._setFocus(x_next, y_next, character.sprite ? 0 : 100, 500);
  });
};

Actions.prototype._splitObjects = function(spider, callback) {
  var _this = this,
      character = this.canvas.character,
      px = character.px,
      py = character.py;
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
  var _this = this,
      character = this.canvas.character,
      px = character.px,
      py = character.py;
  createjs.Tween.get(character)
      .wait(character.sprite ? 0 : 100)
      .to({
        x: _this.tile_size*px + _this.tile_size/2,
        y: _this.tile_size*py + _this.tile_size/2
      }, 500)
      .call(callback)
      .addEventListener("change", function(e) {
        _this.canvas.stage.update();
      });
};

Actions.prototype._setFocus = function(center_x, center_y, wait, time, callback) {
  if(this.view_size != null) {
    var _this = this;
    wait = wait || 0;
    time = time || 0;
    var stage_tween = createjs.Tween.get(this.canvas.stage),
        half = parseInt(this.view_size / 2 - 0.5, 10),
        stage_x = 0,
        stage_y = 0;
    if(this.width > this.view_size) {
      if(center_x < half) {
        center_x = half;
      }
      if(center_x > this.width - half - 2) {
        center_x = this.width - half - 2;
      }
      stage_x = -(center_x - half) * this.tile_size;
    }
    if(this.height > this.view_size) {
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
        spider: "거미줄에 걸렸어요",
        trap: "덫에 걸렸어요"
      }[obj.role];
      callback(message);
    });
    return;
  }

  obj = this._getCanvasObject(x_next, y_next);

  var localData = store.get('data') || {};
  var path = location.pathname.split("/");
  path = path.length == 3 ? path.concat(["index"]) : path;
  path = path.slice(1, -1).join("/");
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
  var character = this.canvas.character,
      item = this._getCanvasObject(character.px, character.py, "item");
  if( character.item ) {
    // 이미 아이템을 가지고 있는 경우
    callback("이미 아이템을 가지고 있어요");
  } else if( !item ) {
    // 아이템을 가져올 수 없다면
    callback("아이템을 가져올 수 없어요");
  } else {
    character.item = item;
    item.visible = false;
    this.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      callback();
    }, 500);
  }
};

Actions.prototype.useItem = function(block, callback) {
  var character = this.canvas.character,
      item = character.item;
  if(!item) {
    callback("아이템을 가지고 있지 않아요");
    return;
  }

  // 목표 위에서 아이템 사용(패턴 매칭)
  var food = this._getCanvasObject(character.px, character.py, "food");
  if(food && food.useItme) {
    food.visible = false;
    item.visible = true;
    item.px = food.px;
    item.py = food.py;
    item.x = food.x;
    item.y = food.y;
    this.canvas.stage.update();
    setTimeout(function() {
      callback();
    }, 1000);
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
      }, 500);
    } else {
      block.addSelect();
      _this.setTimeoutKey = setTimeout(callback, 500);
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
