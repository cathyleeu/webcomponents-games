KidsCoding = function() {
  var _this = this,
      blink_debounce = 150,
      blink_timeoutkey;
  this.q_idx = 0;
  this.queue = [];
  this.workspace = null;
  this.isHorizontal = location.pathname.indexOf("mazeh") >= 0;
  this.blockType = "default";
  if(location.pathname.indexOf("mazeh") >= 0) {
    this.blockType = "horizontal";
  } else if(location.pathname.indexOf("mazev") >= 0) {
    this.blockType = "vertical";
  }
  if(this.blockType == "horizontal") {
    Blockly.VerticalFlyout.prototype.DEFAULT_WIDTH = 240;
    Blockly.Flyout.prototype.MARGIN = 20;
    Blockly.Colours.flyout = "#EEEEEE";

    var position = Blockly.VerticalFlyout.prototype.position;
    Blockly.VerticalFlyout.prototype.position = function() {
      position.call(this);
      this.height_ = $("#display").height();
      this.setBackgroundPath_(this.width_, this.height_);
      if (this.scrollbar_) {
        this.scrollbar_.resize();
      }
    };

    var getClientRect = Blockly.VerticalFlyout.prototype.getClientRect;
    Blockly.VerticalFlyout.prototype.getClientRect = function() {
      var rect = getClientRect.call(this);
      if(rect) {
        rect.height = -rect.top + this.height_ + 60;
        rect.width += 1E9;
      }
      return rect;
    }

    var getMetrics = Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_;
    Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_ = function() {
      var metrics = getMetrics.call(this);
      var svgSize = Blockly.svgSize(this.getParentSvg());
      if (this.toolbox_) {
        if (this.toolboxPosition == Blockly.TOOLBOX_AT_TOP ||
            this.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM) {
          svgSize.height -= this.toolbox_.getHeight();
        } else if (this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT ||
            this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT) {
          svgSize.width -= this.toolbox_.getWidth();
        }
      }
      var MARGIN = Blockly.Flyout.prototype.CORNER_RADIUS - 1;
      var viewWidth = svgSize.width - MARGIN;
      var viewHeight = svgSize.height - MARGIN;
      var blockBox = this.getBlocksBoundingBox();
      var contentWidth = blockBox.width * this.scale;
      var contentHeight = blockBox.height * this.scale;
      var contentX = blockBox.x * this.scale;
      var contentY = blockBox.y * this.scale;
      var l_margin = 30,
          r_margin = 250;
      var display_height = $("#display").height();
      leftEdge = contentX - l_margin;
      rightEdge = contentX + viewWidth - l_margin;
      topEdge = contentY - l_margin - display_height;
      bottomEdge = contentY + viewHeight - l_margin - display_height;
      if(contentWidth > rightEdge - r_margin) {
        rightEdge = contentWidth + r_margin;
      }
      metrics.contentWidth = rightEdge - leftEdge - 1;
      metrics.contentLeft = leftEdge;
      metrics.contentHeight = bottomEdge - topEdge - 1;
      metrics.contentTop = topEdge;
      if(this.scrollbar) {
        if(viewWidth <= metrics.contentWidth) {
          this.scrollbar.hScroll.svgGroup_.setAttribute("display","block");
        } else {
          this.scrollbar.hScroll.svgGroup_.setAttribute("display","none");
        }
        this.scrollbar.vScroll.svgGroup_.setAttribute("display","none");
      }

      return metrics;
    }
    var renderDraw_ = Blockly.BlockSvg.prototype.renderDraw_;
    // 필드 이미지 크기에 따른 가운데 정렬
    Blockly.BlockSvg.prototype.renderDraw_ = function(arg) {
      renderDraw_.call(this, arg);
      if(arg.imageField) {
        var imageField = arg.imageField,
            svgRoot = imageField.getSvgRoot(),
            xy = svgRoot.getAttribute("transform").match(/translate\(([+-]?\d*\.?\d*)[ ,]([+-]?\d*\.?\d*)\)/),
            x = +xy[1] - (40-imageField.size_.width)/2,
            y = +xy[2] - (40-imageField.size_.height)/2;
        svgRoot.setAttribute("transform", "translate(" + x + "," + y + ")");
      }
    }
  } else if(this.blockType == "vertical") {
    var renderFields_ = Blockly.BlockSvg.prototype.renderFields_,
        renderCompute_ = Blockly.BlockSvg.prototype.renderCompute_;
    // 필드 이미지 세로 위치 조정
    Blockly.BlockSvg.prototype.renderFields_ = function(a, b, c) {
      var ret = renderFields_.call(this, a, b, c);
      if(a[0].imageElement_) {
        var svgRoot = a[0].getSvgRoot(),
            xy = svgRoot.getAttribute("transform").match(/translate\(([+-]?\d*\.?\d*)[ ,]([+-]?\d*\.?\d*)\)/);
        svgRoot.setAttribute("transform", "translate(" + +xy[1] + "," + (+xy[2]+3) + ")");
      }
      return ret;
    };
    // 필드 이미지 가로 위치 조정
    Blockly.BlockSvg.prototype.renderCompute_ = function(arg) {
      var ret = renderCompute_.call(this, arg);
      if(ret[0][0].fieldRow[0].imageElement_) {
        ret[0].paddingStart = 30 - ret[0][0].fieldRow[0].size_.width/2;
      }
      return ret;
    };
  } else {
    var labelInit = Blockly.FieldLabel.prototype.init;
    // 텍스트 라벨의 위치 조정
    Blockly.FieldLabel.prototype.init = function() {
      labelInit.call(this);
      var y = +this.textElement_.getAttribute("y");
      this.textElement_.setAttribute("y", y + 5);
    };
  }
  if(this.blockType != "default") {
    var translateSurface = Blockly.DragSurfaceSvg.prototype.translateSurface;
    var isIE = !!(navigator.userAgent.match(/MSIE |Trident\/|Edge\//));
    Blockly.DragSurfaceSvg.prototype.translateSurface = function(x, y) {
      translateSurface.call(this, x, y);
      if(isIE && _this.blockType == "vertical") {
        this.SVG_.setAttribute("style", this.SVG_.getAttribute("style") + ";left:" + _this.workspace.getFlyout().getWidth() + "px");
      } else if(this.SVG_.style.left || (this.SVG_.getBoundingClientRect().left == parseInt($("#maze-container .workspace").css("left")) && this.SVG_.getBoundingClientRect().right == $(document).width())) {
        // 안드로이드 구형 브라우저 및 IE에서 터치 위치와 블럭 위치가 맞지 않는 현상 수정
        // SEE: https://gitlab.com/toycode/kidscoding/merge_requests/638
        if(_this.blockType == "vertical") {
          x = (x + _this.workspace.getFlyout().getWidth()) * this.scale_;
        }
        y *= this.scale_;
        this.SVG_.setAttribute("style", this.SVG_.getAttribute("style") + ";left:" + x.toFixed(2) + "px;top:" + y.toFixed(2) + "px;");
      }
    }
  }
  // 일부 태블릿에서 블럭이 움직이지 않는 현상 수정
  Blockly.longStart_ = function() {};

  // movable=false 인 블럭 클릭이 되지 않는 현상 처리
  // https://github.com/google/blockly/issues/742
  var downBlock = null;
  var onMouseDown_ = Blockly.BlockSvg.prototype.onMouseDown_;
  // 늑대와여우 안드로이드 태블릿에서 캔버스 없어지는 현상 수정
  var ex0 = navigator.userAgent.indexOf("Linux; Android 5.1.1; NYTSSA")>=0;
  Blockly.BlockSvg.prototype.onMouseDown_ = function(e) {
    e.stopPropagation();
    if(this.isInFlyout) {
      downBlock = this;
    }
    onMouseDown_.call(this, e);
    // 블록 이동시 리프레시는 최초 1번만 수행하면 됨
    if(ex0 && !_this.ex0_applied) {
      _this.ex0_applied = true;
      $("#display").hide();
      clearTimeout(blink_timeoutkey);
      blink_timeoutkey = setTimeout(function() {
        $("#display").show();
      }, blink_debounce);
    }
  };
  // flyout에서 클릭시 맨 마지막에 블럭 추가하는 기능
  var onMouseMove_ = Blockly.BlockSvg.prototype.onMouseMove_;
  Blockly.BlockSvg.prototype.onMouseMove_ = function(e) {
    onMouseMove_.call(this, e);
    downBlock = null;
  };
  var onMouseUp_ = Blockly.Flyout.prototype.onMouseUp_;
  Blockly.Flyout.prototype.onMouseUp_ = function(e) {
    onMouseUp_.call(this, e);
    if(!downBlock) {
      return;
    }
    var blockId = Blockly.genUid(),
        groupId = Blockly.genUid(),
        dom = Blockly.Xml.blockToDomWithXY(downBlock, true),
        blocks = _this.workspace.getAllBlocks(),
        target = blocks.filter(function(block) {
          return block.type === "start";
        })[0];
    while(target.getNextBlock()) {
      target = target.getNextBlock();
    }
    dom.setAttribute("id", blockId);
    Blockly.Events.fromJson({
      type: "create",
      blockId: blockId,
      group: groupId,
      xml: Blockly.Xml.domToText(dom)
    }, _this.workspace).run(true);
    Blockly.Events.fromJson({
      type: "move",
      blockId: blockId,
      group: groupId,
      newParentId: target.id
    }, _this.workspace).run(true);
  }

  // 가로블럭에서 드랍다운 메뉴가 화면 밖으로 나가는 현상 수정
  if(this.blockType == "horizontal") {
    var showEditor_ = Blockly.FieldDropdown.prototype.showEditor_;
    Blockly.FieldDropdown.prototype.showEditor_ = function() {
      var getBoundingClientRect = this.fieldGroup_.getBoundingClientRect;
      this.fieldGroup_.getBoundingClientRect = function() {
        var position = getBoundingClientRect.call(this);
        return {
          top: position.top - 300,
          bottom: position.bottom,
          left: position.left,
          right: position.right,
          width: position.width,
          height: position.height
        };
      };
      showEditor_.call(this);
      delete this.fieldGroup_.getBoundingClientRect;
    };
  }
};
KidsCoding.prototype = {
  init: function(loader, mazeInfo, run, tileFactory) {
    this.tileFactory = tileFactory;
    this.Actions = new Actions(this, loader, mazeInfo, run);
    this.mazeInfo = mazeInfo;
    if(window.devtool) {
      window.$$$ = new window.devtool(this);
    }
    // TODO: 블럭 개수 제한 기능이 일부 태블릿에서 블럭 동작을 막아 주석처리
    // this.blockLimits = {};
  },
  createXml: function(blocks, options) {
    var _this = this;
    blocks = String(blocks);
    if(blocks.length == 0) {
      return "";
    }
    var match = blocks.match(/([^\[\](),\s]+)\s*(\([^\[\]()]*\))?\s*(\[[^\]]*\])?\s*,?\s*(.*)/),
        block = {
          type: (match[1] || "").trim()
        },
        args = (match[2] || "()").slice(1,-1).trim().split(","),
        statements = (match[3] || "[]").slice(1,-1).trim(),
        rest = (match[4] || "").trim(),
        str;
    if(!Blocks[block.type]) {
      console.error("undefined block : " + block);
      return "";
    }
    this.registerBlock(block.type);
    if(block.type == "start") {
      block.x = 30;
      block.y = 20;
      block.deletable = false;
      block.movable = false;
    }
    if(options.uneditable) {
      block.deletable = false;
      block.movable = false;
    }
    str = Object.keys(block).map(function(attr) {
      return attr + '="' + block[attr] + '"';
    }).join(" ");
    var value_str = "",
        statements_str = "",
        child_str = "",
        idx = 0;
    Blocks[block.type].args0.forEach(function(arg) {

      var arg_type = arg.type,
          field_name = arg.name,
          field_value = args[idx] || (arg.options ? arg.options[0][1] : ""),
          shadow_type = block.type + "_" + arg.name;
      // args는 field_dropdown이나 input_value일 경우에만 적용되도록 함
      if(arg_type == "field_dropdown" || arg_type == "input_value") {
        idx++;
      }
      // scratch-blocks에서는 field_dropdown일 경우 shadow 블록 추가 필요
      if(_this.blockType != "default" && arg.type == "field_dropdown") {
        arg_type = "input_value";
        Blockly.Blocks[shadow_type] = {
          init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(arg.options), field_name);
            this.setOutput(true);
            this.setColour(Blockly.Colours.event.primary,
              Blockly.Colours.event.secondary,
              Blockly.Colours.event.tertiary
            );
          }
        };
      }
      // 입력값이 *일 경우 빈칸 처리
      // TODO: default 타입에서의 처리 필요
      if(field_value === "*" && arg_type == "input_value") {
        shadow_type = shadow_type + "_empty";
        field_value = new Array(4).join("_");
        Blockly.Blocks[shadow_type] = {
          init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(''), field_name);
            this.setOutput(true);
            this.setColour("#FFFFFF");
          }
        };
      }
      if(block.type == "empty") {
        arg_type == "input_value"
        shadow_type = block.type + "_emptyblock";
        field_value = new Array(16).join("_");
        Blockly.Blocks[shadow_type] = {
          init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(''), field_name);
            this.setOutput(true);
            this.setColour("#FFFFFF");
          }
        };
      }
      // scratch-blocks에서는 arg_type을 input_value로 바꾸어 주어야 함
      if(arg_type == "input_value") {
        arg.type = "input_value";
        value_str += '<value name="' + field_name + '">' +
          '<shadow type="' + shadow_type + '">' +
          '<field name="' + field_name + '">' + field_value + '</field>' +
          '</shadow>' +
          '</value>';
      }
    });
    if(statements) {
      statements_str = '<statement name="statements">' +
          this.createXml(statements, options) +
          '</statement>';
    }
    if(rest.length > 0) {
      child_str = this.createXml(rest, options);
    }
    if(options.isToolbox) {
      return "<block " + str + ">" + value_str + statements_str + "</block>" + child_str;
    } else {
      child_str = "<next>" + child_str + "</next>";
      return "<block " + str + ">" + value_str + statements_str + child_str + "</block>";
    }
  },
  registerBlock: function(name) {
    if(Blockly.Blocks[name]) {
      return;
    }
    var _this = this,
        options = Blocks[name],
        lang = store.session.get("lang", "ko");
    // name이 없을 경우 message0에서 %1 등 제거하고 사용
    if(!options.name) {
      options.name = {};
      Object.keys(options.message0).forEach(function(key) {
        return options.name[key] = options.message0[key].replace(/\%\d/g, "").replace(/\s+/g, " ").trim();
      });
    }
    // 가로 블럭 처리
    if(this.isHorizontal) {
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
      if(item.slice(0, -1) == "message" || item == "name") {
        // 다국어 기능
        if(typeof options[item] == "object") {
          options[item] = options[item][lang] || options[item]["en"];
        }
        // 가로 블럭에서 텍스트 제거
        if(this.isHorizontal && item != "name") {
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
  },
  initBlockly: function(toolbox, workspace) {
    var _this = this;
    // TODO: 블럭 개수 제한 기능이 일부 태블릿에서 블럭 동작을 막아 주석처리
    // var toolbox = toolbox.map(function(item) {
    //   var tokens = item.split(":"),
    //       value_str = "";
    //   if(tokens.length >= 2) {
    //     _this.blockLimits[tokens[0]] = +tokens[1];
    //   }
    //   return '<block type="' + tokens[0] + '"></block>';
    // }).join("");
    document.getElementById('blocklyDiv').innerHTML = "";
  	this.workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
      toolbox: '<xml>' + this.createXml(toolbox || "", {isToolbox:true}) + '</xml>',
      media: this.blockType == "default" ? '/GoogleBlockly/media/' : '/scratch-blocks/media/',
      trashcan: !this.isHorizontal,
      zoom: this.isHorizontal ? null : {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 1.2,
        minScale: 0.6,
        scaleSpeed: 1.2
      },
      scrollbars: this.isHorizontal
    });
    var initXml = '<xml>' + this.createXml(workspace || "start", {uneditable:true}) + '</xml>';
  	Blockly.Xml.domToWorkspace($(initXml).get(0),this.workspace);
    var blocks = this.workspace.getAllBlocks(),
        block = blocks.filter(function(block) {
          return block.type === "start";
        })[0];
    while(block) {
      if(block.type == "empty") {
        $(block.svgPath_).addClass("empty");
      }
      block = block.getNextBlock();
    }
    // flyout 내의 블럭들을 오른쪽으로 20px씩 이동
    // (블럭들이 너무 왼쪽으로 붙어있어서 윈도우 태블릿에서 화면전화이 일어나는 문제가 있음)
    if(this.isHorizontal) {
      this.workspace.flyout_.workspace_.topBlocks_.forEach(function(block) {
        block.moveBy(50,0);
      });
    }
  }
};
