Router.route('/maze', function () {
  this.redirect('/maze/1');
});

Router.route('/maze/:step', function() {
  var loader = new createjs.LoadQueue();
  var d1 = $.Deferred();
  var d2 = $.Deferred();
  createjs.Sound.alternateExtensions = ["mp3"];
  loader.installPlugin(createjs.Sound);
  loader.loadManifest({
    id: "maze",
    src: "/maps/maze" + this.params.step + ".json",
    type: "manifest"
  });
  loader.on("complete", function() {
    var bgm = loader.getItem("bgm");
    if(bgm) {
      createjs.Sound.registerSound({
        id: "bgm",
        src: bgm.src
      });
      createjs.Sound.addEventListener("fileload", function(e) {
        createjs.Sound.play("bgm");
      });
    }
    d1.resolve();
  });
  Template.Maze.rendered = function() {
    d2.resolve();
  };
  $.when( this.params.step, loader, d1, d2 ).done(init);
  this.render("Maze");
});

var queue = [];

function init(step, loader) {
  initBlockly();
  var mazeInfo = drawMaze(loader);
  addEvents(step, loader, mazeInfo);
}

function initBlockly() {
  createBlock("move_up", {
    label: "위로 이동",
    color: 260,
    javascript: "moveUp();\n",
    img: "/img/up.png"
  });
  createBlock("move_down", {
    label: "아래로 이동",
    color: 260,
    javascript: "moveDown();\n",
    img: "/img/down.png"
  });
  createBlock("move_left", {
    label: "왼쪽으로 이동",
    color: 260,
    javascript: "moveLeft();\n",
    img: "/img/left.png"
  });
  createBlock("move_right", {
    label: "오른쪽으로 이동",
    color: 260,
    javascript: "moveRight();\n",
    img: "/img/right.png"
  });
  createBlock("repeat");
  createBlock("start", {
    label: "시작하면",
    color: 160,
    previousStatement: false,
    deletable: false,
    movable: false
  });

	var toolbox = '<xml>';
  	toolbox += '  <block type="move_up"></block>';
  	toolbox += '  <block type="move_down"></block>';
  	toolbox += '  <block type="move_right"></block>';
  	toolbox += '  <block type="move_left"></block>';
    toolbox += '  <block type="repeat"></block>';
  	toolbox += '</xml>';
	Blockly.inject(document.getElementById('blocklyDiv'),
      {toolbox: toolbox});
  var startblock = '<xml><block type="start" x="20" y="20"></block></xml>';
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,
	    $(startblock).get(0));
}

function createBlock(id, options) {
  if(id == "repeat") {
    Blockly.Blocks['repeat'] = {
      init: function() {
        this.setColour(30);
        this.appendDummyInput()
            .appendField("반복")
            .appendField(new Blockly.FieldDropdown([["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]), "count");
        this.appendStatementInput("statements");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['repeat'] = function(block) {
      var count = +block.getFieldValue('count');
      var statements = Blockly.JavaScript.statementToCode(block, 'statements');
      var code = '';
      for(var i = 0; i < count; i++) {
        code += statements;
      }
      return code;
    };
    return;
  }
  _.defaults(options, {
    color: 0,
    label: "",
    javascript: "",
    img: "",
    deletable: true,
    movable: true,
    previousStatement: true,
    nextStatement: true
  });
  Blockly.Blocks[id] = {
    init: function() {
      this.setColour(options.color);
      var dummyInput = this.appendDummyInput();
      if(options.img) {
        dummyInput.appendField(new Blockly.FieldImage(options.img, 15, 15, "*"));
      }
      dummyInput.appendField(options.label);
      this.setDeletable(!!options.deletable);
      this.setMovable(!!options.movable);
      this.setPreviousStatement(!!options.previousStatement);
      this.setNextStatement(!!options.nextStatement);
      this.contextMenu = false;
    }
  };
  Blockly.JavaScript[id] = function(block) {
    return options.javascript;
  };
}

function drawMaze(loader) {
  var maze = loader.getResult("maze"),
      stage = new createjs.Stage("display"),
      background = new createjs.Bitmap(loader.getResult("background"));
  var mazeInfo = {
    map: _.map(maze.map, function(row) {
      return _.map(row, function(item) {
        return item;
      })
    }),
    canvas: {
      stage: stage,
      background: background,
      character: new createjs.Bitmap(loader.getResult("character")),
      foods: [],
      obstacles: []
    }
  };
  stage.addChild(background);

  var obstacle_ids = _.chain(maze.manifest)
      .map(function(el) {
        return el.id || el;
      })
      .difference(["background", "character", "food", "trap", "bgm"])
      .value();
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      switch(mazeInfo.map[i][j]) {
        case "@": // character
          setBitmapCoord(mazeInfo.canvas.character, j, i);
          mazeInfo.map[i][j] = ".";
          break;
        case "%": // food
          var bitmap = new createjs.Bitmap(loader.getResult("food"));
          mazeInfo.canvas.foods.push(bitmap);
          setBitmapCoord(bitmap, j, i);
          stage.addChild(bitmap);
          mazeInfo.map[i][j] = ".";
          break;
        case "^": // trap
          var trap = new createjs.Bitmap(loader.getResult("trap"));
          setBitmapCoord(trap, j, i);
          stage.addChild(trap);
          break;
        case "#": // obstacles
          var idx = parseInt(Math.random() * obstacle_ids.length, 10),
              bitmap = new createjs.Bitmap(loader.getResult(obstacle_ids[idx]));
          mazeInfo.canvas.obstacles.push(bitmap);
          setBitmapCoord(bitmap, j, i);
          stage.addChild(bitmap);
          break;
        case ".":
        default:
          break;
      }
    }
  }
  stage.addChild(mazeInfo.canvas.character);
  stage.update();
  return mazeInfo;
}

function setBitmapCoord(bitmap, px, py) {
  bitmap.px = px;
  bitmap.py = py;
  bitmap.x = 50 * px + 25;
  bitmap.y = 50 * py + 25;
  bitmap.regX = 25;
  bitmap.regY = 25;
}

function addEvents(step, loader, mazeInfo) {
  $(document).on("contextmenu mousewheel", function(e) {
    e.preventDefault();
  });
  $("#modal-msg .go-next").click(function(e) {
    var path = "/maze/";
    if(step.substr(0, 1) == "t" || step.substr(0, 1) == "r") {
      path = path + step.substr(0, 1);
      step = step.substr(1);
    }
    location.pathname = path + (+step+1);
  });
  var org_px = mazeInfo.canvas.character.px,
      org_py = mazeInfo.canvas.character.py;
  $("#runCode").click(function(e) {
    if($(this).find("i").hasClass("fa-play")) {
      $(this).html('<i class="fa fa-refresh"></i> 처음상태로');
      // Generate JavaScript code and run it.
      window.LoopTrap = 1000;
      Blockly.JavaScript.INFINITE_LOOP_TRAP =
          'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
      var code = Blockly.JavaScript.workspaceToCode();
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        eval(code);
        if(queue.length == 0) {
          showModal("블럭이 하나도 없어요!");
        } else {
          popQueue(mazeInfo, 0);
        }
    } else {
      $(this).html('<i class="fa fa-play"></i> 시작');
      createjs.Tween.removeAllTweens();
      queue = [];
      resetMaze(mazeInfo, org_px, org_py);
    }
  });

  if(loader.getResult("maze").type == "game") {
    mazeInfo.score = 0;
    addFood(loader, mazeInfo);
    $("#scoreBox").show();
    $("#runCode").hide();
    $(document).keydown(function(e) {
      gameMove(e, loader, mazeInfo);
    });
  }
}

function moveUp() {
  queue.push({
    type: "move",
    args: [0, -1]
  });
}

function moveDown() {
  queue.push({
    type: "move",
    args: [0, 1]
  });
}

function moveLeft() {
  queue.push({
    type: "move",
    args: [-1, 0]
  });
}

function moveRight() {
  queue.push({
    type: "move",
    args: [1, 0]
  });
}

function moveCharacter(mazeInfo, x_next, y_next, callback) {
  var character = mazeInfo.canvas.character,
      tween = createjs.Tween.get(character),
      rotation;
  if(character.px == x_next) {
    rotation = character.py - 1 == y_next? 0 : 180;
  } else {
    rotation = character.px - 1 == x_next ? 270 : 90;
  }
  if(character.rotation == 0 && rotation == 270) {
    rotation = -90;
  } else if(character.rotation == 270 && rotation == 0) {
    rotation = 360;
  }

  character.px = x_next;
  character.py = y_next;

  if(character.rotation != rotation) {
    tween.to({rotation: rotation}, 500);
  }
  tween.wait(300)
       .to({x:50*x_next + 25, y: 50*y_next + 25}, 700)
       .call(function() {
         character.rotation = (character.rotation + 360) % 360;
         callback();
       })
       .addEventListener("change", function() {
         mazeInfo.canvas.stage.update();
       });
}

function bounceCharacter(mazeInfo, x_next, y_next, callback) {
  var character = mazeInfo.canvas.character,
      tween = createjs.Tween.get(character),
      rotation;
  if(character.px == x_next) {
    rotation = character.py - 1 == y_next? 0 : 180;
  } else {
    rotation = character.px - 1 == x_next ? 270 : 90;
  }
  if(rotation == 0) {
    y_next += 0.5;
  } else if(rotation == 180) {
    y_next -= 0.5;
  } else if(rotation == 90) {
    x_next -= 0.5;
  } else {
    x_next += 0.5;
  }
  if(character.rotation == 0 && rotation == 270) {
    rotation = -90;
  } else if(character.rotation == 270 && rotation == 0) {
    rotation = 360;
  }
  if(character.rotation != rotation) {
    tween.to({rotation: rotation}, 500);
  }
  tween.wait(200)
       .to({x:50*x_next + 25, y: 50*y_next + 25}, 350)
       .to({x:50*character.px + 25, y: 50*character.py + 25}, 350)
       .to({rotation: rotation+720}, 1000)
       .call(function() {
         character.rotation = (character.rotation + 360) % 360;
         callback();
       })
       .addEventListener("change", function() {
         mazeInfo.canvas.stage.update();
       });
}

function trapCharacter(mazeInfo, x_next, y_next, callback) {
  moveCharacter(mazeInfo, x_next, y_next, function() {
    var character = mazeInfo.canvas.character,
        tween = createjs.Tween.get(character);
    tween.to({rotation: character.rotation+720}, 1000)
         .call(function() {
           character.rotation = (character.rotation + 360) % 360;
           callback();
         })
         .addEventListener("change", function() {
           mazeInfo.canvas.stage.update();
         });
  });
}

function popQueue(mazeInfo, q_idx) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods,
      x_next = character.px + queue[q_idx].args[0],
      y_next = character.py + queue[q_idx].args[1],
      i = 0;

  if( mazeInfo.map[y_next][x_next] == "." ) {
    moveCharacter(mazeInfo, x_next, y_next, function() {
      if(q_idx + 1 == queue.length) {
        queue = [];
        for(i = 0; i < foods.length; i++) {
          if(foods[i].px == x_next && foods[i].py == y_next) {
            showModal("성공!", true);
            break;
          }
        }
        if(i == foods.length) {
          showModal("블럭을 다 썼지만 목표에 도착하지 못했어요");
        }
      } else {
        popQueue(mazeInfo, q_idx + 1);
      }
    });
  } else if( mazeInfo.map[y_next][x_next] == "^" ) {
    queue = [];
    trapCharacter(mazeInfo, x_next, y_next, function() {
      showModal("덫에 걸렸어요");
    });
  } else { // 이동할 수 없다면
    queue = [];
    bounceCharacter(mazeInfo, x_next, y_next, function() {
      showModal("벽에 부딪쳤어요");
    });
  }
}

function resetMaze(mazeInfo, org_px, org_py) {
  var character = mazeInfo.canvas.character;
  character.px = org_px;
  character.py = org_py;
  character.x = org_px * 50 + 25;
  character.y = org_py * 50 + 25;
  character.rotation = 0;
  mazeInfo.canvas.stage.update();
}

function showModal(msg, goNext) {
  if(goNext) {
    $("#modal-msg .go-next").show();
    $("#modal-msg .close-modal").hide();
  } else {
    $("#modal-msg .go-next").hide();
    $("#modal-msg .close-modal").show();
  }
  $("#modal-msg .modal-body").text(msg);
  $('#modal-msg').modal({
    backdrop: "static"
  });
  $('#modal-msg').modal('show');
}

function gameMove(e, loader, mazeInfo) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods,
      x_next = character.px,
      y_next = character.py,
      i = 0;
  switch(e.keyCode) {
    case 37: // left
      x_next--;
      break;
    case 38: // up
      y_next--;
      break;
    case 39: // right
      x_next++;
      break;
    case 40: //down
      y_next++;
      break;
    default:
      return;
  }
  e.preventDefault();
  if(createjs.Tween.hasActiveTweens()) {
    return;
  }

  if( mazeInfo.map[y_next][x_next] == "." ) {
    moveCharacter(mazeInfo, x_next, y_next, function() {
      for(i = 0; i < foods.length; i++) {
        if(foods[i].px == x_next && foods[i].py == y_next) {
          $("#scoreBox .score").text(++mazeInfo.score);
          removeFood(mazeInfo, x_next, y_next);
          addFood(loader, mazeInfo);
          break;
        }
      }
    });
  } else if( mazeInfo.map[y_next][x_next] == "^" ) {
    trapCharacter(mazeInfo, x_next, y_next, function() {
      // showModal("덫에 걸렸어요");
    });
  } else { // 이동할 수 없다면
    bounceCharacter(mazeInfo, x_next, y_next, function() {
      // showModal("벽에 부딪쳤어요");
    });
  }
}

function addFood(loader, mazeInfo) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods;
  var i, x, y;
  while(true) {
    x = parseInt(Math.random() * 6 + 1, 10);
    y = parseInt(Math.random() * 6 + 1, 10);
    if(character.px != x && character.py != y && mazeInfo.map[y][x] == ".") {
      for(i = 0; i < foods.length; i++) {
        if(foods[i].px == x && foods[i].py == y) {
          break;
        }
      }
      if(i == foods.length) {
        break;
      }
    }
  }
  var bitmap = new createjs.Bitmap(loader.getResult("food"));
  mazeInfo.canvas.foods.push(bitmap);
  setBitmapCoord(bitmap, x, y);
  mazeInfo.canvas.stage.addChild(bitmap);
  mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.character);
  mazeInfo.canvas.stage.addChild(mazeInfo.canvas.character);
  mazeInfo.canvas.stage.update();
}

function removeFood(mazeInfo, x, y) {
  var foods = mazeInfo.canvas.foods;
  var i;
  for(i = 0; i < foods.length; i++) {
    if(foods[i].px == x && foods[i].py == y) {
      mazeInfo.canvas.stage.removeChild(foods[i]);
      mazeInfo.canvas.stage.update();
      foods.splice(i, 1);
      break;
    }
  }
}
