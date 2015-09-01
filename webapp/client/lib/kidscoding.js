KidsCoding = function() {
  this.queue = [];
};
KidsCoding.prototype = {

  initBlockly: function(toolbox) {
    this.createBlock("move_up", {
      label: "위로 이동",
      color: 260,
      javascript: "moveUp();\n",
      img: "/img/up.png"
    });
    this.createBlock("move_down", {
      label: "아래로 이동",
      color: 260,
      javascript: "moveDown();\n",
      img: "/img/down.png"
    });
    this.createBlock("move_left", {
      label: "왼쪽으로 이동",
      color: 260,
      javascript: "moveLeft();\n",
      img: "/img/left.png"
    });
    this.createBlock("move_right", {
      label: "오른쪽으로 이동",
      color: 260,
      javascript: "moveRight();\n",
      img: "/img/right.png"
    });
    this.createBlock("move_forward", {
      label: "앞으로 가기",
      color: 260,
      javascript: "moveForward();\n",
      img: "/img/move_forward.png"
    });
    this.createBlock("rotate_left", {
      label: "왼쪽으로 돌기",
      color: 260,
      javascript: "rotateLeft();\n",
      img: "/img/rotate_left.png"
    });
    this.createBlock("rotate_right", {
      label: "오른쪽으로 돌기",
      color: 260,
      javascript: "rotateRight();\n",
      img: "/img/rotate_right.png"
    });
    this.createBlock("get_item", {
      label: "아이템 가져오기",
      color: 260,
      javascript: "getItem();\n",
      img: "/img/get_item.png"
    });
    this.createBlock("use_item", {
      label: "아이템 사용하기",
      color: 260,
      javascript: "useItem();\n",
      img: "/img/map/pick.png"
    });
    this.createBlock("repeat");
    this.createBlock("item_scissors", {
      label: "가위",
      color: 260,
      javascript: "itemScissors();\n",
      img: "/img/hand_scissors.png"
    });
    this.createBlock("item_rock", {
      label: "바위",
      color: 260,
      javascript: "itemRock();\n",
      img: "/img/hand_rock.png"
    });
    this.createBlock("item_paper", {
      label: "보",
      color: 260,
      javascript: "itemPaper();\n",
      img: "/img/hand_paper.png"
    });
    this.createBlock("condition_cannotMoveForward");
    this.createBlock("start", {
      label: "시작하면",
      color: 160,
      previousStatement: false,
      deletable: false,
      movable: false
    });

  	var toolbox = _(toolbox).map(function(i,j) {
      return '<block type="' + i + '"></block>';
    });
  	Blockly.inject(document.getElementById('blocklyDiv'),
        {toolbox: '<xml>' + toolbox + '</xml>'});
    var startblock = '<xml><block type="start" x="20" y="20"></block></xml>';
  	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,
  	    $(startblock).get(0));
  },

  createBlock: function(id, options) {
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
    } else if(id == "condition_cannotMoveForward") {
      Blockly.Blocks['condition_cannotMoveForward'] = {
        init: function() {
          this.setColour(0);
          this.appendDummyInput()
              .appendField("앞으로 가지 못하면");
          this.appendStatementInput("statements");
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setTooltip('');
        }
      };
      Blockly.JavaScript['condition_cannotMoveForward'] = function(block) {
        var statements = Blockly.JavaScript.statementToCode(block, 'statements');
        statements = "\"" + statements.split("\"").join("\\\"").split("\n").join("\\n") + "\"";
        var code = 'ifCannotMoveForward(' + statements + ');';
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
          dummyInput.appendField(new Blockly.FieldImage(options.img, 24, 24, "*"));
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
  },

  moveUp: function() {
    this.queue.push({
      type: "move",
      args: [0, -1]
    });
  },

  moveDown: function() {
    this.queue.push({
      type: "move",
      args: [0, 1]
    });
  },

  moveLeft: function() {
    this.queue.push({
      type: "move",
      args: [-1, 0]
    });
  },

  moveRight: function() {
    this.queue.push({
      type: "move",
      args: [1, 0]
    });
  },

  moveForward: function() {
    this.queue.push({
      type: "move",
      args: ["forward"]
    });
  },

  rotateLeft: function() {
    this.queue.push({
      type: "rotate",
      args: ["left"]
    });
  },

  rotateRight: function() {
    this.queue.push({
      type: "rotate",
      args: ["right"]
    });
  },

  getItem: function() {
    this.queue.push({
      type: "getItem",
      args: []
    });
  },

  useItem: function() {
    this.queue.push({
      type: "useItem",
      args: []
    });
  },

  itemRock: function() {
    this.queue.push({
      type: "action",
      args: ["rock"]
    });
  },

  itemPaper: function() {
    this.queue.push({
      type: "action",
      args: ["paper"]
    });
  },

  itemScissors: function() {
    this.queue.push({
      type: "action",
      args: ["scissors"]
    });
  },

  ifCannotMoveForward: function(code) {
    this.queue.push({
      type: "condition",
      args: ["cannot_move_forward", code]
    });
  }

};
