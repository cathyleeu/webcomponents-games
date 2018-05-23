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
      if(arg.imageField && arg.imageField.getSvgRoot()) {
        var imageField = arg.imageField,
            svgRoot = imageField.getSvgRoot(),
            xy = svgRoot.getAttribute("transform").match(/translate\(([+-]?\d*\.?\d*)[ ,]([+-]?\d*\.?\d*)\)/),
            x = +xy[1] - (40-imageField.size_.width)/2,
            y = +xy[2] - (40-imageField.size_.height)/2;
        svgRoot.setAttribute("transform", "translate(" + x + "," + y + ")");
      }
    }
  } else if(this.blockType == "vertical") {

    var renderDraw_ = Blockly.BlockSvg.prototype.renderDraw_,
        renderFields_ = Blockly.BlockSvg.prototype.renderFields_,
        renderCompute_ = Blockly.BlockSvg.prototype.renderCompute_,
        tighten_ = Blockly.RenderedConnection.prototype.tighten_;
        getTranslateXY = function(el) {
          var transform_value = el.getAttribute("transform") || "",
              xy = transform_value.match(/translate\(([+-]?\d*\.?\d*)[ ,]?([+-]?\d*\.?\d*)?\)/) || [0, 0, 0];
          return [+xy[1] || 0, +xy[2] || 0];
        },
        setTranslate = function(el, dx, dy) {
          dx = dx === null ? "+0" : dx;
          dy = dy === null ? "+0" : dy;
          var xy = getTranslateXY(el),
              x = typeof dx == "string" ? xy[0] + +dx : +dx,
              y = typeof dy == "string" ? xy[1] + +dy : +dy;
          el.setAttribute("transform", "translate(" + x + "," + y + ")");
        };
    // input이 아닌 fieldrow의 높이 조정
    Blockly.BlockSvg.prototype.renderDraw_ = function(a, b) {
      var height = 0,
          isDoubleFieldRow = this.inputList.length >= 2 && !this.inputList[0].connection &&
              !!this.inputList[0].fieldRow[1] && !!this.inputList[0].fieldRow[1].textElement_ &&
              !!this.inputList[1].fieldRow[0] && !!this.inputList[1].fieldRow[0].textElement_;
      if(isDoubleFieldRow) {
        b[0].height = 70;
      }
      if(this.type == "forloop_type1" || this.type == "forloop_type2" || this.type == "forloop_type3") {
        b[0].height = 80;
      }
      for(var i = 0; i < b.length; i++) {
        if(i > 0 && b[i].type == -1) {
          b[i].height = b[0].height;
        }
        height += b[i].height;
      }
      if(this.type == "condition2_odd_and_5_smaller_for" || this.type == "condition2_even_and_5_smaller_for" || this.type == "condition2_odd_or_5_smaller_for" || this.type == "condition2_even_or_5_smaller_for") {
        b[0].height = 80;
      }
      b.bottomEdge = height;
      renderDraw_.call(this, a, b);
    }
    // 필드 이미지 세로 위치 조정
    Blockly.BlockSvg.prototype.renderFields_ = function(a, b, c) {
      if(this.type == "forloop_type3" && a[0] && a[0].argType_ && a[0].argType_[0] == "dropdown" && this.inputList[0].connection.targetConnection) {
        var xy = getTranslateXY(this.inputList[0].connection.targetConnection.sourceBlock_.svgGroup_);
        var ret = renderFields_.call(this, a, xy[0], c + 18) + 16;
      } else {
        var ret = renderFields_.call(this, a, b, c);
      }
      var isDouble = this.inputList.length >= 2 && !this.inputList[0].connection &&
              !!this.inputList[0].fieldRow[1] && !!this.inputList[0].fieldRow[1].textElement_ &&
              !!this.inputList[1].fieldRow[0] && !!this.inputList[1].fieldRow[0].textElement_,
          isFirstRow = isDouble && this.inputList[0].fieldRow == a,
          isSecondRow = isDouble && this.inputList[1].fieldRow == a;
      // 일반적인 2줄 블록의 경우(이미지 하나와 텍스트 2줄)
      if(a.length > 0 && a[0].imageElement_) {
        var svgRoot = a[0].getSvgRoot();
        setTranslate(svgRoot, null, "+3");
        if(isFirstRow) {
          setTranslate(a[1].textElement_, null, "-10");
        }
      } else if(a.length > 0 && isSecondRow) {
        var xy = getTranslateXY(this.inputList[0].fieldRow[1].textElement_);
        ret = Math.max(b, ret-b) + xy[0];
        setTranslate(a[0].textElement_, xy[0], xy[1] + 20);
      }

      //조건 블록에서 첫 번째 조건 부분을 2줄 처리
      if(this.type == "condition2_odd_and_5_smaller_for" || this.type == "condition2_even_and_5_smaller_for" || this.type == "condition2_odd_or_5_smaller_for" || this.type == "condition2_even_or_5_smaller_for"){
        var isFirstRow = this.inputList[0].fieldRow == a,
            isSecondRow = this.inputList[1].fieldRow == a,
            firstText = this.inputList[1].fieldRow[0];
        for(var i = 0; i < a.length; i++) {
          if(isFirstRow) {
            if(a[i].imageElement_){
              var svgRoot = a[i].getSvgRoot();
              setTranslate(svgRoot, null, "-18");
            }else if(a[i].textElement_){
              setTranslate(a[i].textElement_, null, "-18");
            }
          } else if(isSecondRow && !a[i].argType_) {
            if(i==0){//두번째 줄 초기 위치 세팅
              var xy = getTranslateXY(firstText.textElement_);
              ret = Math.max(b, ret-b)+10;
              xy[0] -=135;
            }
            else{//이전 이미지 또는 텍스트의 가로길이를 불러와서 위치값을 변경하기
              if(!a[(i-1)].textElement_){
                var widtharray = a[(i-1)].imageElement_.getAttribute("width").split('px');
                var secondx = Number(widtharray[0]);
                xy[0]+=secondx;
              }else{
                var secondx = Number(a[(i-1)].textElement_.getAttribute("x"));
                xy[0]+=secondx*2;
              }
            }
            //이미지와 텍스트를 정해진 좌표값에 집어 넣기
            if(a[i].imageElement_){
              var svgRoot = a[i].getSvgRoot();
              setTranslate(svgRoot, xy[0], xy[1]);
            }else if(a[i].textElement_){
              setTranslate(a[i].textElement_, xy[0], "+15");
            }
          }
        }
      }
      // 드랍박스를 포함한 forloop 처리
      if(this.type == "forloop_type1" || this.type == "forloop_type2" || this.type == "forloop_type3") {
        if(this.type == "forloop_type1") {
          var isFirstRow = this.inputList[0].fieldRow == a || this.inputList[1].fieldRow == a,
              isSecondRow = this.inputList[2].fieldRow == a,
              firstText = this.inputList[0].fieldRow[1];
        } else if(this.type == "forloop_type2") {
          var isFirstRow = this.inputList[1].fieldRow == a || this.inputList[2].fieldRow == a,
              isSecondRow = this.inputList[3].fieldRow == a,
              firstText = this.inputList[1].fieldRow[0];
        } else if(this.type == "forloop_type3") {
          var isFirstRow = this.inputList[1].fieldRow == a || this.inputList[2].fieldRow == a,
              isSecondRow = this.inputList[3].fieldRow == a,
              firstText = this.inputList[1].fieldRow[0];
        }
        for(var i = 0; i < a.length; i++) {
          if(isFirstRow && a[i].textElement_) {
            setTranslate(a[i].textElement_, null, "-18");
          } else if(isSecondRow && a[i].textElement_ && !a[0].argType_) {
            var xy = getTranslateXY(firstText.textElement_);
            ret = Math.max(b, ret-b);
            if(this.type == "forloop_type2") {
              xy[0] -= 58;
            }

            setTranslate(a[i].textElement_, xy[0], xy[1] + 36);
          }
        }
      }
      return ret;
    };
    // 드랍박스를 포함한 doubleRow에서 드랍박스 세로 위치 조정
    Blockly.RenderedConnection.prototype.tighten_ = function() {
      var restore = false;
      if( this.sourceBlock_.type == "forloop_type1" ||
          this.sourceBlock_.type == "forloop_type2" ||
          this.sourceBlock_.type == "forloop_type3") {
        var c = this.targetBlock().getSvgRoot();
        if(c && c.getAttribute("data-argument-type") == "dropdown") {
          this.y_ -= 18;
          restore = true;
        }
      }
      tighten_.call(this);
      if(restore) {
        this.y_ += 18;
      }
    };
    // 필드 이미지 가로 위치 조정
    Blockly.BlockSvg.prototype.renderCompute_ = function(arg) {
      var ret = renderCompute_.call(this, arg);
      for(var i = 0; i < ret.length; i++) {
        if(ret[i][0].fieldRow[0] && ret[i][0].fieldRow[0].imageElement_) {
          ret[i].paddingStart = 30 - ret[i][0].fieldRow[0].size_.width/2;
        }
      }
      return ret;
    };
    // 텍스트 라벨에서 공백 허용, field의 class가 적용되지 않는 버그 수정
    var updateTextNode_ = Blockly.Field.prototype.updateTextNode_;
    Blockly.Field.prototype.updateTextNode_ = function() {
      updateTextNode_.call(this);
      if(this.textElement_) {
        var text = $("<span>" + this.text_ + "<span>").text();
        if(text != this.text_) {
          this.text_ = this.textElement_.firstChild.textContent = text;
        }
        var a = this.text_,
            class_ = this.class_ || "";
        a.length > this.maxDisplayLength ? (a = a.substring(0, this.maxDisplayLength - 2) + "\u2026",
        this.textElement_.setAttribute("class", class_ + " blocklyText blocklyTextTruncated")) : this.textElement_.setAttribute("class", class_ + " blocklyText");
      }
    };
    // vertical의 경우 FieldIconMenu에 image를 보여주는 기능이 없어 추가
    var iconMenuInit = Blockly.FieldIconMenu.prototype.init,
        iconMenuSetValue = Blockly.FieldIconMenu.prototype.setValue;
    Blockly.FieldIconMenu.prototype.init = function(a) {
      iconMenuInit.call(this, a);
      var icon = null;
      // 화살표 위치 조정
      this.arrowX_ += 15;
      this.arrowIcon_.setAttribute('transform',
        'translate(' + this.arrowX_ + ',' + this.arrowY_ + ')');
      for(var i = 0; i < this.icons_.length; i++) {
        if(this.icons_[i].value == this.value_) {
          icon = this.icons_[i];
        }
      }
      this.imageElement_ = Blockly.createSvgElement(
        'image',
        {
          'height': '25px',
          'width': '25px',
          'transform': 'translate(5,3)'
        },
        this.sourceBlock_.getSvgRoot());
      this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', icon.src || '');
      this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
    };
    Blockly.FieldIconMenu.prototype.setValue = function(newValue) {
      if (newValue === null || newValue === this.value_) {
        return;  // No change
      }
      if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, this.value_, newValue));
      }
      this.value_ = newValue;
      // Find the relevant icon in this.icons_ to get the image src.
      if (this.imageElement_) {
        this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', this.getSrcForValue(this.value_) || '');
      }
    };
    Blockly.FieldIconMenu.prototype.getSize = function() {
      this.size_.width || this.render_();
      return {
        width: 20,
        height: this.size_.height
      };
    };
  } else { // else if(this.blockType == "default") {
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
    // 현재 사용하고 있는 scratch-blocks의 setColour 함수에 버그가 있어서 교체
    Blockly.Block.prototype.setColour = function(colour, colourSecondary, colourTertiary) {
      this.colour_ = this.makeColour_(colour);
      if (colourSecondary !== undefined) {
        this.colourSecondary_ = this.makeColour_(colourSecondary);
      } else {
        this.colourSecondary_ = goog.color.rgbArrayToHex(
            goog.color.darken(goog.color.hexToRgb(this.colour_),
            0.1));
      }
      if (colourTertiary !== undefined) {
        this.colourTertiary_ = this.makeColour_(colourTertiary);
      } else {
        this.colourTertiary_ = goog.color.rgbArrayToHex(
            goog.color.darken(goog.color.hexToRgb(this.colour_),
            0.2));
      }
      if (this.rendered) {
        this.updateColour();
      }
    };
    // scratch-blocks에 disabled class 적용이 미구현되어 있어 추가
    Blockly.BlockSvg.prototype.updateDisabled = function() {
      if (this.disabled) {
        Blockly.addClass_(this.svgGroup_, 'blocklyDisabled');
      } else {
        Blockly.removeClass_(this.svgGroup_, 'blocklyDisabled');
      }
    };
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
    if(!downBlock || downBlock.disabled) {
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
    this.blockLimits = null;
  },
  createXml: function(blocks, options) {
    var _this = this;
    blocks = String(blocks);
    if(blocks.length == 0) {
      return "";
    }
    var match = blocks.match(/([^\[\](),\s]+)\s*(\([^\[\]()]*\))?\s*((\[[^\]]*\])*)?\s*,?\s*(.*)/),
        block = {
          type: (match[1] || "").trim()
        },
        args = (match[2] || "()").slice(1,-1).trim().split(","),
        statements = (match[3] || "[]").slice(1,-1).split("][").filter(function(i){return i}),
        rest = (match[5] || "").trim(),
        str;
    if(!Blocks[block.type]) {
      console.error("undefined block : " + block.type);
      return "";
    }
    this.registerBlock(block.type);
    if(options.x || options.y) {
      block.x = options.x || 0;
      block.y = options.y || 0;
      delete options.x;
      delete options.y;
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
        idx = 0,
        args0 = Blocks[block.type].args0||[];
    args0.forEach(function(arg) {
      var arg_type = arg.type,
          field_name = arg.name,
          field_value = args[idx] || (arg.options ? arg.options[0][1] || arg.options[0].value : ""),
          shadow_type = block.type + "_" + arg.name;
      // args는 field_dropdown이나 input_value일 경우에만 적용되도록 함
      if(arg_type == "field_dropdown" || arg_type == "field_iconmenu" || arg_type == "input_value") {
        idx++;
      }
      // scratch-blocks에서는 field_dropdown일 경우 shadow 블록 추가 필요
      if(_this.blockType != "default" && (arg.type == "field_dropdown" || arg.type == "field_iconmenu")) {
        arg_type = "input_value";
        Blockly.Blocks[shadow_type] = (function(type, options, name) {
          return {
            init: function() {
              this.appendDummyInput()
                  .appendField(type == "field_dropdown" ? new Blockly.FieldDropdown(options) : new Blockly.FieldIconMenu(options), name);
              this.setOutput(true);
              this.setColour(Blockly.Colours.event.primary,
                Blockly.Colours.event.secondary,
                Blockly.Colours.event.tertiary
              );
            }
          };
        })(arg.type, arg.options, field_name);
      }
      // 입력값이 *일 경우 빈칸 처리
      // TODO: default 타입에서의 처리 필요
      if(field_value === "*" && arg_type == "input_value") {
        shadow_type = shadow_type + "_empty";
        field_value = new Array(4).join(" ");
        Blockly.Blocks[shadow_type] = {
          init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(''), field_name);
            this.setOutput(true);
            this.setColour("#CCCCCC");
          }
        };
      }
      if(block.type == "empty") {
        arg_type == "input_value"
        shadow_type = block.type + "_emptyblock";
        field_value = new Array(16).join(" ");
        Blockly.Blocks[shadow_type] = {
          init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(''), field_name);
            this.setOutput(true);
            this.setColour("#CCCCCC");
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
    if(statements.length > 0) {
      var statementsNames = this.getStatementsNames(block.type);
      statements.forEach(function(statement, i) {
        statements_str += '<statement name="' + statementsNames[i] + '">' +
            _this.createXml(statement, options) +
            '</statement>';
      });
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
  getStatementsNames: function(type) {
    return Object.keys(Blocks[type]).filter(function(key) {
          return key.slice(0, -1) == "args";
        }).map(function(key) {
          return Blocks[type][key];
        }).reduce(function(acc, cur) {
          [].push.apply(acc, cur);
          return acc;
        }, []).filter(function(item) {
          return item.type == "input_statement";
        }).map(function(item) {
          return item.name;
        });
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
        if(options.rgbColor) {
          options.colour = options.rgbColor;
        }
        this.jsonInit(options);
        if(options.id) {
          this.id = options.id;
        }
        this.setDeletable(!!options.deletable);
        this.setMovable(!!options.movable);
        this.contextMenu = false;
      }
    };
  },
  initBlockly: function(toolbox, workspace, workspace2) {
    var _this = this;
    toolbox = toolbox.map(function(item) {
      var tokens = item.split(":");
      if(tokens.length >= 2) {
        _this.blockLimits = _this.blockLimits || {};
        _this.blockLimits[tokens[0]] = +tokens[1];
      }
      return tokens[0];
    });
    document.getElementById('blocklyDiv').innerHTML = "";
  	this.workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
      toolbox: '<xml>' + this.createXml(toolbox || "", {isToolbox:true}) + '</xml>',
      media: this.blockType == "default" ? '/GoogleBlockly/media/' : '/scratch-blocks/media/',
      trashcan: !this.isHorizontal,
      zoom: this.isHorizontal ? null : {
        controls: true,
        wheel: true,
        startScale: 0.8,
        maxScale: 1.2,
        minScale: 0.6,
        scaleSpeed: 1.2
      },
      scrollbars: this.isHorizontal
    });
    var initXml = '<xml>' + this.createXml(workspace || "start", {uneditable:true, x:30, y:20}) + '</xml>';
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
    if(workspace2) {
      initXml = '<xml>' + this.createXml(workspace2, {uneditable:true, x:200, y:20}) + '</xml>';
      Blockly.Xml.domToWorkspace($(initXml).get(0),this.workspace);
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
