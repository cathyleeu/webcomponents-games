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
        if(tile == "@") { // undirected character
          bitmap.image = this.loader.getResult("character");
          bitmap.direct = bitmap.initDirect = "u";
          bitmap.rotate_mode = "rotation";
        } else { // directed character
          bitmap.image = this.loader.getResult("character_" + tile);
          bitmap.direct = bitmap.initDirect = tile;
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
    this.setBitmapCoord(bitmap, x, y);
    if(this.maze.extra) {
      this.maze.extra.forEach(function(obj) {
        if(bitmap.px == x && bitmap.py == y) {
          var temp = $.extend({}, obj);
          delete temp.x;
          delete temp.y;
          $.extend(bitmap, temp);
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
