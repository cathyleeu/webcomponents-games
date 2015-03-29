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