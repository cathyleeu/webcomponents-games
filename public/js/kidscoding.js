KidsCoding = function() {
  this.q_idx = 0;
  this.queue = [];
  this.workspace = null;
  this.createXml = function(blocks) {
    if(blocks.length == 0) {
      return "";
    }
    var block = blocks[0],
        str;
    if(typeof block == "string") {
      block = {
        type: block
      };
      if(block.type == "start") {
        block.x = block.y = 20;
      }
    }
    str = Object.keys(block).map(function(attr) {
      return attr + '="' + block[attr] + '"';
    }).join(" ");
    return "<block " + str + "><next>" + this.createXml(blocks.slice(1)) + "</next></block>";
  };
};
KidsCoding.prototype = {

  init: function(loader, mazeInfo, run) {
    this.Actions = new Actions(this, loader, mazeInfo, run);
  },
  initBlockly: function(toolbox, workspace) {
    var _this = this;
    $.each(Blocks, function(name, options) {
      options = $.extend({
        colour: 0,
        message0: "",
        deletable: true,
        movable: true,
        previousStatement: null,
        nextStatement: null
      }, options);
      if(options.previousStatement === false) {
        delete options.previousStatement;
      }
      if(options.nextStatement === false) {
        delete options.nextStatement;
      }
      Blockly.Blocks[name] = {
        init: function() {
          this.jsonInit(options);
          if(options.id) {
            this.id = options.id;
          }
          this.setDeletable(!!options.deletable);
          this.setMovable(!!options.movable);
          this.contextMenu = false;
        }
      };
    });
  	var toolbox = toolbox.map(function(i,j) {
      return '<block type="' + i + '"></block>';
    });
    document.getElementById('blocklyDiv').innerHTML = "";
  	this.workspace = Blockly.inject(document.getElementById('blocklyDiv'),
        {toolbox: '<xml>' + toolbox + '</xml>'});
    if(!workspace) {
      workspace = [{
        "type": "start",
        "x": 20,
        "y": 20
      }];
    }
    var startblock = '<xml>' + this.createXml(workspace) + '</xml>';
  	Blockly.Xml.domToWorkspace(this.workspace,$(startblock).get(0));
    return this.workspace;
  }
};
