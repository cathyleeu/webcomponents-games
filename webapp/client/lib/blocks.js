Blocks = {};

Blocks["start"] = {
  label: "시작하면",
  color: 160,
  previousStatement: false,
  deletable: false,
  movable: false
};
Blocks["move_up"] = {
  label: "위로 이동",
  color: 260,
  img: "/img/up.png",
  command: ["move", "up"]
};
Blocks["move_down"] = {
  label: "아래로 이동",
  color: 260,
  img: "/img/down.png",
  command: ["move", "down"]
};
Blocks["move_left"] = {
  label: "왼쪽으로 이동",
  color: 260,
  img: "/img/left.png",
  command: ["move", "left"]
};
Blocks["move_right"] = {
  label: "오른쪽으로 이동",
  color: 260,
  img: "/img/right.png",
  command: ["move", "right"]
};
Blocks["move_forward"] = {
  label: "앞으로 가기",
  color: 260,
  img: "/img/move_forward.png",
  command: ["move", "forward"]
};
Blocks["jump_forward"] = {
  label: "앞으로 점프",
  color: 120,
  img: "/img/move_forward.png",
  command: ["move", "jump_forward"]
};
Blocks["rotate_left"] = {
  label: "왼쪽으로 돌기",
  color: 260,
  img: "/img/rotate_left.png",
  command: ["rotate", "couter_clock_wise"]
};
Blocks["rotate_right"] = {
  label: "오른쪽으로 돌기",
  color: 260,
  img: "/img/rotate_right.png",
  command: ["rotate", "clock_wise"]
};
Blocks["get_item"] = {
  label: "아이템 가져오기",
  color: 360,
  img: "/img/get_item.png",
  command: ["getItem"]
};
Blocks["use_item"] = {
  label: "아이템 사용하기",
  color: 360,
  img: "/img/map/pick.png",
  command: ["useItem"]
};
Blocks["item_scissors"] = {
  label: "가위",
  color: 260,
  img: "/img/hand_scissors.png",
  command: ["action", "scissors"]
};
Blocks["item_rock"] = {
  label: "바위",
  color: 260,
  img: "/img/hand_rock.png",
  command: ["action", "rock"]
};
Blocks["item_paper"] = {
  label: "보",
  color: 260,
  img: "/img/hand_paper.png",
  command: ["action", "paper"]
};
Blocks["repeat"] = {
  label: "반복",
  color: 30,
  appendField: {
    type: "dropdown",
    name: "count",
    data: [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]
  ,["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]
  },
  appendStatementInput: "statements",
  command: function(block) {
    var count = +block.getFieldValue('count');
    var code = Blockly.JavaScript.statementToCode(block, 'statements');
    return BlockUtils.getScript("repeat", [count, code]);
  }
};
Blocks['repeat_until'] = {
  label: "별에 도달 할때까지 반복",
  color: 30,
  appendStatementInput: "statements",
  command: function(block) {
    var code = Blockly.JavaScript.statementToCode(block, 'statements');
    return BlockUtils.getScript("repeat", ["repeat_until", code]);
  }
};
Blocks['condition_ifMoveForward'] = {
  label: "만약 앞으로 갈 수 있다면",
  color: 0,
  appendStatementInput: "if_statements",
  label2: "갈 수 없다면",
  appendStatementInput2: "else_statements",
  command: function(block) {
    var if_code = Blockly.JavaScript.statementToCode(block, 'if_statements'),
        else_code = Blockly.JavaScript.statementToCode(block, 'else_statements');
    return BlockUtils.getScript("condition", ["if_move_forward", if_code, else_code]);
  }
};
Blocks['condition_ifMoveLeft'] = {
  label: "만약 왼쪽으로 갈 수 있다면",
  color: 0,
  appendStatementInput: "if_statements",
  label2: "갈 수 없다면",
  appendStatementInput2: "else_statements",
  command: function(block) {
    var if_code = Blockly.JavaScript.statementToCode(block, 'if_statements'),
        else_code = Blockly.JavaScript.statementToCode(block, 'else_statements');
    return BlockUtils.getScript("condition", ["if_move_left", if_code, else_code]);
  }
};
Blocks['condition_ifMoveRight'] = {
  label: "만약 오른쪽으로 갈 수 있다면",
  color: 0,
  appendStatementInput: "if_statements",
  label2: "갈 수 없다면",
  appendStatementInput2: "else_statements",
  command: function(block) {
    var if_code = Blockly.JavaScript.statementToCode(block, 'if_statements'),
        else_code = Blockly.JavaScript.statementToCode(block, 'else_statements');
    return BlockUtils.getScript("condition", ["if_move_right", if_code, else_code]);
  }
};
