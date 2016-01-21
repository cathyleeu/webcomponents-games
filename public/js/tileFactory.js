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
  var bitmap = new createjs.Bitmap(),
      role = this.tile2role[tile] || null;
  if(this.custom_tiles[tile]) {
    bitmap.image = this.loader.getResult(this.custom_tiles[tile].id);
    bitmap.obstacle = !!this.custom_tiles[tile].obstacle;
    bitmap.role = this.custom_tiles[tile].role || (bitmap.obstacle ? "obstacle" : null);
  } else {
    bitmap.role = role;
    switch(role) {
      case "character":
        var character_id = this.maze.character || "character",
            character = this.loader.getItem(character_id);
        if(character && character.sprite) {
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
          var data = {
            images: [this.loader.getResult(character_id)],
            frames: {width: character.size, height: character.size},
            animations: animations
          };
          bitmap = new createjs.Sprite(
            new createjs.SpriteSheet(data),
            "stand_" + (tile == "@" ? "d" : tile)
          );
          bitmap.direct = (tile == "@" ? "u" : tile);
          bitmap.sprite = true;
          bitmap.role = "character";
        } else if(tile == "@") { // undirected character
          bitmap.image = this.loader.getResult(character_id);
          bitmap.direct = (tile == "@" ? "u" : tile);
          bitmap.rotate_mode = "rotation";
        } else { // directed character
          bitmap.image = this.loader.getResult(character_id + "_" + tile);
          bitmap.direct = (tile == "@" ? "u" : tile);
          bitmap.rotate_mode = "image";
        }
        break;
      case "food":
        bitmap.image = this.loader.getResult("food");
        break;
      case "item":
        bitmap.image = this.loader.getResult("item");
        break;
      case "rock":
        bitmap.image = this.loader.getResult("rock" + tile);
        bitmap.num = +tile;
        bitmap.img1 = this.loader.getResult("rock1");
        bitmap.img2 = this.loader.getResult("rock2");
        bitmap.img3 = this.loader.getResult("rock3");
        bitmap.img4 = this.loader.getResult("rock4");
        bitmap.img5 = this.loader.getResult("rock5");
        bitmap.obstacle = true;
        break;
      case "trap":
        bitmap.image = this.loader.getResult("trap");
        bitmap.obstacle = true;
        break;
      case "obstacle":
        var idx = parseInt(Math.random() * this.obstacle_ids.length, 10);
        bitmap.image = this.loader.getResult(this.obstacle_ids[idx]);
        bitmap.obstacle = true;
        break;
      case "spider":
        bitmap = new createjs.Container();
        var spider = new createjs.Bitmap(this.loader.getResult("spider"));
        var hand_name = {
          "R": "rock",
          "P": "paper",
          "S": "scissors"
        }[tile];
        var hand = new createjs.Bitmap(this.loader.getResult("hand_" + hand_name));
        var bounds = hand.getBounds();
        var size = this.tile_size / 2;
        hand.scaleX = size / bounds.width;
        hand.scaleY = size / bounds.height;
        hand.x = this.tile_size - size;
        bitmap.hand = hand_name;
        bitmap.addChild(spider, hand);
        bitmap.role = role;
        bitmap.obstacle = true;
        break;
      default:
        bitmap = null;
    }
  }
  if(bitmap) {
    var _this = this;
    this.setBitmapCoord(bitmap, x, y);
    if(this.maze.extra) {
      this.maze.extra.forEach(function(obj) {
        if(obj.x == x && obj.y == y) {
          var temp = $.extend({}, obj),
              src = temp.src;
          delete temp.x;
          delete temp.y;
          delete temp.src;
          $.extend(bitmap, temp);
          if(src) {
            bitmap.image = document.createElement("img");
            bitmap.image.onload = function() {
              _this.setBitmapCoord(bitmap, x, y);
            };
            bitmap.image.src = src;
          }
        }
      });
    }
  }
  return bitmap;
};

TileFactory.prototype.setBitmapCoord = function(bitmap, px, py) {
  var bounds = bitmap.getBounds();
  bitmap.px = px;
  bitmap.py = py;
  bitmap.x = this.tile_size * px + this.tile_size / 2;
  bitmap.y = this.tile_size * py + this.tile_size / 2;
  bitmap.scaleX = this.tile_size / bounds.width;
  bitmap.scaleY = this.tile_size / bounds.height;
  bitmap.regX = bounds.width / 2;
  bitmap.regY = bounds.height / 2;
}
