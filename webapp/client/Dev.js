Router.route('/dev', function () {
  this.render('Dev');
});

Template.Dev.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    step = parseInt( $(".dev").attr("data-step"), 0) || 1;
    $("body").addClass("dev-body");
    $("#showCode").click(showCode);
    $("#runCode").click(runCode);
    init();
  }
};

function init() {
  Blockly.Blocks['move_up'] = {
    init: function() {
     // this.setHelpUrl('http://www.example.com/');
      this.setColour(260);
      this.appendDummyInput()
          .appendField("위로 이동");
      //this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      //this.setTooltip('');
    }
  };
  Blockly.JavaScript['move_up'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'moveUp();\n';
    return code;
  };

  Blockly.Blocks['move_down'] = {
    init: function() {
     // this.setHelpUrl('http://www.example.com/');
      this.setColour(260);
      this.appendDummyInput()
          .appendField("아래로 이동");
      //this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      //this.setTooltip('');
    }
  };
  Blockly.JavaScript['move_down'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'moveDown();\n';
    return code;
  };

  Blockly.Blocks['move_right'] = {
    init: function() {
     // this.setHelpUrl('http://www.example.com/');
      this.setColour(260);
      this.appendDummyInput()
          .appendField("오른쪽으로 이동");
      //this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      //this.setTooltip('');
    }
  };
  Blockly.JavaScript['move_right'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'moveRight();\n';
    return code;
  };

  Blockly.Blocks['move_left'] = {
    init: function() {
     // this.setHelpUrl('http://www.example.com/');
      this.setColour(260);
      this.appendDummyInput()
          .appendField("왼쪽으로 이동");
      //this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      //this.setTooltip('');
    }
  };
  Blockly.JavaScript['move_left'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'moveLeft();\n';
    return code;
  };

  Blockly.Blocks['start'] = {
    init: function() {
      //this.setHelpUrl('http://www.example.com/');
      this.setColour(160);
      this.appendDummyInput()
          .appendField("시작하면");
      this.setNextStatement(true);
      this.setDeletable(false);
      this.setMovable(false);
     // this.setTooltip('');
    }
  };
  Blockly.JavaScript['start'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
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

  drawMap();

}


function showCode() {
  // Generate JavaScript code and display it.
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode();
  alert(code);
}

function runCode() {
  // Generate JavaScript code and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode();
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}

function drawMap() {
  var map = {
    type: "maze",
    imgs: {
      background: "",
      character: "/img/map/mouse.png",
      goal: "/img/map/cheese.png",
      objects: ["/img/map/box.png"]
    },
    coords: {
      character: "3,4",
      goal: "5,4",
      roads: ["4,4"]
    }
  };
  extractMap(map);

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
    character.x = map.coords.character.x * 50;
    character.y = map.coords.character.y * 50;
    stage.addChild(character);
    goal.x = map.coords.goal.x * 50;
    goal.y = map.coords.goal.y * 50;
    stage.addChild(goal);
    for(var i = 0; i < map.coords.objects.length; i++) {
      var len = map.imgs.objects.length,
          idx = parseInt(Math.random() * len, 10),
          img_url = map.imgs.objects[idx]
          obj = new createjs.Bitmap(img_url);
      obj.x = map.coords.objects[i].x * 50;
      obj.y = map.coords.objects[i].y * 50;
      stage.addChild(obj);
    }
    stage.update();

  });

}

function loadImg(img_url) {
  var $img = $('<img style="display:none" src="' + img_url + '">'),
      deferred = $.Deferred();
  $img.load(function() {
    deferred.resolve();
  });
  return deferred;
}

function extractMap(map) {
  var coords = {};
  coords[map.coords.character] = 1;
  coords[map.coords.goal] = 1;
  map.coords.character = getCoord(map.coords.character);
  map.coords.goal = getCoord(map.coords.goal);
  for(var i = 0; i < map.coords.roads.length; i++) {
    coords[map.coords.roads[i]] = 1;
    map.coords.roads[i] = getCoord(map.coords.roads[i]);
  }
  map.coords.objects = [];
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      if(!coords[j+","+i]) {
        map.coords.objects.push({
          x: j,
          y: i
        });
      }
    }
  }
}

function getCoord(coord) {
  return {
    x: +coord.split(",")[0],
    y: +coord.split(",")[1]
  }
}
