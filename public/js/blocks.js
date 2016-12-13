Blocks = {};

Blocks["start"] = {
  rgbColor: "#18BC9C",
  message0: {
    ko: "%1 시작하면",
    en: "%1 Start"
  },
  args0: [
    {type: "field_image", src: "/img/start.png", width: 24, height: 24}
  ],
  previousStatement: false,
  deletable: false,
  movable: false
};
Blocks["hello1"] = {
  rgbColor: "#EE4E34",
  message0: {
    ko: "%1 안녕",
    en: "%1 Hello"
  },
  args0: [
    {type: "field_image", src: "/img/down.png", width: 24, height: 24}
  ],
  action: ["hello", "step1"]
};
Blocks["hello2"] = {
  rgbColor: "#FCAF30",
  message0: {
    ko: "%1 나는",
    en: "%1 I am"
  },
  args0: [
    {type: "field_image", src: "/img/down.png", width: 24, height: 24}
  ],
  action: ["hello", "step2"]
};
Blocks["hello3"] = {
  rgbColor: "#11AF59",
  message0: {
    ko: "%1 코스야",
    en: "%1 Cos."
  },
  args0: [
    {type: "field_image", src: "/img/down.png", width: 24, height: 24}
  ],
  action: ["hello", "step3"]
};
Blocks["hello4"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 반가워",
    en: "%1 Nice to meet you."
  },
  args0: [
    {type: "field_image", src: "/img/down.png", width: 24, height: 24}
  ],
  action: ["hello", "step4"]
};
args0: [
  {type: "field_image", src: "/img/down.png", width: 24, height: 24}
],
Blocks["move_up"] = {
  rgbColor: "#EE4E34",
  message0: {
    ko: "%1 위로 이동",
    en: "%1 Move Up"
  },
  args0: [
    {type: "field_image", src: "/img/up.png", width: 24, height: 24}
  ],
  action: ["move", "up"]
};
Blocks["move_down"] = {
  rgbColor: "#E5DA58",
  message0: {
    ko: "%1 아래로 이동",
    en: "%1 Move Down"
  },
  args0: [
    {type: "field_image", src: "/img/down.png", width: 24, height: 24}
  ],
  action: ["move", "down"]
};
Blocks["move_left"] = {
  rgbColor: "#359CC9",
  message0: {
    ko: "%1 왼쪽으로 이동",
    en: "%1 Move Left"
  },
  args0: [
    {type: "field_image", src: "/img/left.png", width: 24, height: 24}
  ],
  action: ["move", "left"]
};
Blocks["move_right"] = {
  rgbColor: "#83B359",
  message0: {
    ko: "%1 오른쪽으로 이동",
    en: "%1 Move Right"
  },
  args0: [
    {type: "field_image", src: "/img/right.png", width: 24, height: 24}
  ],
  action: ["move", "right"]
};
Blocks["move_forward"] = {
  colour: 260,
  message0: {
    ko: "%1 앞으로 가기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/move_forward.png", width: 24, height: 24}
  ],
  action: ["move", "forward"]
};
Blocks["jump_forward"] = {
  colour: 120,
  message0: {
    ko: "%1 앞으로 점프",
    en: "%1 Jump Forward"
  },
  args0: [
    {type: "field_image", src: "/img/move_forward.png", width: 24, height: 24}
  ],
  action: ["move", "jump_forward"]
};
Blocks["move_forward2"] = {
  colour: 260,
  message0: {
    ko: "%1 앞으로 2칸 가기",
    en: "%1 Move Forward Twice"
  },
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
  message0: {
    ko: "%1 앞으로 3칸 가기",
    en: "%1 Move Forward Three Times"
  },
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
  message0: {
    ko: "%1 앞으로 4칸 가기",
    en: "%1 Move Forward Four Times"
  },
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
  message0: {
    ko: "%1 왼쪽으로 돌기",
    en: "%1 Turn Left"
  },
  args0: [
    {type: "field_image", src: "/img/rotate_left.png", width: 24, height: 24}
  ],
  action: ["rotate", "couter_clock_wise"]
};
Blocks["rotate_right"] = {
  colour: 120,
  message0: {
    ko: "%1 오른쪽으로 돌기",
    en: "%1 Turn Right"
  },
  args0: [
    {type: "field_image", src: "/img/rotate_right.png", width: 24, height: 24}
  ],
  action: ["rotate", "clock_wise"]
};
Blocks["get_item"] = {
  rgbColor: "#9C1881",
  message0: {
    ko: "%1 아이템 가져오기",
    en: "%1 Get Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png", width: 24, height: 24}
  ],
  action: ["getItem"]
};
Blocks["use_item"] = {
  rgbColor: "#ED95AE",
  message0: {
    ko: "%1 아이템 사용하기",
    en: "%1 Use Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png", width: 24, height: 24}
  ],
  action: ["useItem"]
};
Blocks["get_item2"] = {
  rgbColor: "#9C1881",
  message0: "%1 아이템 가져오기",
  args0: [
    {type: "field_image", src: "/img/get_item.png", width: 24, height: 24}
  ],
  action: ["getItem2"]
};
Blocks["use_item2"] = {
  rgbColor: "#ED95AE",
  message0: "%1 아이템 사용하기",
  args0: [
    {type: "field_image", src: "/img/get_item.png", width: 24, height: 24}
  ],
  action: ["useItem2"]
};
Blocks["check"] = {
  rgbColor: "#33B1B1",
  message0: {
    ko: "%1 확인하기",
    en: "%1 Inspect"
  },
  args0: [
    {type: "field_image", src: "/img/check.png", width: 24, height: 24}
  ],
  action: ["check"]
};
Blocks["check2"] = {
  rgbColor: "#33B1B1",
  message0: {
    ko: "%1 확인하기",
    en: "%1 Inspect"
  },
  args0: [
    {type: "field_image", src: "/img/check.png", width: 24, height: 24}
  ],
  action: ["check2"]
};
Blocks["together"] = {
  rgbColor: "#33B1B1",
  message0: {
    ko: "%1 함께가기",
    en: "%1 Together"
  },
  args0: [
    {type: "field_image", src: "/img/cobot/together.png", width: 24, height: 24}
  ],
  action: ["together"]
};
Blocks["present"] = {
  rgbColor: "#33B1B1",
  message0: {
    ko: "%1 선물하기",
    en: "%1 Present"
  },
  args0: [
    {type: "field_image", src: "/img/frog/gift.png", width: 24, height: 24}
  ],
  action: ["present"]
};
Blocks["wait"] = {
  rgbColor: "#8D69AE",
  message0: {
    ko: "%1 초록 불까지 기다리기",
    en: "%1 Wait for Green Light"
  },
  args0: [
    {type: "field_image", src: "/img/bomi/trf_rot_green.png", width: 24, height: 24}
  ],
  action: ["wait"]
};
Blocks["item_scissors"] = {
  rgbColor: "#8C68AD",
  message0: {
    ko: "%1 가위",
    en: "%1 Scissors"
  },
  args0: [
    {type: "field_image", src: "/img/hand_scissors.png", width: 24, height: 24}
  ],
  action: ["action", "scissors"]
};
Blocks["item_rock"] = {
  rgbColor: "#8C68AD",
  message0: {
    ko: "%1 바위",
    en: "%1 Rock"
  },
  args0: [
    {type: "field_image", src: "/img/hand_rock.png", width: 24, height: 24}
  ],
  action: ["action", "rock"]
};
Blocks["item_paper"] = {
  rgbColor: "#8C68AD",
  message0: {
    ko: "%1 보",
    en: "%1 Paper"
  },
  args0: [
    {type: "field_image", src: "/img/hand_paper.png", width: 24, height: 24}
  ],
  action: ["action", "paper"]
};
Blocks["repeat"] = {
  rgbColor: "#242786",
  message0: {
    ko: "반복 %1",
    en: "Repeat %1"
  },
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
  rgbColor: "#242786",
  message0: {
    ko: "별에 도달 할때까지 반복",
    en: "Repeat Until"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat", "repeat_until"]
};
Blocks['condition_ifMoveForward'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "만약 앞으로 갈 수 있다면",
    en: "If Move Forward"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "갈 수 없다면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition", "if_move_forward"]
};
Blocks['condition_ifMoveLeft'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "만약 왼쪽으로 갈 수 있다면",
    en: "If Move Left"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "갈 수 없다면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition", "if_move_left"]
};
Blocks['condition_ifMoveRight'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "만약 오른쪽으로 갈 수 있다면",
    en: "If Move Right"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "갈 수 없다면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition", "if_move_right"]
};
Blocks['repeat_until_pongpong'] = {
  rgbColor: "#242786",
  message0: {
    ko: "퐁퐁이를 만날 때까지 반복",
    en: "Repeat Until meeting Pongpong"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_friend'] = {
  rgbColor: "#242786",
  message0: {
    ko: "친구들를 만날 때까지 반복",
    en: "Repeat Until meeting friend"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_bok'] = {
  rgbColor: "#242786",
  message0: {
    ko: "%1 갈 때까지 반복",
    en: "Repeat Until meeting luckky poket"
  },
  args0: [
    {type: "field_image", src: "/img/winterspecial/lucks.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat", "repeat_until"]
};
Blocks['condition_ifsealion_up'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "위에 %1 O 라면",
    en: "If up-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "위에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_up"]
};
Blocks['condition_ifsealion_down'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "아래에 %1 O 라면",
    en: "If down-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아래에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_down"]
};
Blocks['condition_ifsealion_left'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "왼쪽에 %1 O 라면",
    en: "If left-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "왼쪽에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_left"]
};
Blocks['condition_ifsealion_right'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "오른쪽에 %1 O 라면",
    en: "If right-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "오른쪽에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/sealion.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_right"]
};
Blocks['condition_ificehole_up'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "위에 %1 O 라면",
    en: "If up-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "위에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_up"]
};
Blocks['condition_ificehole_down'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "아래에 %1 O 라면",
    en: "If down-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아래에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_down"]
};
Blocks['condition_ificehole_left'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "왼쪽에 %1 O 라면",
    en: "If left-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "왼쪽에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_left"]
};
Blocks['condition_ificehole_right'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "오른쪽에 %1 O 라면",
    en: "If right-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "오른쪽에 %1 X 라면",
    en: "Else"
  },
  args2: [
    {type: "field_image", src: "/img/pingping/icehole.png", width: 24, height: 24}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_right"]
};
Blocks['condition_ifblock_up'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 막혀있다면",
    en: "If right-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/up.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_up"]
};
Blocks['condition_ifblock_down'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 막혀있다면",
    en: "If right-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/down.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_down"]
};
Blocks['condition_ifblock_left'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 막혀있다면",
    en: "If right-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/left.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_left"]
};
Blocks['condition_ifblock_right'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 막혀있다면",
    en: "If right-side %1 O"
  },
  args0: [
    {type: "field_image", src: "/img/right.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["condition_nodirentio", "no_right"]
};
Blocks['condition_foodget'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "먹이가 나오면",
    en: "If There is Food"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  action: ["conditioncheck","tile"]
};
Blocks['condition_fooduse'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "먹이가 있으면",
    en: "If Have Food"
  },
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  action: ["conditioncheck","character"]
};
Blocks['condition_light'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 만약에 빨간 불이라면",
    en: "If %1 is red light"
  },
  args0: [
    {type: "field_image", src: "/img/bomi/trf_rot_red.png", width: 24, height: 24}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  action: ["conditioncheck","sign"]
};
Blocks['condition2_food_apple'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/apple.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_food_bam'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/bam.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_food_gam'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/gam.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_food_pear'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/pear.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_food_pumpkin'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/pumpkin.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_food_seed'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/seed.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_food_walnut'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/walnut.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_food_wandu'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/wandu.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_direction_up'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "안전한 길이 %1 라면",
    en: "If %1 is safe road"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/b_up.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","direction_up"]
};
Blocks['condition2_direction_down'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 안전한 길이라면",
    en: "If %1 is safe road"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/b_down.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","direction_down"]
};
Blocks['condition2_direction_left'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 안전한 길이라면",
    en: "If %1 is safe road"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/b_left.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","direction_left"]
};
Blocks['condition2_direction_right'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 안전한 길이라면",
    en: "If %1 is safe road"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/b_right.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","direction_right"]
};
Blocks['condition2_itemfood_apple'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/apple.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemfood_bam'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/bam.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemfood_gam'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/gam.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemfood_pear'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/pear.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemfood_pumpkin'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/pumpkin.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemfood_seed'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/seed.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemfood_walnut'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/walnut.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemfood_wandu'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/jsparrow/wandu.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemfood"]
};
Blocks['condition2_itemkey_circle'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/bomi/circle_key.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemkey"]
};
Blocks['condition2_itemkey_rectangle'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/bomi/rectangle_key.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemkey"]
};
Blocks['condition2_itemkey_triangle'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/bomi/triangle_key.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "아니라면",
    en: "Else"
  },
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","itemkey"]
};
Blocks['condition3_trash'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/cobot/can.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/cobot/paper.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/cobot/bottle.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","trash"]
};
Blocks['condition2_hanbok'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/winterspecial/hanbok_boy.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/winterspecial/hanbok_girl.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","food"]
};
Blocks['condition2_guide_tr'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/cobot/toilet.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/cobot/restaurant.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","guide"]
};
Blocks['condition2_guide_rm'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/cobot/restaurant.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/cobot/machine.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","guide"]
};
Blocks['condition2_guide_tm'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/cobot/toilet.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/cobot/machine.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","guide"]
};
Blocks['condition3_guide'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/cobot/toilet.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/cobot/restaurant.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/cobot/machine.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","guide"]
};
Blocks['condition3_aClock123'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0100.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0200.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0300.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock789'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0700.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0800.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0900.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock148'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0100.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0400.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0800.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock679'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0600.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0700.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0900.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock589'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0500.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0800.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0900.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock379'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0300.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0700.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0900.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock468'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0400.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0600.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0800.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock136'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0100.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0300.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0600.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock235'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0200.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0300.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0500.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock167'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0100.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0600.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0700.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock359'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0300.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0500.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0900.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock478'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0400.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0700.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0800.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock149'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0100.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0400.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0900.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};
Blocks['condition3_aClock348'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/a0300.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/a0400.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/a0800.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","aClock"]
};

Blocks['condition3_dClock'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 ~ %2 이라면 %3",
    en: "If %1 ~ %2 %3"
  },
  args0: [
    {type: "field_image", src: "/img/rudolph/d1200.png", width: 30, height: 30},
    {type: "field_image", src: "/img/rudolph/d0130.png", width: 30, height: 30},
    {type: "field_image", src: "/img/rudolph/house_r.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 ~ %2 이라면 %3",
    en: "If %1 ~ %2 %3"
  },
  args2: [
    {type: "field_image", src: "/img/rudolph/d0200.png", width: 30, height: 30},
    {type: "field_image", src: "/img/rudolph/d0330.png", width: 30, height: 30},
    {type: "field_image", src: "/img/rudolph/house_g.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 ~ %2 이라면 %3",
    en: "If %1 ~ %2 %3"
  },
  args4: [
    {type: "field_image", src: "/img/rudolph/d0400.png", width: 30, height: 30},
    {type: "field_image", src: "/img/rudolph/d0600.png", width: 30, height: 30},
    {type: "field_image", src: "/img/rudolph/house_y.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","dClock"]
};
Blocks['condition3_rsp'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/hand_rock.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/hand_scissors.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/hand_paper.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","rsp"]
};
Blocks['condition3_bok'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args0: [
    {type: "field_image", src: "/img/winterspecial/luck_o.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args2: [
    {type: "field_image", src: "/img/winterspecial/luck_sqr.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "%1 이라면",
    en: "If %1"
  },
  args4: [
    {type: "field_image", src: "/img/winterspecial/luck_tri.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","bok"]
};
Blocks["move_right1"] = {
  colour: 260,
  message0: "%1 앞으로 1칸 가기",
  args0: [
    {type: "field_image", src: "/img/right.png", width: 24, height: 24}
  ],
  action: ["move", "right"]
};
Blocks["move_right2"] = {
  colour: 260,
  message0: "%1 앞으로 2칸 가기",
  args0: [
    {type: "field_image", src: "/img/right.png", width: 24, height: 24}
  ],
  action: ["func", {
    type: "repeat",
    count: 2,
    statements: {
      type: "move_right"
    }
  }]
};
Blocks["move_right4"] = {
  colour: 260,
  message0: "%1 앞으로 4칸 가기",
  args0: [
    {type: "field_image", src: "/img/right.png", width: 24, height: 24}
  ],
  action: ["func", {
    type: "repeat",
    count: 4,
    statements: {
      type: "move_right"
    }
  }]
};
Blocks["move_right8"] = {
  colour: 260,
  message0: "%1 앞으로 8칸 가기",
  args0: [
    {type: "field_image", src: "/img/right.png", width: 24, height: 24}
  ],
  action: ["func", {
    type: "repeat",
    count: 8,
    statements: {
      type: "move_right"
    }
  }]
};
