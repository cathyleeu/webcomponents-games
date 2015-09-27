KidsCoding = function(loader, mazeInfo) {
  this.queue = [];
  this.Actions = new Actions(loader, mazeInfo);
};
KidsCoding.prototype = {

  initBlockly: function(toolbox) {
    var _this = this;
    $.each(Blocks, function(name, obj) {
      _this.createBlock(name, obj);
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
    _.defaults(options, {
      color: 0,
      label: "",
      command: null,
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
        if(options.appendField) {
          if(options.appendField.type == "dropdown") {
            dummyInput.appendField.apply(dummyInput, [
              new Blockly.FieldDropdown(options.appendField.data),
              options.appendField.name
            ]);
          }
        }
        if(options.appendStatementInput) {
          this.appendStatementInput(options.appendStatementInput);
        }
        if(options.label2) {
          dummyInput = this.appendDummyInput();
          dummyInput.appendField(options.label2);
        }
        if(options.appendStatementInput2) {
          this.appendStatementInput(options.appendStatementInput2);
        }
        this.setDeletable(!!options.deletable);
        this.setMovable(!!options.movable);
        this.setPreviousStatement(!!options.previousStatement);
        this.setNextStatement(!!options.nextStatement);
        this.contextMenu = false;
      }
    };
    if(options.command == null) {
      Blockly.JavaScript[id] = function() {
        return "";
      };
    } else if(!!options.command && typeof options.command == "object") {
      Blockly.JavaScript[id] = (function(command) {
        return function(block) {
          return BlockUtils.getScript(command[0], command.slice(1));
        };
      })(options.command);
    } else if(typeof options.command == "function") {
      Blockly.JavaScript[id] = options.command;
    }
  }
};

BlockUtils = {
  escapeEval: function(code) {
    return "\"" + code.split("\\").join("\\\\").split("\"").join("\\\"").split("\n").join(";") + "\"";
  },
  getScript: function(type, args) {
    args = $.map(args, function(val) {
      if(typeof val == "string") {
        return BlockUtils.escapeEval(val);
      } else {
        return val;
      }
    }).toString();
    return "queue.push({type:\"" + type + "\",args:[" + args + "]});\n";
  }
};
