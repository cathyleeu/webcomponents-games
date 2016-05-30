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
        block.x = 30;
        block.y = 20;
      }
    }
    str = Object.keys(block).map(function(attr) {
      return attr + '="' + block[attr] + '"';
    }).join(" ");
    return "<block " + str + "><next>" + this.createXml(blocks.slice(1)) + "</next></block>";
  };
  var labelInit = Blockly.FieldLabel.prototype.init;
  Blockly.FieldLabel.prototype.init = function() {
    // 텍스트 라벨의 위치 조정
    labelInit.call(this);
    var y = +this.textElement_.getAttribute("y");
    this.textElement_.setAttribute("y", y + 5);
  };
};
KidsCoding.prototype = {

  init: function(loader, mazeInfo, run, tileFactory) {
    this.tileFactory = tileFactory;
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
          if(options.rgbColor) {
            this.colour_ = options.rgbColor;
          }
        }
      };
    });
  	var toolbox = toolbox.map(function(i,j) {
      return '<block type="' + i + '"></block>';
    });
    document.getElementById('blocklyDiv').innerHTML = "";
  	this.workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
      toolbox: '<xml>' + toolbox + '</xml>',
      media: '/components/GoogleBlockly/media/',
      trashcan: true,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 1.2,
        minScale: 0.6,
        scaleSpeed: 1.2
      },
    });
    if(!workspace) {
      workspace = ["start"];
    }
    var startblock = '<xml>' + this.createXml(workspace) + '</xml>';
  	Blockly.Xml.domToWorkspace(this.workspace,$(startblock).get(0));
    return this.workspace;
  }
};
