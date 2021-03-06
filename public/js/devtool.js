devtool = function(kidscoding) {
  this.kidscoding = kidscoding;
  this.actions = kidscoding.Actions;
  this.tileFactory = kidscoding.tileFactory;
  this.setting = {
    download: "download"
  };
  this.data = {};
};
devtool._drawFinished = false;
devtool.actions = [];
devtool.runAction = function(action) {
  if(this._drawFinished) {
    action();
  } else {
    devtool.actions.push(action);
  }
}
devtool.drawFinished = function() {
  this._drawFinished = true;
  if(devtool.actions) {
    devtool.actions.forEach(function(action) {
      action();
    });
    devtool.actions = null;
  }
}

devtool.prototype._downloadImage = function(image, fileName) {
  var link = document.createElement("a");
  link.href = image;
  link.download = fileName;
  link.click();
  link = null
}
devtool.prototype._getBase64Image = function(img) {
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
devtool.prototype._getStyle = function(className_) {
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

devtool.prototype.getInstructions = function(name) {
  var lang = store.session.get("lang", "ko"),
      tutorial = $$$.kidscoding.tileFactory.maze.tutorial,
      img = $$$.kidscoding.Actions.loader.getResult("message"),
      data;
  data = {
    image: this._getBase64Image(img),
    instructions: [tutorial[0]["msg:"+lang]]
  };
  name = name || location.hash.slice(2).replace(/\//g, "_") + "_instruction";
  if($$$.setting.download == "base64") {
    $$$.data[name] = data;
    console.log("devtool_output:" + name);
    return;
  }
  console.log(JSON.stringify(data));
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

devtool.prototype.downloadMap = function(fileName) {
  var canvas = this.actions.canvas,
      data = canvas.stage.toDataURL(),
      defaultName = location.hash.slice(2).replace(/\//g, "_") + "_map";
  if($$$.setting.download == "base64") {
    $$$.data[fileName + ".png"] = data;
    console.log("devtool_output:" + fileName + ".png");
    return;
  }
  if(!fileName) {
    fileName = window.prompt("please input file name", defaultName ).trim();
  }
  this._downloadImage(data.replace("image/png", "image/octet-stream"), fileName + "_map.png");
}

// ========================================




// ================ Blockly ================

devtool.prototype.updateToolbox = function(toolbox) {
  var xml = $('<xml>' + this.kidscoding.createXml(toolbox, {isToolbox:true}) + '</xml>').get(0);
  this.kidscoding.workspace.updateToolbox(xml);
}

devtool.prototype.updateWorkspace = function(workspace) {
  if(workspace == "solution") {
    workspace = $$$.tileFactory.maze.solution;
  } else if(workspace == "problem") {
    workspace = $$$.tileFactory.maze.problem;
  } else if(workspace == "default") {
    workspace = $$$.tileFactory.maze.workspace || "start";
  }
  if(!workspace) {
    return;
  }
  this.kidscoding.workspace.clear();
  var xml = $('<xml>' + this.kidscoding.createXml(workspace, {}) + '</xml>').get(0);
  Blockly.Xml.domToWorkspace(xml, this.kidscoding.workspace);
  var blocks = this.kidscoding.workspace.getAllBlocks(),
      block = blocks.filter(function(block) {
        return block.type === "start";
      })[0];
  while(block) {
    if(block.type == "empty") {
      $(block.svgPath_).addClass("empty");
    }
    block = block.getNextBlock();
  }
}

devtool.prototype.downloadToolbox = function(fileName) {
  return this._downloadBlocks("toolbox", fileName);
}

devtool.prototype.downloadWorkspace = function(fileName, state) {
  return this._downloadBlocks("workspace", fileName, state);
}

devtool.prototype._downloadBlocks = function(target, fileName, state) {
  var _this = this,
      defaultName = location.hash.slice(2).replace(/\//g, "_") + "_" + target + (state ? "_" + state : ""),
      image = new Image(),
      serializer = new XMLSerializer(),
      onloadCount = 0,
      cssBlocklyText = this._getStyle(".blocklyText"),
      cssEmpty = this._getStyle("#maze-container .workspace .blocklyPath.empty"),
      $svg, bbox;
  if(!fileName) {
    fileName = window.prompt("please input file name", defaultName ).trim();
  }
  if(target == "workspace" && state) {
    this.updateWorkspace(state);
  }

  $svg = $($("svg.blocklySvg").get(0).cloneNode(true));
  $svg.find(".blocklyTrash,.blocklyZoom,.blocklyBubbleCanvas,.blocklyScrollbarVertical").remove();

  bbox = ( target == "toolbox" ?
      $("svg.blocklySvg .blocklyFlyout .blocklyWorkspace") :
      $("svg.blocklySvg>.blocklyWorkspace>.blocklyBlockCanvas") ).get(0).getBBox(),
  $svg.find(".blocklyText").each(function(idx, el) {
    el.style.cssText = cssBlocklyText;
  });
  $svg.find(".blocklyPath.empty").each(function(idx, el) {
    el.style.cssText = cssEmpty;
  });
  $svg.find("[data-argument-type=text]>.blocklyEditableText>.blocklyText").each(function(idx, el) {
    el.style.cssText = "font-family: monospace;";
  });
  $svg.find(".blocklyPath.empty~.blocklyText").each(function(idx, el) {
    el.style.cssText = "fill: black; text-decoration: font-family: monospace;";
  });
  if(target == "toolbox") {
    $svg.children("g").children().not(".blocklyFlyout").remove();
    $svg.find(".blocklyFlyoutBackground").remove();
    $svg.find(".blocklyFlyout .blocklyWorkspace").attr({
      "transform": "translate(-" + bbox.x + ",-" + bbox.y + ")",
      "clip-path": ""
    });
    var top = 0,
        left = 0,
        maxWidth = 0,
        maxHeight = 0;
    $svg.find(".blocklyDraggable").map(function(idx, el) {
      var coord = el.getAttribute("transform").match(/(\d*),(\d*)/);
      if(idx % 3 == 0) {
        top = Number(coord[2]);
        left = 12 + idx / 3 * 220;
      }
      el.setAttribute("transform", "translate(" + left + "," + (Number(coord[2]) - top + 12) + ")");
      if(maxWidth < left + 220) {
        maxWidth = left + 220;
      }
      if(maxHeight < Number(coord[2]) - top + 12 + 60) {
        maxHeight = Number(coord[2]) - top + 12 + 60;
      }
    });
    bbox = {
      width: maxWidth,
      height: maxHeight
    };
  } else if(target == "workspace") {
    $svg.children("g").children().not(".blocklyBlockCanvas").remove();
    $svg.find(".blocklyBlockCanvas").removeAttr("transform");
    var block = $svg.find(".blocklyBlockCanvas>g"),
        hasHat = block.attr("data-shapes") === "hat";
    block.attr("transform", hasHat ? "translate(0,16)" : "translate(0,0)");
  }
  $svg.attr("width", bbox.width + "px");
  $svg.attr("height", bbox.height + "px");
  $svg.attr("style", "width:" + bbox.width + 'px;height:' + bbox.height + 'px;');
  $svg.find("image").each(function(idx, el) {
    var href = el.getAttribute("xlink:href"),
        img;
    if(href) {
      onloadCount++;
      img = new Image();
      img.src = href;
      img.onload = function() {
        onloadCount--;
        el.setAttribute("xlink:href", _this._getBase64Image(img))
        img = img.onload = null;
        if(onloadCount == 0) {
          if($$$.setting.download == "base64") {
            $$$.data[fileName + ".png"] = serializer.serializeToString($svg.get(0));
            console.log("devtool_output:" + fileName + ".png");
          } else {
            image.onload = function() {
              _this._downloadImage(_this._getBase64Image(image), fileName + ".png");
              image = image.onload = $svg = serializer = link = null;
            }
            image.src = "data:image/svg+xml;utf8," + serializer.serializeToString($svg.get(0));
          }
        }
      };
    }
  });
}

// ========================================
