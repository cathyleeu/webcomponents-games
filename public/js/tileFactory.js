TileFactory = function(maze, loader, tile_size) {
  this.tile2role = {
    "u": "character",
    "d": "character",
    "l": "character",
    "r": "character",
    "@": "character",
    "%": "food",
    ")": "item",
    "&": "chest",
    "5": "rock",
    "4": "rock",
    "3": "rock",
    "2": "rock",
    "1": "rock",
    "^": "trap",
    "#": "obstacle",
    "R": "spider",
    "P": "spider",
    "S": "spider",
    ".": "empty"
  };
};

TileFactory.prototype.init = function(maze, loader) {
  var _this = this;
  this.maze = maze;
  this.loader = loader;
  this.tile_size = maze.tile_size || 50;
  this.obstacle_ids = loader.getItems()
      .filter(function(obj) {
        return obj.item.obstacle;
      }).map(function(obj) {
        return obj.item.id;
      });
  this.custom_tiles = {};
  loader.getItems().map(function(obj) {
    if(obj.item.tile) {
      _this.custom_tiles[obj.item.tile] = obj.item;
      obj.item.img = obj.item.id;
    }
  });
  if(maze.tile) {
    maze.tile.forEach(function(item) {
      if(item.letters) {
        item.letters.split("").forEach(function(tile) {
          _this.custom_tiles[tile] = _this.custom_tiles[tile] || {};
          $.extend(_this.custom_tiles[tile], {
            tile: tile,
            obstacle: false
          });
          _this.tile2role[tile] = "letter";
        });
      } else {
        _this.custom_tiles[item.tile] = item;
      }
    });
  }
  this.hashObj = {};
  var hash = location.hash,
      data = hash.slice(hash.indexOf("?")+1).split("&");
  data.forEach(function(item) {
    var tokens = item.split("=");
    _this.hashObj[tokens[0]] = tokens[1];
  });
  if(this.hashObj.character) {
    store.set('character', this.hashObj.character);
  }
};

TileFactory.prototype.create = function(tile, x, y) {
  var _this = this,
      info = {
        tile: tile
      },
      container, bitmap, text, bgLayer;

  // 기본 role 세팅
  if(this.tile2role[tile]) {
    info.role = this.tile2role[tile];
  }

  // custom tile 설정
  if(this.custom_tiles[tile]) {
    if(_this.custom_tiles[tile].id) { // manifest에서의 id는 img로 쓰임
      info.img = _this.custom_tiles[tile].id;
    }
    ["img", "text", "fillColor", "strokeWidth", "strokeColor", "obstacle", "wall"].forEach(function(key) {
      if(_this.custom_tiles[tile].hasOwnProperty(key)) {
        info[key] = _this.custom_tiles[tile][key];
      }
    });
  }

  // maze json에서 extra 정보를 가져온다
  if(this.maze.extra) {
    this.maze.extra.forEach(function(obj) {
      if(obj.x == x && obj.y == y) {
        $.extend(info, obj);
      }
    });
  }

  switch(info.role) {
    case "character":
      var character_id = store.get('character_id') || this.maze.character || "character",
          character = this.loader.getItem(character_id);
      if(character && character.sprite) { // sprite character
        this.defaults(info, {
          img: character_id,
          direct: (tile == "@" ? "u" : tile),
          sprite: true
        });
      } else if(tile == "@") { // undirected character
        this.defaults(info, {
          img: character_id,
          direct: (tile == "@" ? "u" : tile),
          rotate_mode: "rotation"
        });
      } else { // directed character
        // TODO: sprite로 교체 필요
        this.defaults(info, {
          img: character_id + "_" + tile,
          direct: (tile == "@" ? "u" : tile),
          rotate_mode: "image"
        });
      }
      break;
    case "food":
      this.defaults(info, {
        img: "food"
      });
      break;
    case "item":
      this.defaults(info, {
        img: "item"
      });
      break;
    case "chest":
      this.defaults(info, {
        img: "chest"
      });
      break;
    case "rock":
      this.defaults(info, {
        img: "rock" + tile,
        num: +tile
      });
      // TODO: sprite와 itemCount 조합
      info.img1 = this.loader.getResult("rock1");
      info.img2 = this.loader.getResult("rock2");
      info.img3 = this.loader.getResult("rock3");
      info.img4 = this.loader.getResult("rock4");
      info.img5 = this.loader.getResult("rock5");
      break;
    case "trap":
      this.defaults(info, {
        img: "trap"
      });
      break;
    case "obstacle":
      var idx = parseInt(Math.random() * this.obstacle_ids.length, 10);
      this.defaults(info, {
        img: this.obstacle_ids[idx],
        obstacle: true
      });
      break;
    case "spider":
      this.defaults(info, {
        img: "spider"
      });
      break;
  }

  if(info.img) {
    if(info.role == "character" && store.get('character')) {
      // camera 처리
      bitmap = new createjs.Bitmap(decodeURIComponent(store.get('character')));
      delete info.sprite;
    } else if(info.sprite) {
      var animations = {
        stand_u: 0,
        walk_u: [0,1,0,2],
        jump_u: [3,4,5,6,7,6,5,4],
        stand_r: 8,
        walk_r: [8,9],
        jump_r: [11,12,13,14,15,14,13,12],
        stand_d: 16,
        walk_d: [16,17,16,18],
        jump_d: [19,20,21,22,23,22,21,20],
        stand_l: 24,
        walk_l: [24,25],
        jump_l: [27,28,29,30,31,30,29,28]
      };
      if(character.src.indexOf('tadpole') >= 0) {
        animations = {
          stand_u: 0,
          walk_u:[0,1,0,2],
          stand_r: 9,
          walk_r:[9,10,9,11],
          stand_d: 3,
          walk_d:[3,4,3,5],
          stand_l: 6,
          walk_l:[6,7,6,8]
        };
      }
      if(character.src.indexOf('frog') >= 0) {
        animations = {
          stand_u: 0,
          walk_u: [0,1,2,1],
          stand_r: 3,
          walk_r: [3,4,5,4],
          stand_d: 6,
          walk_d: [6,7,8,7],
          stand_l: 9,
          walk_l: [9,10,11,10]
        };
      }
      if(character.src.indexOf('woong') >= 0) {
        animations = {
          stand_u: 12,
          walk_u: [12,13,14,15],
          stand_r: 8,
          walk_r: [8,9,10,11],
          stand_d: 0,
          walk_d: [0,1,2,3],
          stand_l: 4,
          walk_l: [4,5,6,7]
        };
      }
      if(character.src.indexOf('jangoon') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,11],
          stand_r: 3,
          walk_r: [3,4,5],
          stand_d: 0,
          walk_d: [0,1,2],
          stand_l: 6,
          walk_l: [6,7,8]
        };
      }
      if(character.src.indexOf('lana') >= 0) {
        animations = {
          stand_u: 6,
          walk_u: [6,7,6],
          stand_r: 2,
          walk_r: [2,3,2],
          stand_d: 0,
          walk_d: [0,1,0],
          stand_l: 4,
          walk_l: [4,5,4]
        };
      }
      if(character.src.indexOf('tode') >= 0) {
        animations = {
          stand_u: 6,
          walk_u: [6,7,6],
          stand_r: 2,
          walk_r: [2,3,2],
          stand_d: 0,
          walk_d: [0,1,0],
          stand_l: 4,
          walk_l: [4,5,4]
        };
      }
      if(character.src.indexOf('jimi') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,11,9],
          stand_r: 3,
          walk_r: [3,4,5,3],
          stand_d: 0,
          walk_d: [0,1,2,0],
          stand_l: 6,
          walk_l: [6,7,8,6]
        };
      }
      if(character.src.indexOf('bomi') >= 0) {
        animations = {
          stand_u: 12,
          walk_u: [12,13,14,15,12],
          stand_r: 8,
          walk_r: [8,9,10,11,8],
          stand_d: 0,
          walk_d: [0,1,2,3,0],
          stand_l: 4,
          walk_l: [4,5,6,7,4]
        };
      }
      if(character.src.indexOf('jsparrow') >= 0) {
        animations = {
          stand_u: 3,
          walk_u: [3,4,5,3],
          stand_r: 9,
          walk_r: [9,10,11,9],
          stand_d: 0,
          walk_d: [0,1,2,0],
          stand_l: 6,
          walk_l: [6,7,8,6]
        };
      }
      if(character.src.indexOf('cobot') >= 0) {
        animations = {
          stand_u: 3,
          walk_u: [3,4,3,5,3],
          stand_r: 9,
          walk_r: [9,10,9,11,9],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('dingbot') >= 0) {
        animations = {
          stand_u: 3,
          walk_u: [3,4,3,5,3],
          stand_r: 9,
          walk_r: [9,10,9,11,9],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('rudolph') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 6,
          walk_d: [6,7,6,8,6],
          stand_l: 0,
          walk_l: [0,1,0,2,0]
        };
      }
      if(character.src.indexOf('pingping') >= 0) {
        animations = {
          stand_u: 3,
          walk_u: [3,4,3,5,3],
          stand_r: 9,
          walk_r: [9,10,9,11,9],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('cos') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('SpriteMama_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('cos_bear') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('cos_deer') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('cos_grand') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('cos_summer') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('winter_cos') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('SpriteLana_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('SpriteToad1_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('SpriteToad2_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('SpriteToad3_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('SpriteToad4_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,11,9],
          stand_r: 3,
          walk_r: [3,4,5,3],
          stand_d: 0,
          walk_d: [0,1,2,0],
          stand_l: 6,
          walk_l: [6,7,8,6]
        };
      }
      if(character.src.indexOf('SpriteBomi_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,11,9],
          stand_r: 3,
          walk_r: [3,4,5,3],
          stand_d: 0,
          walk_d: [0,1,2,0],
          stand_l: 6,
          walk_l: [6,7,8,6]
        };
      }
      if(character.src.indexOf('todepolefrog') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,11,9],
          stand_r: 3,
          walk_r: [3,4,5,3],
          stand_d: 0,
          walk_d: [0,1,2,0],
          stand_l: 6,
          walk_l: [6,7,8,6]
        };
      }
      if(character.src.indexOf('new_cobot') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('SpriteJack_256') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('geny') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('tootoo') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('cos_fall_sprite') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('cos_bot') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('tori') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('mos') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('waterboy') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('icebear') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('penguin') >= 0) {
        animations = {
          stand_u: 3,
          walk_u: [3,4,3,5,3],
          stand_r: 9,
          walk_r: [9,10,9,11,9],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('rudolph_deer') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('santa_cos') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      if(character.src.indexOf('robot') >= 0) {
        animations = {
          stand_u: 9,
          walk_u: [9,10,9,11,9],
          stand_r: 3,
          walk_r: [3,4,3,5,3],
          stand_d: 0,
          walk_d: [0,1,0,2,0],
          stand_l: 6,
          walk_l: [6,7,6,8,6]
        };
      }
      for(var key in animations) {
        if($.isArray(animations[key])) {
          animations[key] = {
            frames: animations[key],
            speed: animations[key].length / 16.6
          };
        }
      }
      bitmap = new createjs.Sprite(
        new createjs.SpriteSheet({
          images: [this.loader.getResult(character_id)],
          frames: {width: character.size, height: character.size},
          animations: animations
        }),
        "stand_" + (tile == "@" ? "d" : tile)
      );
    } else {
      bitmap = new createjs.Bitmap(this.loader.getResult(info.img));
    }
    this.setScale(bitmap);
  }
  if(info.role == "letter") {
    text = new createjs.Text(info.tile, "bold " + this.tile_size + "px DSEG7Classic", "#000");
    this.setTextAlign(text);
  }
  if(info.text) {
    text = new createjs.Text(info.text, "10px", "#000");
    this.setTextAlign(text);
  }
  if(info.fillColor || info.strokeWidth || info.strokeColor) {
    bgLayer = new createjs.Shape();
    // drawRect(x, y, w, h)
    bgLayer.graphics
        .beginFill(info.fillColor || "transparent")
        .setStrokeStyle(info.strokeWidth || 0)
        .beginStroke(info.strokeColor || "transparent")
        .drawRect(-this.tile_size/2, -this.tile_size/2, this.tile_size, this.tile_size);
  }
  if(bitmap || text || bgLayer) {
    container = new createjs.Container();
    if(bgLayer) {
      container.addChild(bgLayer);
      container.bgLayer = bgLayer;
    }
    if(bitmap) {
      container.addChild(bitmap);
      container.bitmap = bitmap;
    }
    if(text) {
      container.addChild(text);
      container.text = text;
    }
    if(info.role == "spider") {
      var hand_name = {
        "R": "rock",
        "P": "paper",
        "S": "scissors"
      }[info.tile];
      var hand = new createjs.Bitmap(this.loader.getResult("hand_" + hand_name));
      var bounds = hand.getBounds();
      var size = this.tile_size / 2;
      hand.scaleX = size / bounds.width;
      hand.scaleY = size / bounds.height;
      hand.x = 0;
      hand.y = -size;
      container.hand = hand_name;
      container.addChild(hand);
    }
    if(info.itemCount) {
      this.setItemCount(container, info.itemCount);
    }
    $.extend(container, info);
    this.setCoord(container, x, y);
  }
  return container;
};

TileFactory.prototype.defaults = function(target, source) {
  for(var key in source) {
    if(source.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
};

TileFactory.prototype.getItemCount = function(container) {
  if(container.itemCountBitmap) {
    return +container.itemCountBitmap.textBitmap.text;
  } else if(container.itemList) {
    return container.itemList.length;
  }
  return 0;
};

TileFactory.prototype.setItemCount = function(container, count) {
  if(!container.itemCountBitmap) {
    var itemCountBitmap = new createjs.Container();
    var circle = new createjs.Shape();
    var size = this.tile_size / 5;
    circle.graphics.beginStroke("#000").beginFill("#FFF").drawCircle(0, 0, size);
    circle.x = -this.tile_size/2 + size;
    circle.y = this.tile_size/2 - size;
    itemCountBitmap.addChild(circle);

    var text = new createjs.Text(count, (2*size) + "px monospace", "#000");
    text.x = circle.x - size / 1.8;
    text.y = circle.y - size / 0.8;
    itemCountBitmap.addChild(text);
    itemCountBitmap.textBitmap = text;
    container.itemCountBitmap = itemCountBitmap;
    container.addChild(itemCountBitmap);
  } else {
    container.itemCountBitmap.textBitmap.text = count;
  }
  container.itemCountBitmap.visible = !!count;
};

TileFactory.prototype.addItemImage = function(container, img, type) {
  if(!container.itemList) {
    container.itemList = [];
  }
  var bounds = container.getBounds();
  var bitmap = new createjs.Bitmap();
  if(type == "one"){
    var px = 2;
    var py = 0;
    var size = bounds.width / 3;
    bitmap.image = this.loader.getResult(img);
    bitmap.x = px * size;
    bitmap.y = py * size;
    bitmap.scaleX = 1.0/3.0;
    bitmap.scaleY = 1.0/3.0;
  }  else{
    var px = container.itemList.length % 3;
    var py = parseInt(container.itemList.length / 3, 10);
    var size = bounds.width / 3;
    bitmap.image = this.loader.getResult(img);
    bitmap.x = px * size;
    bitmap.y = py * size;
    bitmap.scaleX = 1.0/3.0;
    bitmap.scaleY = 1.0/3.0;
  }

  container.addChild(bitmap);
  container.itemList.push(bitmap);
};

TileFactory.prototype.setScale = function(obj) {
  var bounds = obj.getBounds();
  obj.scaleX = this.tile_size / bounds.width;
  obj.scaleY = this.tile_size / bounds.height;
  obj.regX = bounds.width / 2;
  obj.regY = bounds.height / 2;
}

TileFactory.prototype.setCoord = function(obj, px, py) {
  obj.px = px;
  obj.py = py;
  obj.x = this.tile_size * px + this.tile_size / 2;
  obj.y = this.tile_size * py + this.tile_size / 2;
}

TileFactory.prototype.setTextAlign = function(text) {
  var bounds = text.getBounds(),
      size = this.tile_size * 0.8;
  text.textAlign = "center";
  if(bounds.width > bounds.height) {
    text.scaleX = size / bounds.width;
    text.scaleY = text.scaleX;
  } else {
    text.scaleY = size / bounds.height;
    text.scaleX = text.scaleY;
  }
  text.regX = 0;
  text.regY = bounds.height / 2;
}
