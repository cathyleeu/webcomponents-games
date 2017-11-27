DrawFactory = function() {
};

DrawFactory.prototype.init = function(maze) {
  this.maze = maze;
  this.tile_size = maze.tile_size;
}

DrawFactory.prototype.create = function(item) {
  var shape = new createjs.Shape(),
      g = shape.graphics,
      i;
  g.ss(item.strokeWidth || 8).s(item.strokeColor || "black");
  if(item.type == "edgeline" || item.type == "centerline") {
    var delta = (item.type == "edgeline" ? 0 : this.tile_size / 2);
    g.mt(item.paths[0][0] * this.tile_size + delta, item.paths[0][1] * this.tile_size + delta);
    for(i = 1; i < item.paths.length; i++) {
      g.lt(item.paths[i][0] * this.tile_size + delta, item.paths[i][1] * this.tile_size + delta);
    }
  }
  return shape;
};
