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
    block.deletable = false;
    block.movable = false;
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
      // 가로 블럭 처리
      if(_this.isHorizontal) {
        // messageh와 argsh 처리
        for(var item in options) {
          if(item.slice(0, 8) == "messageh" || item.slice(0, 5) == "argsh") {
            if(options[item] == null) {
              delete options[item.slice(0, -2) + item.slice(-1)];
            } else {
              options[item.slice(0, -2) + item.slice(-1)] = options[item];
            }
            delete options[item];
          }
        }
      } else {
        // messageh와 argsh 삭제
        for(var item in options) {
          if(item.slice(0, 8) == "messageh" || item.slice(0, 5) == "argsh") {
            delete options[item];
          }
        }
      }
      for(var item in options) {
        if(item.slice(0, -1) == "message") {
          // 다국어 기능
          if(typeof options[item] == "object") {
            options[item] = options[item][lang];
          }
          // 가로 블럭에서 텍스트 제거
          if(_this.isHorizontal) {
            options[item] = (options[item].match(/%[\d+]/g) || ["%1"]).join(" ")
          }
        }
        // 이미지 기본 크기 설정
        if(item.slice(0, 4) == "args") {
          options[item].forEach(function(obj) {
            if(obj.type == "field_image" && !obj.width) {
              obj.width = _this.isHorizontal ? 40 : 25;
              obj.height = _this.isHorizontal ? 40 : 25;
            }
          });
        }
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
      var tokens = item.split(":"),
          value_str = "";
      if(tokens.length >= 2) {
        _this.blockLimits[tokens[0]] = +tokens[1];
      }
      if(_this.isHorizontal && tokens[0]=="repeat") {
        value_str = '<value name="count">' +
          '<shadow type="dropdown">' +
          '<field name="count">2</field>' +
          '</shadow>' +
          '</value>';
      }
      return '<block type="' + tokens[0] + '">' + value_str + '</block>';
    }).join("");
    document.getElementById('blocklyDiv').innerHTML = "";
  	this.workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
      toolbox: '<xml>' + toolbox + '</xml>',
      media: this.isHorizontal ? '/scratch-blocks/media/' : '/GoogleBlockly/media/',
      trashcan: true,
      zoom: this.isHorizontal ? null : {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 1.2,
        minScale: 0.6,
        scaleSpeed: 1.2
      },
      horizontalLayout: this.isHorizontal
    });
    var startblock = '<xml>' + this.createXml(workspace) + '</xml>';
  	Blockly.Xml.domToWorkspace($(startblock).get(0),this.workspace);
  }
};
