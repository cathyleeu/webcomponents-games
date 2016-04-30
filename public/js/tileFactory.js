TileFactory = function(maze, loader, tile_size) {
  var _this = this;
  this.maze = maze;
  this.tile_size = tile_size;
  this.loader = loader;
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
    }
  });
  this.tile2role = {
    "u": "character",
    "d": "character",
    "l": "character",
    "r": "character",
    "@": "character",
    "%": "food",
    ")": "item",
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

TileFactory.prototype.create = function(tile, x, y) {
  var info = {
        tile: tile
      },
      container,
      bitmap;

  // 기본 role 세팅
  if(this.tile2role[tile]) {
    info.role = this.tile2role[tile];
  }

  // manifest에서 img, obstacle 정보를 가져온다
  if(this.custom_tiles[tile]) {
    info.img = this.custom_tiles[tile].id;
    if(this.custom_tiles[tile].hasOwnProperty("obstacle")) {
      info.obstacle = this.custom_tiles[tile].obstacle;
    }
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
      var character_id = this.maze.character || "character",
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
    if(info.sprite) {
      var animations = {
        stand_u: 0,
        walk_u: {
          frames: [0,1,0,2],
          speed: 0.25
        },
        jump_u: {
          frames: [3,4,5,6,7,6,5,4,3],
          speed: 0.5
        },
        stand_r: 8,
        walk_r: {
          frames: [8,9],
          speed: 0.125
        },
        jump_r: {
          frames: [11,12,13,14,15,14,13,12,11],
          speed: 0.5
        },
        stand_d: 16,
        walk_d: {
          frames: [16,17,16,18],
          speed: 0.25
        },
        jump_d: {
          frames: [19,20,21,22,23,22,21,20,19],
          speed: 0.5
        },
        stand_l: 24,
        walk_l: {
          frames: [24,25],
          speed: 0.125
        },
        jump_l: {
          frames: [27,28,29,30,31,30,29,28,27],
          speed: 0.5
        }
      };
      if(character.src.indexOf('tadpole') >= 0) {
        animations = {
          stand_u: 0,
          walk_u: {
            frames: [0,1,0,2],
            speed: 0.25
          },
          stand_r: 9,
          walk_r: {
            frames: [9,10,9,11],
            speed: 0.25
          },
          stand_d: 3,
          walk_d: {
            frames: [3,4,3,5],
            speed: 0.25
          },
          stand_l: 6,
          walk_l: {
            frames: [6,7,6,8],
            speed: 0.25
          }
        };
      }
      if(character.src.indexOf('frog') >= 0) {
        animations = {
          stand_u: 0,
          walk_u: {
            frames: [0,1,2,1,0],
            speed: 0.5
          },
          stand_r: 3,
          walk_r: {
            frames: [3,4,5,4,3],
            speed: 0.5
          },
          stand_d: 6,
          walk_d: {
            frames: [6,7,8,7,6],
            speed: 0.5
          },
          stand_l: 9,
          walk_l: {
            frames: [9,10,11,10,9],
            speed: 0.5
          }
        };
      }
      if(character.src.indexOf('woong') >= 0) {
        animations = {
          stand_u: 4,
          walk_u: {
            frames: [4,5,6,7,4],
            speed: 0.5
          },
          stand_r: 8,
          walk_r: {
            frames: [8,9,10,11,8],
            speed: 0.5
          },
          stand_d: 0,
          walk_d: {
            frames: [0,1,2,3,0],
            speed: 0.5
          },
          stand_l: 12,
          walk_l: {
            frames: [12,13,14,15,12],
            speed: 0.5
          }
        };
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
  }
  if(bitmap) {
    container = new createjs.Container();
    container.addChild(bitmap);
    container.bitmap = bitmap;
    $.extend(container, info);

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
      hand.x = this.tile_size - size;
      container.hand = hand_name;
      container.addChild(hand);
    }
    if(info.itemCount) {
      this.setItemCount(container, info.itemCount);
    }

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
  return container.itemCountBitmap ? +container.itemCountBitmap.textBitmap.text : 0;
};

TileFactory.prototype.setItemCount = function(container, count) {
  if(!container.itemCountBitmap) {
    var bounds = container.getBounds();
    var itemCountBitmap = new createjs.Container();
    var circle = new createjs.Shape();
    var size = bounds.width / 5;
    circle.graphics.beginStroke("#000").beginFill("#FFF").drawCircle(0, 0, size);
    circle.x = size;
    circle.y = bounds.width - size;
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

TileFactory.prototype.setCoord = function(obj, px, py) {
  var bounds = obj.getBounds();
  obj.px = px;
  obj.py = py;
  obj.x = this.tile_size * px + this.tile_size / 2;
  obj.y = this.tile_size * py + this.tile_size / 2;
  obj.scaleX = this.tile_size / bounds.width;
  obj.scaleY = this.tile_size / bounds.height;
  obj.regX = bounds.width / 2;
  obj.regY = bounds.height / 2;
}
