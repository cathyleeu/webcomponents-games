Blocks = {};

Blocks["start"] = {
  colour: 160,
  message0: "시작하면",
  previousStatement: false,
  deletable: false,
  movable: false
};
Blocks["move_up"] = {
  colour: 0,
  message0: "%1 위로 이동",
  args0: [
    {type: "field_image", src: "/img/up.png", width: 24, height: 24}
  ],
  action: ["move", "up"]
};
Blocks["move_down"] = {
  colour: 30,
  message0: "%1 아래로 이동",
  args0: [
    {type: "field_image", src: "/img/down.png", width: 24, height: 24}
  ],
  action: ["move", "down"]
};
Blocks["move_left"] = {
  colour: 60,
  message0: "%1 왼쪽으로 이동",
  args0: [
    {type: "field_image", src: "/img/left.png", width: 24, height: 24}
  ],
  action: ["move", "left"]
};
Blocks["move_right"] = {
  colour: 90,
  message0: "%1 오른쪽으로 이동",
  args0: [
    {type: "field_image", src: "/img/right.png", width: 24, height: 24}
  ],
  action: ["move", "right"]
};
Blocks["move_forward"] = {
  colour: 260,
  message0: "%1 앞으로 가기",
  args0: [
    {type: "field_image", src: "/img/move_forward.png", width: 24, height: 24}
  ],
  action: ["move", "forward"]
};
Blocks["%1 jump_forward"] = {
  colour: 120,
  message0: "%1 앞으로 점프",
  args0: [
    {type: "field_image", src: "/img/move_forward.png", width: 24, height: 24}
  ],
  action: ["move", "jump_forward"]
};
Blocks["move_forward2"] = {
  colour: 260,
  message0: "%1 앞으로 2칸 가기",
  args0: [
    {type: "field_image", src: "/img/move_forward.png", width: 24, height: 24}
  ],
  action: ["func", {
    type: "repeat",
    count: 2,
    statements: {
      type: "move_forward"
    }
  }]
};
Blocks["move_forward3"] = {
  colour: 260,
  message0: "%1 앞으로 3칸 가기",
  args0: [
    {type: "field_image", src: "/img/move_forward.png", width: 24, height: 24}
  ],
  action: ["func", {
    type: "repeat",
    count: 3,
    statements: {
      type: "move_forward"
    }
  }]
};
Blocks["move_forward4"] = {
  colour: 260,
  message0: "%1 앞으로 4칸 가기",
  args0: [
    {type: "field_image", src: "/img/move_forward.png", width: 24, height: 24}
  ],
  action: ["func", {
    type: "repeat",
    count: 4,
    statements: {
      type: "move_forward"
    }
  }]
};
Blocks["rotate_left"] = {
  colour: 90,
  message0: "%1 왼쪽으로 돌기",
  args0: [
    {type: "field_image", src: "/img/rotate_left.png", width: 24, height: 24}
  ],
  action: ["rotate", "couter_clock_wise"]
};
Blocks["rotate_right"] = {
  colour: 120,
  message0: "%1 오른쪽으로 돌기",
  args0: [
    {type: "field_image", src: "/img/rotate_right.png", width: 24, height: 24}
  ],
  action: ["rotate", "clock_wise"]
};
Blocks["get_item"] = {
  colour: 360,
  message0: "%1 아이템 가져오기",
  args0: [
    {type: "field_image", src: "/img/get_item.png", width: 24, height: 24}
  ],
  action: ["getItem"]
};
Blocks["use_item"] = {
  colour: 220,
  message0: "%1 아이템 사용하기",
  args0: [
    {type: "field_image", src: "/img/get_item.png", width: 24, height: 24}
  ],
  action: ["useItem"]
};
Blocks["item_scissors"] = {
  colour: 260,
  message0: "%1 가위",
  args0: [
    {type: "field_image", src: "/img/hand_scissors.png", width: 24, height: 24}
  ],
  action: ["action", "scissors"]
};
Blocks["item_rock"] = {
  colour: 260,
  message0: "%1 바위",
  args0: [
    {type: "field_image", src: "/img/hand_rock.png", width: 24, height: 24}
  ],
  action: ["action", "rock"]
};
Blocks["item_paper"] = {
  colour: 260,
  message0: "%1 보",
  args0: [
    {type: "field_image", src: "/img/hand_paper.png", width: 24, height: 24}
  ],
  action: ["action", "paper"]
};
Blocks["repeat"] = {
  colour: 30,
  message0: "반복 %1",
  args0: [{
    type: "field_dropdown",
    name: "count",
    options: [
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"],
      ["10", "10"]
    ]
  }],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat", "count"]
};
Blocks['repeat_until'] = {
  colour: 30,
  message0: "별에 도달 할때까지 반복",
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat", "repeat_until"]
};
Blocks['condition_ifMoveForward'] = {
  colour: 0,
  message0: "만약 앞으로 갈 수 있다면",
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: "갈 수 없다면",
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition", "if_move_forward"]
};
Blocks['condition_ifMoveLeft'] = {
  colour: 0,
  message0: "만약 왼쪽으로 갈 수 있다면",
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: "갈 수 없다면",
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition", "if_move_left"]
};
Blocks['condition_ifMoveRight'] = {
  colour: 0,
  message0: "만약 오른쪽으로 갈 수 있다면",
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: "갈 수 없다면",
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition", "if_move_right"]
};
