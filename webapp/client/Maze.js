Router.route('/maze', function () {
  this.render('Maze');
});

Router.route('/maze/:step', function () {
  this.render('Maze');
});

var maze = null,
    queue = [],
    animation = null;

Template.Maze.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    $(document).on("contextmenu", function(e) {
      e.preventDefault();
    });
    $("#showCode").click(showCode);
    $("#runCode").click(runCode);
    step = +Router.current().params.step || 1;
    $("#modal-msg .go-next").click(function(e) {
      location.pathname = "/maze/" + (step+1);
    });
    $.getJSON("/maps/maze" + step + ".json?"+Math.random(), init);
  }
};

function init(map) {
  Blockly.Blocks['move_up'] = {
    init: function() {
      this.setColour(260);
      this.appendDummyInput()
          .appendField("위로 이동");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.contextMenu = false;
    }
  };
  Blockly.JavaScript['move_up'] = function(block) {
    var code = 'moveUp();\n';
    return code;
  };

  Blockly.Blocks['move_down'] = {
    init: function() {
      this.setColour(260);
      this.appendDummyInput()
          .appendField("아래로 이동");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.contextMenu = false;
    }
  };
  Blockly.JavaScript['move_down'] = function(block) {
    var code = 'moveDown();\n';
    return code;
  };

  Blockly.Blocks['move_right'] = {
    init: function() {
      this.setColour(260);
      this.appendDummyInput()
          .appendField("오른쪽으로 이동");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.contextMenu = false;
    }
  };
  Blockly.JavaScript['move_right'] = function(block) {
    var code = 'moveRight();\n';
    return code;
  };

  Blockly.Blocks['move_left'] = {
    init: function() {
      this.setColour(260);
      this.appendDummyInput()
          .appendField("왼쪽으로 이동");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.contextMenu = false;
    }
  };
  Blockly.JavaScript['move_left'] = function(block) {
    var code = 'moveLeft();\n';
    return code;
  };

  Blockly.Blocks['start'] = {
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendField("시작하면");
      this.setNextStatement(true);
      this.setDeletable(false);
      this.setMovable(false);
      this.contextMenu = false;
    }
  };
  Blockly.JavaScript['start'] = function(block) {
    var code = '';
    return code;
  };

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

  maze = drawMaze(map);
}


function showCode() {
  // Generate JavaScript code and display it.
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode();
  alert(code);
}

function runCode(e) {
  if($(e.target).find("i").hasClass("fa-play")) {
    $(e.target).html('<i class="fa fa-refresh"></i> 처음상태로');
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode();
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
      eval(code);
      runQueue();
    } catch (e) {
      alert(e);
    }
  } else {
    $(e.target).html('<i class="fa fa-play"></i> 시작');
    resetMaze();
  }
}

function drawMaze(given_map) {
  var map = extractMap(given_map);
  var maze = {
    given_map: given_map,
    map: map,
    hash: {}
  };

  var deferreds = [
    loadImg(map.imgs.character),
    loadImg(map.imgs.goal)
  ];
  for(var i = 0; i < map.imgs.objects.length; i++) {
    deferreds.push( loadImg(map.imgs.objects[i]) );
  }

  var $when = $.when.apply($, deferreds);
  $when.done(function () {
    var stage = new createjs.Stage("display");
    var character = new createjs.Bitmap(map.imgs.character);
    var goal = new createjs.Bitmap(map.imgs.goal);

    goal.x = map.coords.goal.x * 50;
    goal.y = map.coords.goal.y * 50;
    stage.addChild(goal);
    maze.hash[map.coords.goal.x + "," + map.coords.goal.y] = goal;

    character.x = map.coords.character.x * 50;
    character.y = map.coords.character.y * 50;
    stage.addChild(character);
    maze.hash[map.coords.character.x + "," + map.coords.character.y] = character;

    maze.canvasObjects = {
      stage: stage,
      character: character,
      goal: goal,
      objects: []
    }

    for(var i = 0; i < map.coords.objects.length; i++) {
      var len = map.imgs.objects.length,
          idx = parseInt(Math.random() * len, 10),
          img_url = map.imgs.objects[idx]
          obj = new createjs.Bitmap(img_url);
      obj.x = map.coords.objects[i].x * 50;
      obj.y = map.coords.objects[i].y * 50;
      stage.addChild(obj);
      maze.canvasObjects.objects.push(obj);
      maze.hash[map.coords.objects[i].x + "," + map.coords.objects[i].y] = obj;
    }
    stage.update();
    createjs.Ticker.addEventListener("tick", tick);
  });
  return maze;
}

function resetMaze() {
  var coord = maze.given_map.coords.character.split(","),
      x = +coord[0],
      y = +coord[1];
  delete maze.hash[maze.map.coords.character.x + "," + maze.map.coords.character.y];
  maze.map.coords.character = {
    x: x,
    y: y
  };
  maze.hash[x + "," + y] = maze.canvasObjects.character;
  maze.canvasObjects.character.x = x * 50;
  maze.canvasObjects.character.y = y * 50;
  maze.canvasObjects.stage.update();
}

function loadImg(img_url) {
  var $img = $('<img style="display:none" src="' + img_url + '">'),
      deferred = $.Deferred();
  $img.load(function() {
    deferred.resolve();
  });
  return deferred;
}

function extractMap(given_map) {
  var map = JSON.parse(JSON.stringify(given_map)); // clone object
  var hash = {};
  hash[map.coords.character] = 1;
  hash[map.coords.goal] = 1;
  map.coords.character = getCoord(map.coords.character);
  map.coords.goal = getCoord(map.coords.goal);
  for(var i = 0; i < map.coords.roads.length; i++) {
    hash[map.coords.roads[i]] = 1;
    map.coords.roads[i] = getCoord(map.coords.roads[i]);
  }
  map.coords.objects = [];
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      if(!hash[j+","+i]) {
        map.coords.objects.push({
          x: j,
          y: i
        });
      }
    }
  }

  return map;
}

function getCoord(coord) {
  return {
    x: +coord.split(",")[0],
    y: +coord.split(",")[1]
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

function moveCharacter(x_disp, y_disp, callback) {
  var character = maze.map.coords.character,
      x_prev = character.x,
      y_prev = character.y,
      x_next = x_prev + x_disp,
      y_next = y_prev + y_disp;
  if(maze.map.coords.goal.x == x_next && maze.map.coords.goal.y == y_next) {
    // proceed
  } else if(maze.hash[x_next + "," + y_next]) {
    callback("더이상 움직일 수 없어요");
    return;
  }
  character.x = x_next;
  character.y = y_next;
  delete maze.hash[x_prev + "," + y_prev];
  maze.hash[x_next + "," + y_next] = maze.canvasObjects.character;
  setTimeout(function() {
    animation = {
      duration: 700,
      start_time: createjs.Ticker.getTime(),
      step: function(t) {
        var r = t / animation.duration;
        maze.canvasObjects.character.x = 50 * (x_prev + x_disp * r);
        maze.canvasObjects.character.y = 50 * (y_prev + y_disp * r);
        maze.canvasObjects.stage.update();
        if(t == animation.duration) {
          animation = null;
          callback();
        }
      }
    };
  }, 300);
}

function tick(event) {
  if(animation) {
    var t = createjs.Ticker.getTime() - animation.start_time;
    if(t > animation.duration) {
      t = animation.duration;
    }
    animation.step(t);
  }
}

function runQueue() {
  var q_idx = 0;
  function step() {
    moveCharacter(queue[q_idx].args[0], queue[q_idx].args[1], function(err) {
      if(err) {
        showModal(err);
      } else {
        q_idx++;
        if(q_idx < queue.length) {
          step();
        } else {
          if (maze.map.coords.character.x == maze.map.coords.goal.x &&
              maze.map.coords.character.y == maze.map.coords.goal.y) {
            showModal("성공!", true);
          } else {
            showModal("블럭을 다 썼지만 치즈에 가지 못했어요");
          }
          queue = [];
        }
      }
    });
  }
  if(queue.length == 0) {
    showModal("블럭이 하나도 없어요!");
  } else if(q_idx < queue.length) {
    step();
  }
}

function showModal(msg, goNext) {
  if(goNext) {
    $("#modal-msg .go-next").show();
    $("#modal-msg .close-modal").hide();
  }
  $("#modal-msg .modal-body").text(msg);
  $('#modal-msg').modal('show');
}
