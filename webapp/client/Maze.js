Router.route('/maze', function () {
  this.redirect('/maze/1');
});

Router.route('/maze/:step', function() {
  var loader = new createjs.LoadQueue();
  var d1 = $.Deferred();
  var d2 = $.Deferred();
  loader.loadManifest({
    id: "maze",
    src: "/maps/maze" + this.params.step + ".json",
    type: "manifest"
  });
  loader.on("complete", function() {
    d1.resolve();
  });
  Template.Maze.rendered = function() {
    d2.resolve();
  };
  $.when( +this.params.step, loader, d1, d2 ).done(init);
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
    javascript: "moveUp();\n"
  });
  createBlock("move_down", {
    label: "아래로 이동",
    color: 260,
    javascript: "moveDown();\n"
  });
  createBlock("move_left", {
    label: "왼쪽으로 이동",
    color: 260,
    javascript: "moveLeft();\n"
  });
  createBlock("move_right", {
    label: "오른쪽으로 이동",
    color: 260,
    javascript: "moveRight();\n"
  });
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
  	toolbox += '</xml>';
	Blockly.inject(document.getElementById('blocklyDiv'),
      {toolbox: toolbox});
  var startblock = '<xml><block type="start" x="20" y="20"></block></xml>';
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,
	    $(startblock).get(0));
}

function createBlock(id, options) {
  _.defaults(options, {
    color: 0,
    label: "",
    javascript: "",
    deletable: true,
    movable: true,
    previousStatement: true,
    nextStatement: true
  });
  Blockly.Blocks[id] = {
    init: function() {
      this.setColour(options.color);
      this.appendDummyInput()
          .appendField(options.label);
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
      goal = getBitmap(loader.getResult("goal"), maze.coords.goal),
      character = getBitmap(loader.getResult("character"), maze.coords.character);
  var info = {
    hash: {},
    canvas: {
      stage: stage,
      goal: goal,
      character: character,
      obstacles: []
    }
  };

  info.hash[goal.px + "," + goal.py] = goal;
  info.hash[character.px + "," + character.py] = character;

  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      var coord = j + "," + i;
      if(!info.hash[coord] && maze.coords.roads.indexOf(coord) < 0) {
        var len = maze.manifest.length - 2,
            idx = parseInt(Math.random() * len, 10),
            id = maze.manifest[idx+2].id,
            bitmap = getBitmap(loader.getResult(id), coord);
        stage.addChild(bitmap);
        info.hash[coord] = bitmap;
        info.canvas.obstacles.push(bitmap);
      }
    }
  }
  stage.addChild(goal);
  stage.addChild(character);
  stage.update();
  return info;
}

function getBitmap(img, coord) {
  var bitmap = new createjs.Bitmap(img);
  bitmap.px = +coord.split(",")[0];
  bitmap.py = +coord.split(",")[1];
  bitmap.x = 50 * bitmap.px + 25;
  bitmap.y = 50 * bitmap.py + 25;
  bitmap.regX = 25;
  bitmap.regY = 25;
  return bitmap;
}

function addEvents(step, loader, mazeInfo) {
  $(document).on("contextmenu", function(e) {
    e.preventDefault();
  });
  $("#modal-msg .go-next").click(function(e) {
    location.pathname = "/maze/" + (step+1);
  });
  var character_coord = loader.getResult("maze").coords.character;
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
      resetMaze(mazeInfo, character_coord);
    }
  });
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

  delete mazeInfo.hash[character.px + "," + character.py];
  character.px = x_next;
  character.py = y_next;
  mazeInfo.hash[x_next + "," + y_next] = character;

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

function popQueue(mazeInfo, q_idx) {
  var character = mazeInfo.canvas.character,
      goal = mazeInfo.canvas.goal,
      x_next = character.px + queue[q_idx].args[0],
      y_next = character.py + queue[q_idx].args[1];

  if( (x_next == goal.px && y_next == goal.py) ||
      (!mazeInfo.hash[x_next + "," + y_next]) ) {
    // 이동했을때 goal 이거나 빈곳인 경우
    moveCharacter(mazeInfo, x_next, y_next, function() {
      if(q_idx + 1 == queue.length) {
        queue = [];
        if(x_next == goal.px && y_next == goal.py) {
          showModal("성공!", true);
        } else {
          showModal("블럭을 다 썼지만 치즈에 가지 못했어요");
        }
      } else {
        popQueue(mazeInfo, q_idx + 1);
      }
    });
  } else { // 이동할 수 없다면
    queue = [];
    bounceCharacter(mazeInfo, x_next, y_next, function() {
      showModal("더 이상 이동할 수 없어요");
    });
  }
}

function resetMaze(mazeInfo, coord) {
  var coord = coord.split(","),
      x = +coord[0],
      y = +coord[1],
      character = mazeInfo.canvas.character;
  delete mazeInfo.hash[character.px + "," + character.py];
  mazeInfo.hash[x + "," + y] = character;
  character.px = x;
  character.py = y;
  character.x = x * 50 + 25;
  character.y = y * 50 + 25;
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
  $('#modal-msg').modal('show');
}
