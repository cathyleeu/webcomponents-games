Router.route('/classify', function () {
  this.render('Classify');
});

Router.route('/classify/:step', function () {
  this.render('Classify');
});

var step;

Template.Classify.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    step = +Router.current().params.step || 1;
    $("body").addClass("classify-body");
    init();
  }
};

var levels = [{
  instruction: "빨간색 블록 3개를 한 곳으로 모아봐요",
  graph: {
    "red": {
      label: "블록을 이 아래에 붙여요",
      color: 0,
      freeBlocks: 3
    }
  }
}, {
  instruction: "파란색 블록 4개를 한 곳으로 모아봐요",
  graph: {
    "blue": {
      label: "블록을 이 아래에 붙여요",
      color: 210,
      freeBlocks: 4
    }
  }
}, {
  instruction: "노란색 블록 8개를 한 곳으로 모아봐요",
  graph: {
    "yellow": {
      label: "블록을 이 아래에 붙여요",
      color: 60,
      freeBlocks: 8
    }
  }
}, {
  instruction: "보라색 블록 8개를 한 곳으로 모아봐요",
  graph: {
    "purple": {
      label: "블록을 이 아래에 붙여요",
      color: 260,
      freeBlocks: 8
    }
  }
}, {
  instruction: "빨간색 블럭끼리, 파란색 블럭끼리 모아봐요",
  graph: {
    "red": {
      label: "빨간색",
      color: 0,
      freeBlocks: 5
    },
    "blue": {
      label: "파란색",
      color: 210,
      freeBlocks: 5
    }
  }
}, {
  instruction: "노란색 블럭끼리, 보라색 블럭끼리 모아봐요",
  graph: {
    "yellow": {
      label: "노란색",
      color: 60,
      freeBlocks: 4
    },
    "purple": {
      label: "보라색",
      color: 260,
      freeBlocks: 6
    }
  }
}, {
  instruction: "세가지 블럭을 같은 색의 블럭 끼리 모아봐요",
  graph: {
    "red": {
      label: "빨간색",
      color: 0,
      freeBlocks: 5
    },
    "blue": {
      label: "파란색",
      color: 210,
      freeBlocks: 6
    },
    "green": {
      label: "초록색",
      color: 120,
      freeBlocks: 7
    }
  }
}, {
  instruction: "세가지 블럭을 같은 색의 블럭 끼리 모아봐요",
  graph: {
    "yellow": {
      label: "노란색",
      color: 60,
      freeBlocks: 8
    },
    "purple": {
      label: "보라색",
      color: 260,
      freeBlocks: 4
    },
    "orange": {
      label: "주황색",
      color: 35,
      freeBlocks: 6
    }
  }
}, {
  instruction: "다섯가지 블럭을 같은 색의 블럭 끼리 모아봐요",
  graph: {
    "red": {
      label: "빨간색",
      color: 0,
      freeBlocks: 5
    },
    "yellow": {
      label: "노란색",
      color: 60,
      freeBlocks: 8
    },
    "green": {
      label: "초록색",
      color: 120,
      freeBlocks: 7
    },
    "blue": {
      label: "파란색",
      color: 210,
      freeBlocks: 6
    },
    "purple": {
      label: "보라색",
      color: 260,
      freeBlocks: 4
    }
  }
}, {
  instruction: "여섯가지 블럭을 같은 색의 블럭 끼리 모아봐요",
  graph: {
    "red": {
      label: "빨간색",
      color: 0,
      freeBlocks: 5
    },
    "orange": {
      label: "주황색",
      color: 35,
      freeBlocks: 6
    },
    "yellow": {
      label: "노란색",
      color: 60,
      freeBlocks: 7
    },
    "green": {
      label: "초록색",
      color: 120,
      freeBlocks: 7
    },
    "blue": {
      label: "파란색",
      color: 210,
      freeBlocks: 6
    },
    "purple": {
      label: "보라색",
      color: 260,
      freeBlocks: 5
    }
  }
}, {
  instruction: "같은 숫자끼리 모아봐요. 다 모으면 무슨 모양이 될까요?",
  noBaseStar: true,
  graph: {
    "1": {
      label: "1",
      color: 310,
      freeBlocks: 3,
      baseX: 270,
      baseY: 80
    },
    "2": {
      label: "2",
      color: 310,
      freeBlocks: 5,
      baseX: 310,
      baseY: 50
    },
    "3": {
      label: "3",
      color: 310,
      freeBlocks: 4,
      baseX: 350,
      baseY: 90
    },
    "4": {
      label: "4",
      color: 310,
      freeBlocks: 5,
      baseX: 390,
      baseY: 50
    },
    "5": {
      label: "5",
      color: 310,
      freeBlocks: 3,
      baseX: 430,
      baseY: 80
    }
  }
}, {
  instruction: "같은 숫자끼리 모아봐요. 다 모으면 무슨 모양이 될까요?",
  noBaseStar: true,
  graph: {
    "1": {
      label: "1",
      color: 190,
      freeBlocks: 1,
      baseX: 270,
      baseY: 80
    },
    "2": {
      label: "2",
      color: 190,
      freeBlocks: 6,
      baseX: 310,
      baseY: 55
    },
    "3": {
      label: "3",
      color: 190,
      freeBlocks: 7,
      baseX: 350,
      baseY: 30
    },
    "4": {
      label: "4",
      color: 190,
      freeBlocks: 6,
      baseX: 390,
      baseY: 55
    },
    "5": {
      label: "5",
      color: 190,
      freeBlocks: 1,
      baseX: 430,
      baseY: 80
    }
  }
}, {
  instruction: "마지막 단계에요. 어떻게 맞출수 있을까요?",
  noBaseStar: true,
  graph: {
    "1": {
      label: " ",
      itemLabel: " ",
      color: 160,
      freeBlocks: 4,
      baseX: 270,
      baseY: 50
    },
    "2": {
      label: " ",
      itemLabel: " ",
      color: 160,
      freeBlocks: 5,
      baseX: 350,
      baseY: 50
    },
    "3": {
      label: " ",
      itemLabel: " ",
      color: 160,
      freeBlocks: 6,
      baseX: 430,
      baseY: 50
    }
  }
}];

function createBlock(type, color, label, noBaseStar) {
  if(type == "base") {
    return {
      init: function() {
        this.setColour(color);
        if(noBaseStar) {
          this.appendDummyInput()
              .setAlign(Blockly.ALIGN_CENTRE)
              .appendField(label);
        } else {
          this.appendDummyInput()
              .setAlign(Blockly.ALIGN_CENTRE)
              .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"))
              .appendField(label);
        }
        this.setNextStatement(true);
        this.setDeletable(false);
        this.setMovable(false);
        this.setTooltip('');
      }
    }
  } else {
    return {
      init: function() {
        this.setColour(color);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(label);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setDeletable(false);
        this.setTooltip('');
      }
    }
  }
}

function onChangeBlock(e) {
  var $xml = $(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)),
      $bases = $xml.children("[type|=base]"),
      valid = true,
      blockNumberArr = [],
      level = levels[step-1];
  for(var i = 0; i < $bases.length; i++) {
    var num = getBlockNumber($bases.get(i)),
        axis = $bases.eq(i).attr("type").split("-")[1];

    if(num == -1) {
      $(".num[data-type=num-" + axis + "]").html('<img style="width: 24px; height: 24px; margin: 0px;position: relative;top: -5px;left: -5px;" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR5K20agKm8OjQaehJTcZ-LHkGmE2rsYoqw_XTEiEW1VbXTKA7w">');
    } else {
      $(".num[data-type=num-" + axis + "]").text(num);
    }

    blockNumberArr.push(num);
    if(blockNumberArr[i] == -1) {
      valid = false;
    }
  }
  if(valid && $xml[0].childNodes.length == $bases.length) {
    alert(step + "단계 성공 - 참 잘했어요!");
    if(step < levels.length) {
      location.pathname = "/classify/" + (step+1);
    }
  }
}

function getBlockNumber(xml) {
  var $xml = $(xml),
      axis = $xml.attr("type").split("-")[1],
      $blocks = $xml.find("block");
  for(var i = 0; i < $blocks.length; i++) {
    if( $blocks.eq(i).attr("type").split("-")[1] != axis ) {
      return -1;
    }
  }
  return $blocks.length;
}

function init() {
  var workspace_width = $("#blocklyDiv").width(),
      workspace_height = $("#blocklyDiv").height();

  var level = levels[step-1];
  var graph = level.graph, x = 20, y = 30, xx, yy;
  var $xml = $('<xml id="startBlocks"/>');
  $(".instruction").text("[ " + step + " 단계 ] " + level.instruction);
  for(var axis in graph) {
    xx = graph[axis].baseX || x;
    yy = graph[axis].baseY || y;
    var $num = $('<div data-type="num-' + axis + '" class="num">0<div>');
    $(".wrapper").append($num);
    $num.css({
      position: "absolute",
      top: (yy - 20) + "px",
      left: (xx + (level.noBaseStar ? 18: 37)) + "px"
    });

    Blockly.Blocks["base-" + axis] = createBlock("base", graph[axis].color, graph[axis].label, level.noBaseStar);
    Blockly.Blocks["item-" + axis] = createBlock("item", graph[axis].color, graph[axis].itemLabel || axis);
    $xml.append('<block type="base-' + axis + '" x="' + xx + '" y="' + yy + '">');
    for(var i = 0; i < graph[axis].freeBlocks; i++) {
      xx = parseInt(Math.random() * (workspace_width - 100), 10),
      yy = parseInt(Math.random() * (workspace_height - 150), 10) + 100;
      $xml.append('<block type="item-' + axis + '" x="' + xx + '" y="' + yy + '">');
    }
    x += 100;
  }

  Blockly.inject(document.getElementById('blocklyDiv'),
      {toolbox: document.getElementById('toolbox')});
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, $xml.get(0));
  Blockly.addChangeListener(onChangeBlock);
}
