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
  this.isHorizontal = location.pathname.indexOf("mazeh") >= 0;
  if(!this.isHorizontal) {
    var labelInit = Blockly.FieldLabel.prototype.init;
    // 텍스트 라벨의 위치 조정
    Blockly.FieldLabel.prototype.init = function() {
      labelInit.call(this);
      var y = +this.textElement_.getAttribute("y");
      this.textElement_.setAttribute("y", y + 5);
    };
  }
  // 일부 태블릿에서 블럭이 움직이지 않는 현상 수정
  Blockly.longStart_ = function() {};
};
KidsCoding.prototype = {
  init: function(loader, mazeInfo, run, tileFactory) {
    this.tileFactory = tileFactory;
    this.Actions = new Actions(this, loader, mazeInfo, run);
  },
  initBlockly: function(toolbox, workspace) {
    var _this = this,
        lang = store.get("lang") || "ko";
    if(!workspace) {
      workspace = ["start"];
    }
    this.blockLimits = {};
    $.each(Blocks, function(name, options) {
      if(name != "start" && toolbox.indexOf(name) < 0 && workspace.indexOf(name) < 0) {
        return;
      }
      if(typeof options.message0 == "object") {
        options.message0 = options.message0[lang];
      }
      if(typeof options.message1 == "object") {
        options.message1 = options.message1[lang];
      }
      if(typeof options.message2 == "object") {
        options.message2 = options.message2[lang];
      }
      if(typeof options.message3 == "object") {
        options.message3 = options.message3[lang];
      }
      if(typeof options.message4 == "object") {
        options.message4 = options.message4[lang];
      }
      if(typeof options.message5 == "object") {
        options.message5 = options.message5[lang];
      }
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
          if(_this.isHorizontal && options.message0) {
            options.message0 = "%1";
          }
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
  	var toolbox = toolbox.map(function(item) {
      var tokens = item.split(":");
      if(tokens.length >= 2) {
        _this.blockLimits[tokens[0]] = +tokens[1];
      }
      return '<block type="' + tokens[0] + '"></block>';
    }).join("");
    document.getElementById('blocklyDiv').innerHTML = "";
  	this.workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
      toolbox: '<xml>' + toolbox + '</xml>',
      media: this.isHorizontal ? '/scratch-blocks/media/' : '/GoogleBlockly/media/',
      trashcan: true,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 1.2,
        minScale: 0.6,
        scaleSpeed: 1.2
      }
    });
    var startblock = '<xml>' + this.createXml(workspace) + '</xml>';
  	Blockly.Xml.domToWorkspace($(startblock).get(0),this.workspace);
  }
};
