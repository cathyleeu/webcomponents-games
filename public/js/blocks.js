Blocks = {};

Blocks["start"] = {
  rgbColor: "#FFDE00",
  message0: {
    ko: "%1 시작하면",
    en: "%1 Start",
    cn: "%1 入门"
  },
  args0: [
    {type: "field_image", src: "/img/start.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Start.png"}
  ],
  previousStatement: false
};
Blocks["hello1"] = {
  rgbColor: "#EE4E34",
  message0: {
    ko: "%1 안녕",
    en: "%1 Hello"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/mDown.png"}
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
    {type: "field_image", src: "/img/kidsblocks/mDown.png"}
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
    {type: "field_image", src: "/img/kidsblocks/mDown.png"}
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
    {type: "field_image", src: "/img/kidsblocks/mDown.png"}
  ],
  action: ["hello", "step4"]
};
Blocks["immigrant"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 지구로 이사 가기",
    en: "%1 move to earth."
  },
  args0: [
    {type: "field_image", src: "/img/a3_w3/ufo.png"}
  ],
  action: ["steploop", "immigrant"]
};
Blocks["frog_left"] = {
  rgbColor: "#DC6195",
  message0: {
    ko: "%1 뒷다리가 쏘옥",
    en: "%1 have back legs"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w4/TutoToad2_256.png"}
  ],
  action: ["steploop", "frog_left"]
};
Blocks["frog_up"] = {
  rgbColor: "#E07A2A",
  message0: {
    ko: "%1 앞다리가 쏘옥",
    en: "%1 have front legs"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w4/TutoToad3_256.png"}
  ],
  action: ["steploop", "frog_up"]
};
Blocks["frog_right"] = {
  rgbColor: "#A14289",
  message0: {
    ko: "%1 개구리로 변신",
    en: "%1 becom frog"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w4/frog.png"}
  ],
  action: ["steploop", "frog_right"]
};
Blocks["frog_down"] = {
  rgbColor: "#FBC61D",
  message0: {
    ko: "%1 연잎으로 가기",
    en: "%1 move to lotus."
  },
  args0: [
    {type: "field_image", src: "/img/a5_w4/lotus.png"}
  ],
  action: ["steploop", "frog_down"]
};

Blocks["memi_step1"] = {
  rgbColor: "#67B453",
  message0: {
    ko: "%1 매미알",
    en: "%1 cicada eggs"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w3/bg31_step1.png"}
  ],
  action: ["memigrowing", "memi_step1"]
};
Blocks["memi_step2"] = {
  rgbColor: "#00B1EC",
  message0: {
    ko: "%1 땅 속 애벌레",
    en: "%1 larva under ground"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w3/bg24_step2.png"}
  ],
  action: ["memigrowing", "memi_step2"]
};
Blocks["memi_step3"] = {
  rgbColor: "#E94D96",
  message0: {
    ko: "%1 나무 위 유충",
    en: "%1 larva on the tree"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w3/bg22_step3.png"}
  ],
  action: ["memigrowing", "memi_step3"]
};
Blocks["memi_step4"] = {
  rgbColor: "#A2478C",
  message0: {
    ko: "%1 허물 벗는 매미",
    en: "%1 metamorphosis of cicada"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w3/bg21_step4.png"}
  ],
  action: ["memigrowing", "memi_step4"]
};
Blocks["memi_step5"] = {
  rgbColor: "#FBC61D",
  message0: {
    ko: "%1 매미",
    en: "%1 cicada imago"
  },
  args0: [
    {type: "field_image", src: "/img/a5_w3/bg01_step5.png"}
  ],
  action: ["memigrowing", "memi_step5"]
};

Blocks["ride_right"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 타기",
    en: "%1 ride"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w1/enter.png"}
  ],
  action: ["ride", "right"]
};

Blocks["getout_left"] = {
  rgbColor: "#81CBD8",
  message0: {
    ko: "%1 내리기",
    en: "%1 get out"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w1/exit.png"}
  ],
  action: ["getout", "left"]
};
Blocks["a6w1_carmove"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 차 이동",
    en: "%1 car move"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w1/car.png"}
  ],
  action: ["steploop", "a6w1_move"]
};
Blocks["a6w1_bikemove"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 자전거 이동",
    en: "%1 bike move"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w1/bike.png"}
  ],
  action: ["steploop", "a6w1_move"]
};
Blocks["a6w1_busmove"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 버스 이동",
    en: "%1 bike move"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w1/bus.png"}
  ],
  action: ["steploop", "a6w1_move"]
};
Blocks["a6w1_trainmove"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 기차 이동",
    en: "%1 train move"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w1/train.png"}
  ],
  action: ["steploop", "a6w1_move"]
};
Blocks["a6w1_shipmove"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 배 이동",
    en: "%1 ship move"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w2/ship.png"}
  ],
  action: ["steploop", "a6w1_move"]
};
Blocks["a6w1_airplanemove"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 비행기 이동",
    en: "%1 airplane move"
  },
  args0: [
    {type: "field_image", src: "/img/a6_w2/airplane.png"}
  ],
  action: ["steploop", "a6w1_move"]
};

Blocks["a7w1_corn"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 옥수수 수확",
    en: "%1 corn harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w2/corn0.png"}
  ],
  action: ["harvesting"]
};
Blocks["a7w1_rice"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 벼 수확",
    en: "%1 rice harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w2/rice0.png"}
  ],
  action: ["harvesting"]
};
Blocks["a7w1_apple"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 사과 수확",
    en: "%1 apple harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w2/apple0.png"}
  ],
  action: ["harvesting"]
};
Blocks["a7w1_pear"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 배 수확",
    en: "%1 pear harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w2/pear0.png"}
  ],
  action: ["harvesting"]
};

Blocks["move_up"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 위로 이동",
    en: "%1 Move Up",
    cn: "%1 向上移"
  },
  args0: [
    {type: "field_image", src: "/img/up.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/mUp.png"}
  ],
  action: ["move", "up"]
};
Blocks["move_down"] = {
  rgbColor: "#D9629E",
  message0: {
    ko: "%1 아래로 이동",
    en: "%1 Move Down",
    cn: "%1 向下移"
  },
  args0: [
    {type: "field_image", src: "/img/down.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/mDown.png"}
  ],
  action: ["move", "down"]
};
Blocks["move_left"] = {
  rgbColor: "#60B12F",
  message0: {
    ko: "%1 왼쪽으로 이동",
    en: "%1 Move Left",
    cn: "%1 向左移"
  },
  args0: [
    {type: "field_image", src: "/img/left.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/mLeft.png"}
  ],
  action: ["move", "left"]
};
Blocks["move_right"] = {
  rgbColor: "#34BEEF",
  message0: {
    ko: "%1 오른쪽으로 이동",
    en: "%1 Move Right",
    cn: "%1 向右移"
  },
  args0: [
    {type: "field_image", src: "/img/right.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/mRight.png"}
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
    {type: "field_image", src: "/img/move_forward.png"}
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
    {type: "field_image", src: "/img/move_forward.png"}
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
    {type: "field_image", src: "/img/move_forward.png"}
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
    {type: "field_image", src: "/img/move_forward.png"}
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
    {type: "field_image", src: "/img/move_forward.png"}
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
    {type: "field_image", src: "/img/rotate_left.png"}
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
    {type: "field_image", src: "/img/rotate_right.png"}
  ],
  action: ["rotate", "clock_wise"]
};
Blocks["get_item"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 아이템 가져오기",
    en: "%1 Get Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Bring.png"}
  ],
  action: ["getItem"]
};
Blocks["get_item_notuse"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 아이템 가져오기",
    en: "%1 Get Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Bring.png"}
  ],
  action: ["getItemNotuse"]
};
Blocks["use_item"] = {
  rgbColor: "#81CBD8",
  message0: {
    ko: "%1 아이템 사용하기",
    en: "%1 Use Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Using.png"}
  ],
  action: ["useItem"]
};
Blocks["get_item2"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 아이템 가져오기",
    en: "%1 Get Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Bring.png"}
  ],
  action: ["getItem2"]
};
Blocks["get_item2_split"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 아이템 가져오기",
    en: "%1 Get Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Bring.png"}
  ],
  action: ["getItem2split"]
};
Blocks["use_item2"] = {
  rgbColor: "#81CBD8",
  message0: {
    ko: "%1 아이템 사용하기",
    en: "%1 Use Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Using.png"}
  ],
  action: ["useItem2"]
};
Blocks["get_item3"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 아이템 가져오기",
    en: "%1 Get Item"
  },
  args0: [
    {type: "field_image", src: "/img/get_item.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Bring.png"}
  ],
  action: ["getItem3"]
};
Blocks["check"] = {
  rgbColor: "#6699D0",
  message0: {
    ko: "%1 확인하기",
    en: "%1 Inspect",
    cn: "%1 检查"
  },
  args0: [
    {type: "field_image", src: "/img/check.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/check.png"}
  ],
  action: ["check"]
};
Blocks["check2"] = {
  rgbColor: "#6699D0",
  message0: {
    ko: "%1 확인하기",
    en: "%1 Inspect",
    cn: "%1 检查"
  },
  args0: [
    {type: "field_image", src: "/img/check.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/check.png"}
  ],
  action: ["check2"]
};
Blocks["checkfinish"] = {
  rgbColor: "#6699D0",
  message0: {
    ko: "%1 확인하기",
    en: "%1 Inspect",
    cn: "%1 检查"
  },
  args0: [
    {type: "field_image", src: "/img/check.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/check.png"}
  ],
  action: ["checkfinish"]
};
Blocks["together"] = {
  rgbColor: "#33B1B1",
  message0: {
    ko: "%1 함께가기",
    en: "%1 Together"
  },
  args0: [
    {type: "field_image", src: "/img/cobot/together.png"}
  ],
  action: ["together"]
};
Blocks["support"] = {
  rgbColor: "#6969AE",
  message0: {
    ko: "%1 부축하기",
    en: "%1 Support"
  },
  args0: [
    {type: "field_image", src: "/img/c8_w3/support.png"}
  ],
  action: ["support"]
};
Blocks["present"] = {
  rgbColor: "#33B1B1",
  message0: {
    ko: "%1 선물하기",
    en: "%1 Present"
  },
  args0: [
    {type: "field_image", src: "/img/frog/gift.png"}
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
    {type: "field_image", src: "/img/bomi/trf_rot_green.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/wait.png"}
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
    {type: "field_image", src: "/img/hand_scissors.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Scissors.png"}
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
    {type: "field_image", src: "/img/hand_rock.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Rock.png"}
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
    {type: "field_image", src: "/img/hand_paper.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Paper.png"}
  ],
  action: ["action", "paper"]
};
Blocks["repeat"] = {
  rgbColor: "#242786",
  message0: {
    ko: "반복 %1",
    en: "Repeat %1",
    cn: "重复 %1"
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
  messageh0: "%1 %2 %3",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/Repeat.png"
  }, {
    type: "input_value",
    name: "count"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "count"]
};

Blockly.Blocks['dropdown'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
          ["6", "6"],
          ["7", "7"],
          ["8", "8"],
          ["9", "9"],
          ["10", "10"]
        ]), 'count');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
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
    {type: "field_image", src: "/img/winterspecial/lucks.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/sealion.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/pingping/icehole.png"}
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
    {type: "field_image", src: "/img/up.png"}
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
    {type: "field_image", src: "/img/down.png"}
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
    {type: "field_image", src: "/img/left.png"}
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
    {type: "field_image", src: "/img/right.png"}
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
Blocks['condition_foodget_notuse'] = {
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
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "if_statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/foodexists.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","item_notuse"]
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
    {type: "field_image", src: "/img/bomi/trf_rot_red.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "if_statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/redlight.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","sign"]
};
Blocks['condition_bad'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 만약에 응급 상황이라면",
    en: "If %1 Emergency"
  },
  args0: [
    {type: "field_image", src: "/img/c8_w3/siren.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "if_statements"
  }, {
    type: "field_image",
    src: "/img/c8_w3/siren.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","emergency"]
};
Blocks['condition_notbad'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 만약에 응급 상황이 아니라면",
    en: "If %1 not Emergency"
  },
  args0: [
    {type: "field_image", src: "/img/c8_w3/siren_x.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "if_statements"
  }, {
    type: "field_image",
    src: "/img/c8_w3/siren_x.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","not_emergency"]
};
Blocks['condition_recycle'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 만약에 재활용 가능하다면",
    en: "If %1 recyclable"
  },
  args0: [
    {type: "field_image", src: "/img/c8_w4/recycle.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "if_statements"
  }, {
    type: "field_image",
    src: "/img/c8_w4/recycle.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","recycle"]
};
Blocks['condition_notrecycle'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 만약에 재활용 가능하지 않다면",
    en: "If %1 not recyclable"
  },
  args0: [
    {type: "field_image", src: "/img/c8_w4/recycle_x.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "if_statements"
  }, {
    type: "field_image",
    src: "/img/c8_w4/recycle_x.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","notrecycle"]
};
Blocks['condition2_food_apple'] = {
  rgbColor: "#E11376",
  message0: {
    ko: "%1 이라면",
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "Else",
    cn: "其他"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    en: "If %1",
    cn: "如果 %1"
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
    {type: "field_image", src: "/img/right.png"}
  ],
  action: ["move", "right"]
};
Blocks["move_right2"] = {
  colour: 260,
  message0: "%1 앞으로 2칸 가기",
  args0: [
    {type: "field_image", src: "/img/right.png"}
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
    {type: "field_image", src: "/img/right.png"}
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
    {type: "field_image", src: "/img/right.png"}
  ],
  action: ["func", {
    type: "repeat",
    count: 8,
    statements: {
      type: "move_right"
    }
  }]
};
