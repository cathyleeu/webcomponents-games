KidsCoding = function(loader, mazeInfo, run) {
  this.q_idx = 0;
  this.queue = [];
  this.Actions = new Actions(this, loader, mazeInfo, run);
  this.workspace = null;
};
KidsCoding.prototype = {

  initBlockly: function(toolbox) {
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
  	this.workspace = Blockly.inject(document.getElementById('blocklyDiv'),
        {toolbox: '<xml>' + toolbox + '</xml>'});
    var startblock = '<xml><block type="start" x="20" y="20"></block></xml>';
  	Blockly.Xml.domToWorkspace(this.workspace,$(startblock).get(0));
    return this.workspace;
  }
};
