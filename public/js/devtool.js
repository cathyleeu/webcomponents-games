devtool = function(kidscoding) {
  this.kidscoding = kidscoding;
  this.actions = kidscoding.Actions;
  this.tileFactory = kidscoding.tileFactory;
};
devtool.prototype.goNext = function() {
  $("#modal .go-next").click();
};
devtool.prototype.rotate = function(direct) {
  var character = this.actions.canvas.character;
  this.actions._rotateCharacter(direct, function() {});
  this.actions.map[character.py][character.px] = direct;
}

// ================ Tile ================

devtool.prototype.moveTile = function(x1, y1, x2, y2) {
  var character = this.actions.canvas.character,
      obj = (character.px == x1 && character.py == y1) ? character : this.actions._getCanvasObject(x1, y1),
      tile = this.actions.map[obj.py][obj.px];
  this.actions.map[obj.py][obj.px] = ".";
  this.actions.map[y2][x2] = obj.direct || tile;
  this.actions.setCoord(obj, x2, y2)
  this.actions.canvas.stage.update();
}

devtool.prototype.addTile = function(tile, x, y) {
  var bitmap = this.tileFactory.create(tile, x, y),
      canvas = this.actions.canvas;
  if(bitmap) {
    if(bitmap.role == "character") {
      canvas.character = bitmap;
    } else if(bitmap.role == "food") {
      canvas.foods.push(bitmap);
    } else if(bitmap.role == "item") {
      canvas.items.push(bitmap);
    } else if(bitmap.obstacle) {
      canvas.obstacles.push(bitmap);
    } else {
      canvas.others.push(bitmap);
    }
    canvas.stage.addChild(bitmap);
    this.actions.map[y][x] = bitmap.direct || tile;
  }
  canvas.stage.update();
}

devtool.prototype.removeTile = function(x, y) {
  var character = this.actions.canvas.character,
      obj = (character.px == x && character.py == y) ? character : this.actions._getCanvasObject(x, y),
      tile = this.actions.map[obj.py][obj.px];
  obj.visible = false;
  this.actions.map[obj.py][obj.px] = ".";
  this.actions.canvas.stage.update();
}

// ========================================


// ================ Maze ================

devtool.prototype.resetMaze = function() {
  var map = this.tileFactory.maze.map.map(function(row) {
        return [].slice.call(new String(row));
      });
  this.kidscoding.mazeInfo.map = this.actions.map = map;
  $("#modal .reset-maze").click();
}


devtool.prototype.setMaze = function() {
  var maze = window.prompt("please input maze string").trim(),
      map = maze.split("\n").map(function(row) {
        return [].slice.call(new String(row));
      });
  this.kidscoding.mazeInfo.map = this.actions.map = map;
  $("#modal .reset-maze").click();
}

devtool.prototype.printMaze = function() {
  console.log(this.actions.map.map(function(row) {
    return row.join("");
  }).join("\n"));
}

// ========================================




// ================ Blockly ================

devtool.prototype.updateToolbox = function(toolbox) {
  var xml = $('<xml>' + this.kidscoding.createXml(toolbox, {isToolbox:true}) + '</xml>').get(0);
  this.kidscoding.workspace.updateToolbox(xml);
}

devtool.prototype.updateWorkspace = function(workspace) {
  this.kidscoding.workspace.clear();
  var xml = $('<xml>' + this.kidscoding.createXml(workspace, {}) + '</xml>').get(0);
  Blockly.Xml.domToWorkspace(xml, this.kidscoding.workspace);
}

// ========================================
