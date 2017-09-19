devtool = function(kidscoding) {
  this.kidscoding = kidscoding;
  this.actions = kidscoding.Actions;
  this.tileFactory = kidscoding.tileFactory;
};

devtool.prototype._downloadImage = function(image, fileName) {
  var link = document.createElement("a");
  link.href = image;
  link.download = fileName;
  link.click();
  link = null
}
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


// ================ Map ================

devtool.prototype.resetMap = function() {
  var map = this.tileFactory.maze.map.map(function(row) {
        return row.split("");
      });
  this.kidscoding.mazeInfo.map = this.actions.map = map;
  $("#modal .reset-maze").click();
}


devtool.prototype.setMap = function() {
  var maze = window.prompt("please input maze string").trim(),
      map = maze.split("\n").map(function(row) {
        return row.split("");
      });
  this.kidscoding.mazeInfo.map = this.actions.map = map;
  $("#modal .reset-maze").click();
}

devtool.prototype.printMap = function() {
  console.log(this.actions.map.map(function(row) {
    return row.join("");
  }).join("\n"));
}

devtool.prototype.downloadMap = function () {
  var defaultName = location.hash.slice(2).replace(/\//g, "_") + "_map",
      fileName = window.prompt("please input file name", defaultName ).trim(),
      canvas = this.actions.canvas,
      image = canvas.stage.toDataURL().replace("image/png", "image/octet-stream");
  this._downloadImage(image, fileName + "_map.png");
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

devtool.prototype.downloadToolbox = function() {
  return this._downloadBlocks("toolbox");
}

devtool.prototype.downloadWorkspace = function() {
  return this._downloadBlocks("workspace");
}

devtool.prototype._downloadBlocks = function(target) {
  var _this = this,
      defaultName = location.hash.slice(2).replace(/\//g, "_") + "_" + target,
      fileName = window.prompt("please input file name", defaultName ).trim(),
      image = new Image(),
      serializer = new XMLSerializer(),
      $svg = $($("svg.blocklySvg").get(0).cloneNode(true)),
      bbox = ( target == "toolbox" ?
          $("svg.blocklySvg .blocklyFlyout .blocklyWorkspace") :
          $("svg.blocklySvg>.blocklyWorkspace>.blocklyBlockCanvas") ).get(0).getBBox(),
      onloadCount = 0,
      blocklyText = getStyle(".blocklyText");
  function getBase64Image(img) {
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1,
        ratio = devicePixelRatio / backingStoreRatio,
        width = img.naturalWidth,
        height = img.naturalHeight,
        result;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(ratio, ratio);
    ctx.drawImage(img,0,0,width,height);
    result = canvas.toDataURL("image/png");
    canvas = ctx = null;
    return result;
  }
  function getStyle(className_) {
    var styleSheets = window.document.styleSheets;
    var styleSheetsLength = styleSheets.length;
    for(var i = 0; i < styleSheetsLength; i++){
      var classes = styleSheets[i].rules || styleSheets[i].cssRules;
      if (!classes) {
        continue;
      }
      var classesLength = classes.length;
      for (var x = 0; x < classesLength; x++) {
        if (classes[x].selectorText == className_) {
          var ret,
              match;
          if(classes[x].cssText){
            ret = classes[x].cssText;
          } else {
            ret = classes[x].style.cssText;
          }
          if(ret.indexOf(classes[x].selectorText) == -1){
            ret = classes[x].selectorText + "{" + ret + "}";
          }
          match = ret.match(/[^{]*{([^}]*)}/);
          return match[1];
        }
      }
    }
  }
  $svg.find(".blocklyText").each(function(idx, el) {
    el.style.cssText = blocklyText;
  });
  $svg.find(".blocklyTrash,.blocklyZoom").remove();
  if(target == "toolbox") {
    $svg.children("g").children().not(".blocklyFlyout").remove();
    $svg.find(".blocklyFlyoutBackground").css("fill", "transparent");
    $svg.find(".blocklyFlyout .blocklyWorkspace").attr("transform", "translate(-" + bbox.x + ",-" + bbox.y + ")");
  } else if(target == "workspace") {
    $svg.children("g").children().not(".blocklyBlockCanvas").remove();
    $svg.find(".blocklyBlockCanvas").removeAttr("transform");
    $svg.find(".blocklyBlockCanvas>g").attr("transform", "translate(0,20)");
  }
  $svg.attr("width", bbox.width + "px");
  $svg.attr("height", bbox.height + "px");
  $svg.find("image").each(function(idx, el) {
    var href = el.getAttribute("xlink:href"),
        img;
    if(href) {
      onloadCount++;
      img = new Image();
      img.src = href;
      img.onload = function() {
        onloadCount--;
        el.setAttribute("xlink:href", getBase64Image(img))
        img = img.onload = null;
        if(onloadCount == 0) {
          image.onload = function() {
            _this._downloadImage(getBase64Image(image), fileName + ".png");
            image = image.onload = $svg = serializer = link = null;
          }
          image.src = "data:image/svg+xml;utf8," + serializer.serializeToString($svg.get(0));
        }
      };
    }
  });
}

// ========================================
