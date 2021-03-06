Blocks = {};

Blocks["start"] = {
  rgbColor: "#FFDE00",
  message0: {
    ko: "%1 시작하면",
    en: "%1 Start",
    cn: "%1 入门"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/Start.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Start.png", width: 32, height: 32}
  ],
  deletable: false,
  movable: false,
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
// Blocks["press"] = {
//   rgbColor: "#FFDE00",
//   message0: {
//     ko: "%1 누르면"
//   },
//   args0: [
//     {type: "field_image", src: "/img/start.png"}
//   ],
//   previousStatement: false
// };
Blocks["channel"] = {
  rgbColor: "#EE4E34",
  message0: {
    ko: "채널 돌리기"
  },
  args0: [

  ],
  action: ["hello", "step1"]
};
Blocks["move_to_floor"] = {
  rgbColor: "#FCAF30",
  message0: {
    ko: "7층으로 이동하기"
  },
  args0: [
  ],
  action: ["hello", "step2"]
};
Blocks["beverage"] = {
  rgbColor: "#11AF59",
  message0: {
    ko: "음료 꺼내기"
  },
  args0: [
  ],
  action: ["hello", "step3"]
};
Blocks["washing"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "세탁물 3번 헹구기"
  },
  args0: [
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
Blocks["go_bakery"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 빵집으로 가기",
    en: "%1 move to bakery."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/bakery.png"}
  ],
  action: ["steploop", "ddddddl"]
};
Blocks["go_hospital"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 병원으로 가기",
    en: "%1 move to hospital."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/hospital.png"}
  ],
  action: ["steploop", "ddddrrrru"]
};
Blocks["go_kindergarten"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 유치원으로 가기",
    en: "%1 move to kindergarden."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/kindergarten.png"}
  ],
  action: ["steploop", "ddddrrrrruuuul"]
};
Blocks["go_mart"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 마트로 가기",
    en: "%1 move to mart."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/mart.png"}
  ],
  action: ["steploop", "dddddr"]
};
Blocks["go_movie"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 극장으로 가기",
    en: "%1 move to theater."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/movie.png"}
  ],
  action: ["steploop", "ddddrrrrrr"]
};
Blocks["go_playground"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 놀이터로 가기",
    en: "%1 move to playground."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/playground.png"}
  ],
  action: ["steploop", "dddl"]
};
Blocks["go_school"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 학교로 가기",
    en: "%1 move to school."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/school.png"}
  ],
  action: ["steploop", "ddddrrrrrddr"]
};
Blocks["go_servicecenter"] = {
  rgbColor: "#00A1E1",
  message0: {
    ko: "%1 주민센터로 가기",
    en: "%1 move to servicecenter."
  },
  args0: [
    {type: "field_image", src: "/img/a4re_w1/servicecenter.png"}
  ],
  action: ["steploop", "ddddrrrrruuur"]
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
    {type: "field_image", src: "/img/a7_w3/corn0.png"}
  ],
  action: ["harvesting","type1"]
};
Blocks["a7w1_corn2"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 옥수수 수확",
    en: "%1 corn harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/corn0.png"}
  ],
  action: ["harvesting","type2"]
};
Blocks["a7w1_rice"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 벼 수확",
    en: "%1 rice harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/rice0.png"}
  ],
  action: ["harvesting","type1"]
};
Blocks["a7w1_rice2"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 벼 수확",
    en: "%1 rice harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/rice0.png"}
  ],
  action: ["harvesting","type2"]
};
Blocks["a7w1_rice3"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 벼 수확",
    en: "%1 rice harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/rice0.png"}
  ],
  action: ["harvesting","type3"]
};
Blocks["a7w1_apple"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 사과 수확",
    en: "%1 apple harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/apple0.png"}
  ],
  action: ["harvesting","type1"]
};
Blocks["a7w1_apple2"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 사과 수확",
    en: "%1 apple harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/apple0.png"}
  ],
  action: ["harvesting","type2"]
};
Blocks["a7w1_apple3"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 사과 수확",
    en: "%1 apple harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/apple0.png"}
  ],
  action: ["harvesting","type3"]
};
Blocks["a7w1_pear"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 배 수확",
    en: "%1 pear harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/pear0.png"}
  ],
  action: ["harvesting","type1"]
};
Blocks["a7w1_pear2"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 배 수확",
    en: "%1 pear harvest"
  },
  args0: [
    {type: "field_image", src: "/img/a7_w3/pear0.png"}
  ],
  action: ["harvesting","type2"]
};
Blocks["go_cloud"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 구름이 되기",
    en: "%1 become cloud"
  },
  args0: [
    {type: "field_image", src: "/img/a8/cloud.png"}
  ],
  action: ["steploop", "go_cloud"]
};
Blocks["go_rain"] = {
  rgbColor: "#D9629E",
  message0: {
    ko: "%1 비가 되기",
    en: "%1 become rain"
  },
  args0: [
    {type: "field_image", src: "/img/a8/rain.png"}
  ],
  action: ["steploop", "go_rain"]
};
Blocks["go_snow"] = {
  rgbColor: "#D9629E",
  message0: {
    ko: "%1 눈이 되기",
    en: "%1 become snow"
  },
  args0: [
    {type: "field_image", src: "/img/a8/snow.png"}
  ],
  action: ["steploop", "go_snow"]
};
Blocks["go_valley"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 계곡으로 가기",
    en: "%1 Go valley"
  },
  args0: [
    {type: "field_image", src: "/img/a8/valley.png"}
  ],
  action: ["steploop", "go_valley"]
};
Blocks["go_lake"] = {
  rgbColor: "#D9629E",
  message0: {
    ko: "%1 호수로 가기",
    en: "%1 Go lake"
  },
  args0: [
    {type: "field_image", src: "/img/a8/lake.png"}
  ],
  action: ["steploop", "go_lake"]
};
Blocks["go_river"] = {
  rgbColor: "#60B12F",
  message0: {
    ko: "%1 강으로 가기",
    en: "%1 Go river"
  },
  args0: [
    {type: "field_image", src: "/img/a8/river.png"}
  ],
  action: ["steploop", "go_river"]
};
Blocks["go_under"] = {
  rgbColor: "#34BEEF",
  message0: {
    ko: "%1 지하로 가기",
    en: "%1 Go ungerground"
  },
  args0: [
    {type: "field_image", src: "/img/a8/under.png"}
  ],
  action: ["steploop", "go_under"]
};
Blocks["go_sea1"] = {
  rgbColor: "#A14289",
  message0: {
    ko: "%1 바다로 가기",
    en: "%1 Go sea"
  },
  args0: [
    {type: "field_image", src: "/img/a8/sea.png"}
  ],
  action: ["steploop", "go_sea1"]
};
Blocks["go_sea2"] = {
  rgbColor: "#A14289",
  message0: {
    ko: "%1 바다로 가기",
    en: "%1 Go sea"
  },
  args0: [
    {type: "field_image", src: "/img/a8/sea.png"}
  ],
  action: ["steploop", "go_sea2"]
};
Blocks["go_sea3"] = {
  rgbColor: "#A14289",
  message0: {
    ko: "%1 바다로 가기",
    en: "%1 Go sea"
  },
  args0: [
    {type: "field_image", src: "/img/a8/sea.png"}
  ],
  action: ["steploop", "go_sea3"]
};

Blocks["go_filter"] = {
  rgbColor: "#FF0000",
  message0: {
    ko: "%1 정수장으로",
    en: "%1 to purification plant"
  },
  args0: [
    {type: "field_image", src: "/img/a8/filter.png"}
  ],
  action: ["steploop", "go_filter"]
};

Blocks["go_house"] = {
  rgbColor: "#FFA500",
  message0: {
    ko: "%1 정수장으로",
    en: "%1 to purification plant"
  },
  args0: [
    {type: "field_image", src: "/img/a8/house.png"}
  ],
  action: ["steploop", "frog_up"]
};

Blocks["go_sewage"] = {
  rgbColor: "#008000",
  message0: {
    ko: "%1 정수장으로",
    en: "%1 to purification plant"
  },
  args0: [
    {type: "field_image", src: "/img/a8/sewage.png"}
  ],
  action: ["steploop", "go_sewage"]
};

Blocks["go_dam"] = {
  rgbColor: "#0000FF",
  message0: {
    ko: "%1 정수장으로",
    en: "%1 to purification plant"
  },
  args0: [
    {type: "field_image", src: "/img/a8/dam.png"}
  ],
  action: ["steploop", "go_dam"]
};

Blocks["go_dam_1"] = {
  rgbColor: "#0000FF",
  message0: {
    ko: "%1 정수장으로",
    en: "%1 to purification plant"
  },
  args0: [
    {type: "field_image", src: "/img/a8/dam.png"}
  ],
  action: ["steploop", "go_dam_1"]
};

Blocks["move_up"] = {
  rgbColor: "#F28C00",
  message0: {
    ko: "%1 위로 이동",
    en: "%1 Move Up",
    cn: "%1 向上移"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg", width: 36, height: 36}
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
    {type: "field_image", src: "/img/kidsblocks/down_icon.svg"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/down_icon.svg", width: 36, height: 36}
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
    {type: "field_image", src: "/img/kidsblocks/left_icon.svg"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/left_icon.svg", width: 36, height: 36}
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
    {type: "field_image", src: "/img/kidsblocks/right_icon.svg"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/right_icon.svg", width: 36, height: 36}
  ],
  action: ["move", "right"]
};
Blocks["one_digit"] = {
  colour: 230,
  eventType: "fillColor",
  message0: {
    ko: "일의자리 더하기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/move_forward.png"}
  ],
  action: ["move", "forward"]
};
Blocks["ten_digit"] = {
  colour: 260,
  eventType: "fillColor",
  message0: {
    ko: "십의자리 더하기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/move_forward.png"}
  ],
  action: ["move", "forward"]
};
Blocks["hundred_digit"] = {
  colour: 290,
  eventType: "fillColor",
  message0: {
    ko: "백의자리 더하기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/move_forward.png"}
  ],
  action: ["move", "forward"]
};
Blocks["sum_digit"] = {
  colour: "#60B12F",
  message0: {
    ko: "받아올림 %1 , %2 쓰기",
    en: ""
  },
  args0: [{
    type: "field_dropdown",
    name: "countMode",
    options: [
      ["하고", "true"],
      ["안하고", "false"]
    ]
  },{
    type: "field_dropdown",
    name: "countOptions",
    options: [
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"]
    ]
  }],
  action: ["count"]
  // action: ["func", {
  //   type: "repeat",
  //   count: "@count",
  //   statements: {
  //     type: "move_forward1"
  //   }
  // }]
};
Blocks["sub_digit"] = {
  colour: "#60B12F",
  message0: {
    ko: "받아내림 %1 , %2 쓰기",
    en: ""
  },
  args0: [{
    type: "field_dropdown",
    name: "countMode",
    options: [
      ["하고", "true"],
      ["안하고", "false"]
    ]
  },{
    type: "field_dropdown",
    name: "countOptions",
    options: [
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"]
    ]
  }],
  action: ["count"]
  // action: ["func", {
  //   type: "repeat",
  //   count: "@count",
  //   statements: {
  //     type: "move_forward1"
  //   }
  // }]
};
Blocks["move_forward1"] = {
  colour: "#F28C00",
  message0: {
    ko: "%1 앞으로 가기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["move", "forward"]
};
Blocks["move_forward1_binary"] = {
  colour: "#F28C00",
  message0: {
    ko: "%1 앞으로 1칸 가기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["func", {
   type: "repeat",
   count: 1,
   statements: {
     type: "move_forward1"
   }
 }]
};
Blocks["move_forward2_binary"] = {
  colour: "#F28C00",
  message0: {
    ko: "%1 앞으로 2칸 가기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["func", {
   type: "repeat",
   count: 2,
   statements: {
     type: "move_forward1"
   }
 }]
};
Blocks["move_forward4_binary"] = {
  colour: "#F28C00",
  message0: {
    ko: "%1 앞으로 4칸 가기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["func", {
   type: "repeat",
   count: 4,
   statements: {
     type: "move_forward1"
   }
  }]
};
Blocks["move_forward8_binary"] = {
  colour: "#F28C00",
  message0: {
    ko: "%1 앞으로 8칸 가기",
    en: "%1 Move Forward"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["func", {
   type: "repeat",
   count: 8,
   statements: {
     type: "move_forward1"
   }
 }]
};
Blocks["move_forward"] = {
  colour: 260,
  message0: {
    ko: "%1 %2 만큼 움직이기",
    en: "%1 %2 Move Forward"
  },
  args0: [{
    type: "field_image",
    src: "/img/move_forward.png"
  }, {
    type: "field_dropdown",
    name: "count",
    options: [
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"]
    ]
  }],
  action: ["func", {
    type: "repeat",
    count: "@count",
    statements: {
      type: "move_forward1"
    }
  }]
};

Blocks["jump_forward"] = {
  colour: 120,
  message0: {
    ko: "%1 앞으로 점프",
    en: "%1 Jump Forward"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
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
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["func", {
    type: "repeat",
    count: 2,
    statements: {
      type: "move_forward1"
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
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["func", {
    type: "repeat",
    count: 3,
    statements: {
      type: "move_forward1"
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
    {type: "field_image", src: "/img/kidsblocks/up_icon.svg"}
  ],
  action: ["func", {
    type: "repeat",
    count: 4,
    statements: {
      type: "move_forward1"
    }
  }]
};
Blocks["empty"] = {
  rgbColor: "#CCCCCC",
  message0: {
    ko: "%1",
    en: "%1"
  },
  args0: [
    {
      type: "field_dropdown",
      name: "count",
      options: [
        ["", ""],
      ]
    }
  ],
  action: ["", ""]
};
Blocks["rotate_left"] = {
  colour: "#60B12F",
  message0: {
    ko: "%1 왼쪽으로 돌기",
    en: "%1 Turn Left"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/left_turn_icon.svg"}
  ],
  action: ["rotate", "couter_clock_wise"]
};
Blocks["rotate_right"] = {
  colour: "#34BEEF",
  message0: {
    ko: "%1 오른쪽으로 돌기",
    en: "%1 Turn Right"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/right_turn_icon.svg"}
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
    {type: "field_image", src: "/img/kidsblocks/take.svg"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Bring.png"}
  ],
  action: ["getItem"]
};
Blocks["get_items"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 %2 개 아이템 가져오기",
    en: "%1 Get %2 Item(s)"
  },
  args0: [{
    type: "field_image",
    src: "/img/get_item.png"
  }, {
    type: "field_dropdown",
    name: "count",
    options: [
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"]
    ]
  }],
  action: ["func", {
    type: "repeat",
    count: "@count",
    statements: {
      type: "get_item"
    }
  }]
};
Blocks["get_item_notuse"] = {
  rgbColor: "#E75051",
  message0: {
    ko: "%1 아이템 가져오기",
    en: "%1 Get Item"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/take.svg"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Bring.png"}
  ],
  action: ["getItemNotuse"]
};
Blocks["use_items"] = {
  rgbColor: "#81CBD8",
  message0: {
    ko: "%1 %2 개 아이템 사용하기",
    en: "%1 Use %2 Item(s)"
  },
  args0: [{
    type: "field_image",
    src: "/img/get_item.png"
  }, {
    type: "field_dropdown",
    name: "count",
    options: [
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"]
    ]
  }],
  action: ["func", {
    type: "repeat",
    count: "@count",
    statements: {
      type: "use_item"
    }
  }]
};
Blocks["use_item"] = {
  rgbColor: "#81CBD8",
  message0: {
    ko: "%1 아이템 사용하기",
    en: "%1 Use Item"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/use.svg"}
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
    {type: "field_image", src: "/img/kidsblocks/take.svg"}
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
    {type: "field_image", src: "/img/kidsblocks/take.svg"}
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
    {type: "field_image", src: "/img/kidsblocks/use.svg"}
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
    {type: "field_image", src: "/img/kidsblocks/take.svg"}
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
    {type: "field_image", src: "/img/kidsblocks/check.png"}
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
    {type: "field_image", src: "/img/kidsblocks/check.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/check.png"}
  ],
  action: ["check2"]
};
Blocks["check_multi"] = {
  rgbColor: "#6699D0",
  message0: {
    ko: "%1 확인하기",
    en: "%1 Inspect",
    cn: "%1 检查"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/check.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/check.png"}
  ],
  action: ["check_multi"]
};
Blocks["checkfinish"] = {
  rgbColor: "#6699D0",
  message0: {
    ko: "%1 확인하기",
    en: "%1 Inspect",
    cn: "%1 检查"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/check.png"}
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
  rgbColor: "#8C68AD",
  message0: {
    ko: "%1 선물하기",
    en: "%1 Present"
  },
  args0: [
    {type: "field_image", src: "/img/gift.png"}
  ],
  action: ["present"]
};
Blocks["draw"] = {
  rgbColor: "#C1184A",
  message0: {
    ko: "%1 그림 그리기",
    en: "%1 Draw"
  },
  args0: [
    {type: "field_image", src: "/img/cho_draw/pen.png"}
  ],
  action: ["draw","normal"]
};
Blocks["draw_list_item"] = {
  rgbColor: "#C1184A",
  message0: {
    ko: "%2 그림 %1 그리기",
    en: "%2 Draw %1"
  },
  args0: [{
      type: "field_iconmenu",
      name: "list_num",
      options: [
        {src: '/img/cho_list/1.png', value: '1', width: 48, height: 48},
        {src: '/img/cho_list/2.png', value: '2', width: 48, height: 48},
        {src: '/img/cho_list/3.png', value: '3', width: 48, height: 48},
        {src: '/img/cho_list/4.png', value: '4', width: 48, height: 48},
        {src: '/img/cho_list/5.png', value: '5', width: 48, height: 48}
      ]
    },
    {type: "field_image", src: "/img/cho_draw/pen.png"}
  ],
  action: ["draw","list"]
};
Blocks["draw_x_list_item"] = {
  rgbColor: "#C1184A",
  message0: {
    ko: "%1 그림 %2 그리기",
    en: "%1 Draw %2"
  },
  args0: [
    {type: "field_image", src: "/img/cho_draw/pen.png"},
    {type: "field_image", src: "/img/cho_list/c_x.png"}
  ],
  action: ["draw","loop_x"]
};
Blocks["make_picture"] = {
  rgbColor: "#8B1C79",
  message0: {
    ko: "%1 그림 정하기",
    en: "%1 Make a picture"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/palette.png"}
  ],
  action: ["func", "make_picture_func"]
};
Blocks["make_picture_func"] = {
  rgbColor: "#9E4A8D",
  message0: {
    ko: "%2 %1 그림 정하기",
    en: "%1 Make a picture"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/palette.png"},
    {"type": "field_label",
      "text": "정의",
      "class": "style-define"}

  ],
  action: ["make_picture_func"],
  previousStatement: false
};
Blocks["make_picture_list"] = {
  rgbColor: "#8B1C79",
  message0: {
    ko: "%1 그림 배열 정하기",
    en: "%1 Make a picture list"
  },
  args0: [
    {type: "field_image", src: "/img/cho_list/list_icon.png"}
  ],
  action: ["func", "make_picture_list_func"]
};
Blocks["make_picture_list_func"] = {
  rgbColor: "#9E4A8D",
  message0: {
    ko: "%2 %1 그림 배열 정하기",
    en: "%2 %1 Make a picture list"
  },
  args0: [
    {type: "field_image", src: "/img/cho_list/list_icon.png"},
    {"type": "field_label",
      "text": "정의",
      "class": "style-define"}

  ],
  action: ["make_picture_list_func"],
  previousStatement: false
};
Blocks["make_number_list"] = {
  rgbColor: "#8B1C79",
  message0: {
    ko: "%1 숫자 배열 정하기",
    en: "%1 Make a number list"
  },
  args0: [
    {type: "field_image", src: "/img/cho_list/list_icon.png"}
  ],
  action: ["func", "make_number_list_func"]
};
Blocks["make_number_list_func"] = {
  rgbColor: "#9E4A8D",
  message0: {
    ko: "%2 %1 숫자 배열 정하기",
    en: "%2 %1 Make a number list"
  },
  args0: [
    {type: "field_image", src: "/img/cho_list/list_icon.png"},
    {"type": "field_label",
      "text": "정의",
      "class": "style-define"}

  ],
  action: ["make_number_list_func"],
  previousStatement: false
};
Blocks["run_function"] = {
  rgbColor: "#8B1C79",
  message0: {
    ko: "%1 함수 실행하기",
    en: "%1 Run a function"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/f_icon.png"}
  ],
  action: ["func", "run_function_func"]
};
Blocks["run_function_func"] = {
  rgbColor: "#9E4A8D",
  message0: {
    ko: "%2 %1 함수 정하기",
    en: "%2 %1 Make a function"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/f_icon.png"},
    {"type": "field_label",
      "text": "정의",
      "class": "style-define"}

  ],
  action: ["run_function_func"],
  previousStatement: false
};
Blocks["define_shape"] = {
  rgbColor: "#A08879",
  message0: {
    ko: "모양을 %1 정하기",
    en: "Define the shape %1"
  },
  args0: [{
    type: "field_iconmenu",
    name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]
  }],
  action: ["define_shape","shape"]
};
Blocks["define_color"] = {
  rgbColor: "#65B492",
  message0: {
    ko: "색깔을 %1 정하기",
    en: "Define the color %1"
  },
  args0: [{
    type: "field_iconmenu",
    name: "color",
    options: [
      {src: '/img/cho_draw/ink_green.png', value: 'green', width: 48, height: 48},
      {src: '/img/cho_draw/ink_blue.png', value: 'blue', width: 48, height: 48},
      {src: '/img/cho_draw/ink_orange.png', value: 'orange', width: 48, height: 48},
      {src: '/img/cho_draw/ink_red.png', value: 'red', width: 48, height: 48},
      {src: '/img/cho_draw/ink_sky.png', value: 'sky', width: 48, height: 48},
      {src: '/img/cho_draw/ink_yellow.png', value: 'yellow', width: 48, height: 48}
    ]
  }],
  action: ["define_color","color"]
};

Blocks["list_shape_no1"] = {
  rgbColor: "#A08879",
  message0: {ko: "그림 %2 모양 %1",en: "figure %2 shape %1"},
  args0: [{
    type: "field_iconmenu",    name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/1.png"}],
  action: ["add_shape","shape"]
};
Blocks["list_shape_no2"] = {
  rgbColor: "#A08879",
  message0: {ko: "그림 %2 모양 %1",en: "figure %2 shape %1"},
  args0: [{
    type: "field_iconmenu",    name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/2.png"}],
  action: ["add_shape","shape"]
};
Blocks["list_shape_no3"] = {
  rgbColor: "#A08879",
  message0: {ko: "그림 %2 모양 %1",en: "figure %2 shape %1"},
  args0: [{
    type: "field_iconmenu",    name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/3.png"}],
  action: ["add_shape","shape"]
};
Blocks["list_shape_no4"] = {
  rgbColor: "#A08879",
  message0: {ko: "그림 %2 모양 %1",en: "figure %2 shape %1"},
  args0: [{
    type: "field_iconmenu",    name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/4.png"}],
  action: ["add_shape","shape"]
};
Blocks["list_shape_no5"] = {
  rgbColor: "#A08879",
  message0: {ko: "그림 %2 모양 %1",en: "figure %2 shape %1"},
  args0: [{
    type: "field_iconmenu",    name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/5.png"}],
  action: ["add_shape","shape"]
};

Blocks["list_shape_color_no1"] = {
  rgbColor: "#65B492",
  message0: {ko: "그림 %3 모양 %1 색깔 %2",en: "figure %3 shape %1 color %2"},
  args0: [{
    type: "field_iconmenu",name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
    {type: "field_iconmenu",name: "color",
    options: [
      {src: '/img/cho_draw/ink_green.png', value: 'green', width: 48, height: 48},
      {src: '/img/cho_draw/ink_blue.png', value: 'blue', width: 48, height: 48},
      {src: '/img/cho_draw/ink_orange.png', value: 'orange', width: 48, height: 48},
      {src: '/img/cho_draw/ink_red.png', value: 'red', width: 48, height: 48},
      {src: '/img/cho_draw/ink_sky.png', value: 'sky', width: 48, height: 48},
      {src: '/img/cho_draw/ink_yellow.png', value: 'yellow', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/1.png"}],
  action: ["add_shape_color","shape"]
};
Blocks["list_shape_color_no2"] = {
  rgbColor: "#65B492",
  message0: {ko: "그림 %3 모양 %1 색깔 %2",en: "figure %3 shape %1 color %2"},
  args0: [{
    type: "field_iconmenu",name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
    {type: "field_iconmenu",name: "color",
    options: [
      {src: '/img/cho_draw/ink_green.png', value: 'green', width: 48, height: 48},
      {src: '/img/cho_draw/ink_blue.png', value: 'blue', width: 48, height: 48},
      {src: '/img/cho_draw/ink_orange.png', value: 'orange', width: 48, height: 48},
      {src: '/img/cho_draw/ink_red.png', value: 'red', width: 48, height: 48},
      {src: '/img/cho_draw/ink_sky.png', value: 'sky', width: 48, height: 48},
      {src: '/img/cho_draw/ink_yellow.png', value: 'yellow', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/2.png"}],
  action: ["add_shape_color","shape"]
};
Blocks["list_shape_color_no3"] = {
  rgbColor: "#65B492",
  message0: {ko: "그림 %3 모양 %1 색깔 %2",en: "figure %3 shape %1 color %2"},
  args0: [{
    type: "field_iconmenu",name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
    {type: "field_iconmenu",name: "color",
    options: [
      {src: '/img/cho_draw/ink_green.png', value: 'green', width: 48, height: 48},
      {src: '/img/cho_draw/ink_blue.png', value: 'blue', width: 48, height: 48},
      {src: '/img/cho_draw/ink_orange.png', value: 'orange', width: 48, height: 48},
      {src: '/img/cho_draw/ink_red.png', value: 'red', width: 48, height: 48},
      {src: '/img/cho_draw/ink_sky.png', value: 'sky', width: 48, height: 48},
      {src: '/img/cho_draw/ink_yellow.png', value: 'yellow', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/3.png"}],
  action: ["add_shape_color","shape"]
};
Blocks["list_shape_color_no4"] = {
  rgbColor: "#65B492",
  message0: {ko: "그림 %3 모양 %1 색깔 %2",en: "figure %3 shape %1 color %2"},
  args0: [{
    type: "field_iconmenu",name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
    {type: "field_iconmenu",name: "color",
    options: [
      {src: '/img/cho_draw/ink_green.png', value: 'green', width: 48, height: 48},
      {src: '/img/cho_draw/ink_blue.png', value: 'blue', width: 48, height: 48},
      {src: '/img/cho_draw/ink_orange.png', value: 'orange', width: 48, height: 48},
      {src: '/img/cho_draw/ink_red.png', value: 'red', width: 48, height: 48},
      {src: '/img/cho_draw/ink_sky.png', value: 'sky', width: 48, height: 48},
      {src: '/img/cho_draw/ink_yellow.png', value: 'yellow', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/4.png"}],
  action: ["add_shape_color","shape"]
};
Blocks["list_shape_color_no5"] = {
  rgbColor: "#65B492",
  message0: {ko: "그림 %3 모양 %1 색깔 %2",en: "figure %3 shape %1 color %2"},
  args0: [{
    type: "field_iconmenu",name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]},
    {type: "field_iconmenu",name: "color",
    options: [
      {src: '/img/cho_draw/ink_green.png', value: 'green', width: 48, height: 48},
      {src: '/img/cho_draw/ink_blue.png', value: 'blue', width: 48, height: 48},
      {src: '/img/cho_draw/ink_orange.png', value: 'orange', width: 48, height: 48},
      {src: '/img/cho_draw/ink_red.png', value: 'red', width: 48, height: 48},
      {src: '/img/cho_draw/ink_sky.png', value: 'sky', width: 48, height: 48},
      {src: '/img/cho_draw/ink_yellow.png', value: 'yellow', width: 48, height: 48}
    ]},
  {type: "field_image", src: "/img/cho_list/5.png"}],
  action: ["add_shape_color","shape"]
};

Blocks["list_number1"] = {
  rgbColor: "#59A5CA",
  message0: {ko: "숫자 %2 %1",en: "Number %2 %1"},
  args0: [{type: "field_dropdown",
    name: "number",
    options: [["1", 1],["2", 2],["3", 3],["4", 4],["5", 5],["6", 6],["7", 7],["8", 8],["9", 9],["10", 10],["11", 11],["12", 12],["13", 13],["14", 14],["15", 15]]
  },
{type: "field_image", src: "/img/cho_list/1.png"}],
  action: ["add_number","number"]
};
Blocks["list_number2"] = {
  rgbColor: "#59A5CA",
  message0: {ko: "숫자 %2 %1",en: "Number %2 %1"},
  args0: [{type: "field_dropdown",
    name: "number",
    options: [["1", 1],["2", 2],["3", 3],["4", 4],["5", 5],["6", 6],["7", 7],["8", 8],["9", 9],["10", 10],["11", 11],["12", 12],["13", 13],["14", 14],["15", 15]]
  },
{type: "field_image", src: "/img/cho_list/2.png"}],
  action: ["add_number","number"]
};
Blocks["list_number3"] = {
  rgbColor: "#59A5CA",
  message0: {ko: "숫자 %2 %1",en: "Number %2 %1"},
  args0: [{type: "field_dropdown",
    name: "number",
    options: [["1", 1],["2", 2],["3", 3],["4", 4],["5", 5],["6", 6],["7", 7],["8", 8],["9", 9],["10", 10],["11", 11],["12", 12],["13", 13],["14", 14],["15", 15]]
  },
{type: "field_image", src: "/img/cho_list/3.png"}],
  action: ["add_number","number"]
};
Blocks["list_number4"] = {
  rgbColor: "#59A5CA",
  message0: {ko: "숫자 %2 %1",en: "Number %2 %1"},
  args0: [{type: "field_dropdown",
    name: "number",
    options: [["1", 1],["2", 2],["3", 3],["4", 4],["5", 5],["6", 6],["7", 7],["8", 8],["9", 9],["10", 10],["11", 11],["12", 12],["13", 13],["14", 14],["15", 15]]
  },
{type: "field_image", src: "/img/cho_list/4.png"}],
  action: ["add_number","number"]
};
Blocks["list_number5"] = {
  rgbColor: "#59A5CA",
  message0: {ko: "숫자 %2 %1",en: "Number %2 %1"},
  args0: [{type: "field_dropdown",
    name: "number",
    options: [["1", 1],["2", 2],["3", 3],["4", 4],["5", 5],["6", 6],["7", 7],["8", 8],["9", 9],["10", 10],["11", 11],["12", 12],["13", 13],["14", 14],["15", 15]]
  },
{type: "field_image", src: "/img/cho_list/5.png"}],
  action: ["add_number","number"]
};

Blocks["set_shape"] = {
  rgbColor: "#81644D",
  message0: {
    ko: "모양을 %1 바꾸기",
    en: "Change the shape %1"
  },
  args0: [{
    type: "field_iconmenu",
    name: "shape",
    options: [
      {src: '/img/cho_draw/circle_white.png', value: 'circle', width: 48, height: 48},
      {src: '/img/cho_draw/moon_white.png', value: 'moon', width: 48, height: 48},
      {src: '/img/cho_draw/square_white.png', value: 'square', width: 48, height: 48},
      {src: '/img/cho_draw/star_white.png', value: 'star', width: 48, height: 48},
      {src: '/img/cho_draw/sun_white.png', value: 'sun', width: 48, height: 48},
      {src: '/img/cho_draw/triangle_white.png', value: 'triangle', width: 48, height: 48}
    ]
  }],
  action: ["set_shape","shape"]
};
Blocks["set_color"] = {
  rgbColor: "#20A37B",
  message0: {
    ko: "색깔을 %1 바꾸기",
    en: "Change the color %1"
  },
  args0: [{
    type: "field_iconmenu",
    name: "color",
    options: [
      {src: '/img/cho_draw/ink_green.png', value: 'green', width: 48, height: 48},
      {src: '/img/cho_draw/ink_blue.png', value: 'blue', width: 48, height: 48},
      {src: '/img/cho_draw/ink_orange.png', value: 'orange', width: 48, height: 48},
      {src: '/img/cho_draw/ink_red.png', value: 'red', width: 48, height: 48},
      {src: '/img/cho_draw/ink_sky.png', value: 'sky', width: 48, height: 48},
      {src: '/img/cho_draw/ink_yellow.png', value: 'yellow', width: 48, height: 48}
    ]
  }],
  action: ["set_color","color"]
};
Blocks["complex1_uu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","uu"]
};
Blocks["complex1_ul"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ul"]
};
Blocks["complex1_ur"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ur"]
};
Blocks["complex1_dd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","dd"]
};
Blocks["complex1_dl"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","dl"]
};
Blocks["complex1_dr"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","dr"]
};
Blocks["complex1_lu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","lu"]
};
Blocks["complex1_ld"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ld"]
};
Blocks["complex1_ll"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ll"]
};
Blocks["complex1_ru"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ru"]
};
Blocks["complex1_rd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","rd"]
};
Blocks["complex1_ulu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ulu"]
};
Blocks["complex1_ull"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ull"]
};
Blocks["complex1_uru"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","uru"]
};
Blocks["complex1_ddd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ddd"]
};
Blocks["complex1_ddl"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ddl"]
};
Blocks["complex1_dll"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","dll"]
};
Blocks["complex1_dld"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","dld"]
};
Blocks["complex1_drd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","drd"]
};
Blocks["complex1_drr"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","drr"]
};
Blocks["complex1_llu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","llu"]
};
Blocks["complex1_ruu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ruu"]
};
Blocks["complex1_rur"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","rur"]
};
Blocks["complex1_rdd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","rdd"]
};
Blocks["complex1_rdr"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","rdr"]
};
Blocks["complex1_rrd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","rrd"]
};
Blocks["complex1_uull"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","uull"]
};
Blocks["complex1_uurr"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","uurr"]
};
Blocks["complex1_ddll"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ddll"]
};
Blocks["complex1_ddrr"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","ddrr"]
};
Blocks["complex1_lddd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","lddd"]
};
Blocks["complex1_rddd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex1.png"}
  ],
  action: ["steploop","rddd"]
};
Blocks["complex2_uu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","uu"]
};
Blocks["complex2_ul"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","ul"]
};
Blocks["complex2_dd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","dd"]
};
Blocks["complex2_dl"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","dl"]
};
Blocks["complex2_lu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","lu"]
};
Blocks["complex2_ld"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","ld"]
};
Blocks["complex2_ru"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","ru"]
};
Blocks["complex2_rd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","rd"]
};
Blocks["complex2_rr"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","rr"]
};
Blocks["complex2_uur"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","uur"]
};
Blocks["complex2_dld"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","dld"]
};
Blocks["complex2_ddr"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","ddr"]
};
Blocks["complex2_luu"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","luu"]
};
Blocks["complex2_rur"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","rur"]
};
Blocks["complex2_rrdd"] = {
  rgbColor: "#6969ae",
  message0: {
    ko: "%1 복합블록",
    en: "%1 complex"
  },
  args0: [
    {type: "field_image", src: "/img/b10_w2/complex2.png"}
  ],
  action: ["steploop","rrdd"]
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
    {type: "field_image", src: "/img/kidsblocks/Scissors.png"}
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
    {type: "field_image", src: "/img/kidsblocks/Rock.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Rock.png"}
  ],
  action: ["action", "rock"]
};
Blocks["item_paper"] = {
  rgbColor: "#8C68AD",
  message0: {
    ko: "%1 보&#x3000;",
    en: "%1 Paper"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/Paper.png"}
  ],
  argsh0: [
    {type: "field_image", src: "/img/kidsblocks/Paper.png"}
  ],
  action: ["action", "paper"]
};
Blocks["repeat"] = {
  name: {
    ko: "반복",
    en: "Repeat",
    cn: "重复"
  },
  rgbColor: "#242786",
  message0: {
    ko: "%1 반복 %2",
    en: "%1 Repeat %2",
    cn: "%1 重复 %2"
  },
  args0: [{
    type: "field_image",
    src: "/img/kidsblocks/repeat.svg"
  },{
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
      ["9", "9"]
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
    src: "/img/kidsblocks/repeat.svg"
  }, {
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
      ["9", "9"]
    ]
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "count"]
};

Blocks["define_x"] = {
  name: {
    ko: "X를 정하기",
    en: "Define the X"
  },
  rgbColor: "#D9629E",
  message0: {
    ko: "%1를 %2 정하기",
    en: "Define the %1"
  },
  args0: [{
    type: "field_image",
    src: "/img/kidsblocks/x_img.png"
  },{
    type: "field_dropdown",
    name: "count",
    options: [
      ["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"]
    ]
  }],
  action: ["define_x","count"]
};

Blocks["repeat_x_num"] = {
  name: {
    ko: "X 만큼 반복",
    en: "Repeat X"
  },
  rgbColor: "#242786",
  message0: {
    ko: "%1 %2 만큼 반복",
    en: "Repeat %1"
  },
  args0: [{
    type: "field_image",
    src: "/img/kidsblocks/repeat.svg"
  },{
    type: "field_image",
    src: "/img/kidsblocks/x_img.png"
  }],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat_x_num"]
};

Blocks["repeat_list_num"] = {
  name: {
    ko: "배열 숫자 반복",
    en: "Repeat list number"
  },
  rgbColor: "#242786",
  message0: {
    ko: "%1 숫자 %2 만큼 반복",
    en: "Repeat %2 "
  },
  args0: [{
    type: "field_image",
    src: "/img/kidsblocks/repeat.svg"
  },{
      type: "field_iconmenu",
      name: "list_num",
      options: [
        {src: '/img/cho_list/1.png', value: '1', width: 48, height: 48},
        {src: '/img/cho_list/2.png', value: '2', width: 48, height: 48},
        {src: '/img/cho_list/3.png', value: '3', width: 48, height: 48},
        {src: '/img/cho_list/4.png', value: '4', width: 48, height: 48},
        {src: '/img/cho_list/5.png', value: '5', width: 48, height: 48}
      ]
    }],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat_list_num","normal"]
};

Blocks["repeat_x_list_num"] = {
  name: {
    ko: "배열 숫자 반복",
    en: "Repeat list number"
  },
  rgbColor: "#242786",
  message0: {
    ko: "%1 숫자 %2 만큼 반복",
    en: "Repeat %1"
  },
  args0: [{
    type: "field_image",
    src: "/img/kidsblocks/repeat.svg"
  },{
    type: "field_image",
    src: "/img/cho_list/c_x.png"
  }],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["repeat_list_num","loop_x"]
};

Blocks["forloop_type1"] = {
  name: {
    ko: "일정하게 증가하며 반복",
    en: "Increase repeatedly"
  },
  rgbColor: "#2682C4",
  message0: {
    ko: "%1 1 부터 %2 까지",
    en: "%1 Repeat from 1 to %2"
  },
  args0: [{
    type: "field_image", src: "/img/kidsblocks/x_loop_img.png", width: 40, height: 40
  },{
    type: "field_dropdown",
    name: "end_num",
    options: [
      ["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"]
      ,["12", "12"],["13", "13"],["14", "14"],["15", "15"],["16", "16"],["17", "17"],["18", "18"],["19", "19"],["20", "20"]
    ]
  }],
  message1: {
    ko: "1씩 증가하며 반복",
    en: "incrementing by 1"
  },
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["forloop","type1"]
};
Blocks["forloop_type2"] = {
  name: {
    ko: "일정하게 증가하며 반복",
    en: "Increase repeatedly"
  },
  rgbColor: "#2682C4",
  message0: {
    ko: "%1 %2 부터 %3 까지",
    en: "%1 Repeat from %2 to %3"
  },
  args0: [{
    type: "field_image", src: "/img/kidsblocks/x_loop_img.png", width: 40, height: 40
  },{
    type: "field_dropdown",
    name: "start_num",
    options: [
      ["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"]
    ]
  },{
    type: "field_dropdown",
    name: "end_num",
    options: [
      ["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"]
      ,["12", "12"],["13", "13"],["14", "14"],["15", "15"],["16", "16"],["17", "17"],["18", "18"],["19", "19"],["20", "20"]
    ]
  }],
  message1: {
    ko: "1씩 증가하며 반복",
    en: "incrementing by 1"
  },
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["forloop","type2"]
};
Blocks["forloop_type3"] = {
  name: {
    ko: "일정하게 증가하며 반복",
    en: "Increase repeatedly"
  },
  rgbColor: "#2682C4",
  message0: {
    ko: "%1 %2 부터 %3 까지",
    en: "%1 Repeat from %2 to %3"
  },
  args0: [{
    type: "field_image", src: "/img/kidsblocks/x_loop_img.png", width: 40, height: 40
  },{
    type: "field_dropdown",
    name: "start_num",
    options: [
      ["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"]
    ]
  },{
    type: "field_dropdown",
    name: "end_num",
    options: [
      ["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"]
      ,["12", "12"],["13", "13"],["14", "14"],["15", "15"],["16", "16"],["17", "17"],["18", "18"],["19", "19"],["20", "20"]
    ]
  }],
  message1: {
    ko: "%1 씩 증가하며 반복",
    en: "incrementing by %1"
  },
  args1: [{
    type: "field_dropdown",
    name: "increase_num",
    options: [
      ["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"]
    ]
  }],
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "statements"
  }],
  action: ["forloop","type3"]
};

Blocks['repeat_until_cos'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1 만약에 반복",
    en: "%1 Repeat if"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untilcos.png", width: 40, height: 40}
  ],
  message1: {
    ko: "코스에게 가는 중이라면",
    en: "going to Cos"
  },
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untilcos.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_numbot'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1 만약에 반복",
    en: "%1 Repeat if"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untilnumbot.png", width: 40, height: 40}
  ],
  message1: {
    ko: "넘봇에게 가는 중이라면",
    en: "going to Numbot"
  },
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untilnumbot.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_box'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1 만약에 반복",
    en: "%1 Repeat if"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a6/box_repeat.png", width: 40, height: 40}
  ],
  message1: {
    ko: "상자가 있다면",
    en: "going to Numbot"
  },
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/c55re_w1/box.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until_item"]
};

Blocks['repeat_until_sea'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1만약에 바다에 가는 중이라면 반복",
    en: "%1Repeat if going to the sea"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untilsea.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untilsea.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
};

Blocks['repeat_until_tootoo'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1만약에 투투에게 가는 중이라면 반복",
    en: "%1Repeat if going to Tootoo"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untiltootoo.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untiltootoo.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_bomi'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1만약에 봄이에게 가는 중이라면 반복",
    en: "%1Repeat if going to Bomi"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untilbomi.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untilbomi.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_deer'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1만약에 디어에게 가는 중이라면 반복",
    en: "%1Repeat if going to Deer"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untildeer.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untildeer.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_jack'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1만약에 짹에게 가는 중이라면 반복",
    en: "%1Repeat if going to Jack"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untiljack.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untiljack.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
};
Blocks['repeat_until_tori'] = {
  rgbColor: "#2682C4",
  message0: {
    ko: "%1만약에 토리에게 가는 중이라면 반복",
    en: "%1Repeat if going to Tori"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/untiltori.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "statements"
  }],
  messageh0: "%1 %2",
  argsh0: [{
    type: "input_statement",
    name: "statements"
  }, {
    type: "field_image",
    src: "/img/kidsblocks/untiltori.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["repeat", "repeat_until"]
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
  rgbColor: "#309E4A",
  message0: {
    ko: "%1앞으로 갈 수 있다면",
    en: "If %1"
  },
  args0: [{
    type: "field_image",
    src: "/img/kidsblocks/up_y.png"
  }],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "%1 없다면",
    en: "%1"
  },
  args2: [{
    type: "field_image",
    src: "/img/kidsblocks/up_n.png"
  }],
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
  args0: [
    {type: "field_image", src: "/img/kidsblocks/down_n.png"}
  ],
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
    en: "Repeat Until meeting lucky pocket"
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


Blocks['condition_wall_up'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 위에 장애물이 있다면",
    en: "%1 If an obstacle is upwards"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_n.png"}
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
    src: "/img/kidsblocks/up_n.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","no_up"]
};
Blocks['condition_up'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 위로 갈 수 있다면",
    en: "%1 If you can go upwards"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/up_y.png"}
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
    src: "/img/kidsblocks/up_y.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","up"]
};

Blocks['condition_wall_down'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 아래에 장애물이 있다면",
    en: "%1 If an obstacle is downwards"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/down_n.png"}
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
    src: "/img/kidsblocks/down_n.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","no_down"]
};

Blocks['condition_down'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 아래로 갈 수 있다면",
    en: "%1 If you can go downwards"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/down_y.png"}
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
    src: "/img/kidsblocks/down_y.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","down"]
};

Blocks['condition_wall_left'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 왼쪽에 장애물이 있다면",
    en: "%1 If an obstacle is leftside"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/left_n.png"}
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
    src: "/img/kidsblocks/left_n.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","no_left"]
};

Blocks['condition_left'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 왼쪽으로 갈 수 있다면",
    en: "%1 If you can go left"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/left_y.png"}
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
    src: "/img/kidsblocks/left_y.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","left"]
};

Blocks['condition_wall_right'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 오른쪽에 장애물이 있다면",
    en: "%1 If an obstacle is rightside"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/right_n.png"}
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
    src: "/img/kidsblocks/right_n.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","no_right"]
};

Blocks['condition_right'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 오른쪽으로 갈 수 있다면",
    en: "%1 If you can go right"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/right_y.png"}
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
    src: "/img/kidsblocks/right_y.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["condition_movable","right"]
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
  rgbColor: "#309E4A",
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
Blocks['condition_fish_notuse'] = {
  name: {
    ko: "만약에 물고기가 나오면",
    en: "If There is fish"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1가 나오면",
    en: "If There is %1"
  },
  args0: [{
    type: "field_image",
    src: "/img/cho_a11/fish.png"
  }],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  action: ["conditioncheck","item_notuse"]
};
Blocks['condition_seedget_notuse'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "호박씨가 나오면",
    en: "If pumkinseed exists"
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
    src: "/img/kidsblocks/pumkinseed.png"
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
  rgbColor: "#309E4A",
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
Blocks['condition_5_bigger'] = {
  name: {
    ko: "만약에 5 보다 크다면",
    en: "If more than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 보다 크다면",
    en: "If more than %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/h5.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  action: ["conditioncheck","card"]
};
Blocks['condition_5_smaller'] = {
  name: {
    ko: "만약에 5 보다 작다면",
    en: "If less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 보다 작다면",
    en: "If less than %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/h5.png"}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  action: ["conditioncheck","card"]
};
Blocks['condition2_5_bigger'] = {
  name: {
    ko: "만약에 5 보다 크다면",
    en: "If more than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 보다 크다면",
    en: "If more than %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/h5.png", width: 30, height: 30}
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
Blocks['condition2_5_smaller'] = {
  name: {
    ko: "만약에 5 보다 작다면",
    en: "If less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 보다 작다면",
    en: "If less than %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/h5.png", width: 30, height: 30}
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
Blocks['condition_shape_circle_white'] = {
  name: {
    ko: "만약에 동그라미 라면",
    en: "If less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 라면",
    en: "If less than %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_draw/circle_white_target.png", width: 30, height: 30}
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
  action: ["condition_shape","circle_white"]
};
Blocks['condition_shape_circle_red'] = {
  name: {
    ko: "만약에 빨간 동그라미 라면",
    en: "If less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 라면",
    en: "If less than %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_draw/circle_red_target.png", width: 30, height: 30}
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
  action: ["condition_shape","circle_red"]
};
Blocks['condition2_recycle'] = {
  name: {
    ko: "만약에 재활용 가능하다면",
    en: "If less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 라면",
    en: "If less than %1"
  },
  args0: [
    {type: "field_image", src: "/img/c8_w4/recycle.png"}
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
  action: ["conditioncheck2","recycle"]
};
Blocks['condition3_recycle'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 %1 라면",
    en: "If %1",
    cn: "如果 %1"
  },
  args0: [
    {type: "field_image", src: "/img/c8_w4/paper.png", width: 30, height: 30}
  ],
  message1: "%1",
  args1: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message2: {
    ko: "만약에 %1 라면",
    en: "If %1",
    cn: "如果 %1"
  },
  args2: [
    {type: "field_image", src: "/img/b9_w2/recycle4.png", width: 30, height: 30}
  ],
  message3: "%1",
  args3: [{
    type: "input_statement",
    name: "else_if_statements"
  }],
  message4: {
    ko: "아니라면",
    en: "If %1",
    cn: "如果 %1"
  },
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","trash"]
};
Blocks['condition2_5_smaller_for'] = {
  name: {
    ko: "숫자가 5 보다 작다면",
    en: "If less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "숫자가 %1 보다 작다면",
    en: "If less than %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a7/no5.png", width: 30, height: 30}
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
  action: ["conditioncheck2","andorcheck2"]
};
Blocks['condition2_odd_for'] = {
  name: {
    ko: "숫자가 홀수라면",
    en: "If odd"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "숫자가 %1 라면",
    en: "If odd"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a7/odd.png", width: 30, height: 30}
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
  action: ["conditioncheck2","andorcheck2"]
};
Blocks['condition2_even_for'] = {
  name: {
    ko: "숫자가 짝수라면",
    en: "If even"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "숫자가 %1 라면",
    en: "If even"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a7/even.png", width: 30, height: 30}
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
  action: ["conditioncheck2","andorcheck2"]
};
Blocks['condition2_odd_and_5_smaller_for'] = {
  name: {
    ko: "숫자가 홀수라면 그리고 5보다 작다면",
    en: "If odd & less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "숫자가 %1 라면 ",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/cho_a7/odd.png", width: 30, height: 30}
  ],
  message1: {
   ko: "그리고 %1 보다 작다면",
   en: "& less than %2"
   },
   args1: [
     {type: "field_image", src: "/img/cho_a7/no5.png", width: 30, height: 30}
   ],
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message3: {
    ko: "아니라면",
    en: "Else"
  },
  message4: "%1",
  args4: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","andorcheck2"]
};
Blocks['condition2_even_and_5_smaller_for'] = {
  name: {
    ko: "숫자가 짝수라면 그리고 5보다 작다면",
    en: "If even & less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "숫자가 %1 라면 ",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/cho_a7/even.png", width: 30, height: 30}
  ],
  message1: {
   ko: "그리고 %1 보다 작다면",
   en: "& less than %2"
   },
   args1: [
     {type: "field_image", src: "/img/cho_a7/no5.png", width: 30, height: 30}
   ],
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message3: {
    ko: "아니라면",
    en: "Else"
  },
  message4: "%1",
  args4: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","andorcheck2"]
};
Blocks['condition2_odd_or_5_smaller_for'] = {
  name: {
    ko: "만약에 홀수라면 또는 5보다 작다면",
    en: "If odd or less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "숫자가 %1 라면 ",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/cho_a7/odd.png", width: 30, height: 30}
  ],
  message1: {
   ko: "또는 %1 보다 작다면",
   en: "| less than %2"
   },
   args1: [
     {type: "field_image", src: "/img/cho_a7/no5.png", width: 30, height: 30}
   ],
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message3: {
    ko: "아니라면",
    en: "Else"
  },
  message4: "%1",
  args4: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","andorcheck2"]
};
Blocks['condition2_even_or_5_smaller_for'] = {
  name: {
    ko: "만약에 짝수라면 또는 5보다 작다면",
    en: "If even or less than 5"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "숫자가 %1 라면 ",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/cho_a7/even.png", width: 30, height: 30}
  ],
  message1: {
   ko: "또는 %1 보다 작다면",
   en: "| less than %2"
   },
   args1: [
     {type: "field_image", src: "/img/cho_a7/no5.png", width: 30, height: 30}
   ],
  message2: "%1",
  args2: [{
    type: "input_statement",
    name: "if_statements"
  }],
  message3: {
    ko: "아니라면",
    en: "Else"
  },
  message4: "%1",
  args4: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck2","andorcheck2"]
};
Blocks['condition_apple'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 사과라면",
    en: "If apple"
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
    src: "/img/kidsblocks/apple.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_if"]
};
Blocks['condition_persimmon'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 감이라면",
    en: "If persimmon"
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
    src: "/img/kidsblocks/persimmon.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_else"]
};
Blocks['condition_jegi'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 제기라면",
    en: "If jegi"
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
    src: "/img/kidsblocks/jegi.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_if"]
};
Blocks['condition_yut'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 윷이라면",
    en: "If yut"
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
    src: "/img/kidsblocks/yut.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_elseif"]
};
Blocks['condition_tuho'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 투호라면",
    en: "If tuho"
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
    src: "/img/kidsblocks/tuho.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_else"]
};
Blocks['condition_kite'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 연이라면",
    en: "If kite"
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
    src: "/img/kidsblocks/kite.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_4"]
};
Blocks['condition_top'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 팽이라면",
    en: "If top"
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
    src: "/img/kidsblocks/top.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_5"]
};
Blocks['condition_key_triangle'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 세모 열쇠라면",
    en: "If triangle key"
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
    src: "/img/kidsblocks/key_triangle.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_if"]
};
Blocks['condition_key_square'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 네모 열쇠라면",
    en: "If square key"
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
    src: "/img/kidsblocks/key_square.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_else"]
};
Blocks['condition_key_circle'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 동그라미 열쇠라면",
    en: "If circle key"
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
    src: "/img/kidsblocks/key_circle.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_elseif"]
};
Blocks['condition_key_round'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 동그라미 열쇠라면",
    en: "If circle key"
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
    src: "/img/kidsblocks/key_round.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_elseif"]
};
Blocks['condition_luck_triangle'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 세모난 복주머니라면",
    en: "If triangle lucky bag"
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
    src: "/img/kidsblocks/luck_tri.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_if"]
};
Blocks['condition_luck_square'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 네모난 복주머니라면",
    en: "If square lucky bag"
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
    src: "/img/kidsblocks/luck_sqr.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_else"]
};
Blocks['condition_luck_round'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 동그란 복주머니라면",
    en: "If round lucky bag"
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
    src: "/img/kidsblocks/luck_round.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_elseif"]
};

Blocks['condition_acorn'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 도토리라면",
    en: "If acorn"
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
    src: "/img/kidsblocks/acorn.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_if"]
};
Blocks['condition_rice'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "만약에 쌀이라면",
    en: "If rice"
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
    src: "/img/kidsblocks/rice.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","move_wo_item_else"]
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
Blocks['condition_ac0100'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0100.png"}
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
    src: "/img/c9_w1/a0100.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0100"]
};
Blocks['condition_ac0200'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0200.png"}
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
    src: "/img/c9_w1/a0200.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0200"]
};
Blocks['condition_ac0300'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0300.png"}
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
    src: "/img/c9_w1/a0300.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0300"]
};
Blocks['condition_ac0400'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0400.png"}
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
    src: "/img/c9_w1/a0400.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0400"]
};
Blocks['condition_ac0500'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0500.png"}
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
    src: "/img/c9_w1/a0500.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0500"]
};
Blocks['condition_ac0600'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0600.png"}
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
    src: "/img/c9_w1/a0600.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0600"]
};
Blocks['condition_ac0700'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0700.png"}
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
    src: "/img/c9_w1/a0700.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0700"]
};
Blocks['condition_ac0800'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0800.png"}
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
    src: "/img/c9_w1/a0800.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0800"]
};
Blocks['condition_ac0900'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a0900.png"}
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
    src: "/img/c9_w1/a0900.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0900"]
};
Blocks['condition_ac1000'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a1000.png"}
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
    src: "/img/c9_w1/a1000.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1000"]
};
Blocks['condition_ac1100'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a1100.png"}
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
    src: "/img/c9_w1/a1100.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1100"]
};
Blocks['condition_ac1200'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/a1200.png"}
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
    src: "/img/c9_w1/a1200.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1200"]
};
Blocks['condition_dc0100'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0100.png"}
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
    src: "/img/c9_w1/d0100.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0100"]
};
Blocks['condition_dc0200'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0200.png"}
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
    src: "/img/c9_w1/d0200.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0200"]
};
Blocks['condition_dc0300'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0300.png"}
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
    src: "/img/c9_w1/d0300.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0300"]
};
Blocks['condition_dc0400'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0400.png"}
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
    src: "/img/c9_w1/d0400.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0400"]
};
Blocks['condition_dc0500'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0500.png"}
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
    src: "/img/c9_w1/d0500.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0500"]
};
Blocks['condition_dc0600'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0600.png"}
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
    src: "/img/c9_w1/d0600.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0600"]
};
Blocks['condition_dc0700'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0700.png"}
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
    src: "/img/c9_w1/d0700.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0700"]
};
Blocks['condition_dc0800'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0800.png"}
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
    src: "/img/c9_w1/d0800.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0800"]
};
Blocks['condition_dc0900'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d0900.png"}
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
    src: "/img/c9_w1/d0900.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0900"]
};
Blocks['condition_dc1000'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d1000.png"}
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
    src: "/img/c9_w1/d1000.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1000"]
};
Blocks['condition_dc1100'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d1100.png"}
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
    src: "/img/c9_w1/d1100.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1100"]
};
Blocks['condition_dc1200'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w1/d1200.png"}
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
    src: "/img/c9_w1/d1200.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1200"]
};
Blocks['condition_ac0130'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0130.png"}
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
    src: "/img/c9_w2/a0130.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0130"]
};
Blocks['condition_ac0230'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0230.png"}
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
    src: "/img/c9_w2/a0230.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0230"]
};
Blocks['condition_ac0330'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0330.png"}
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
    src: "/img/c9_w2/a0330.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0330"]
};
Blocks['condition_ac0430'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0430.png"}
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
    src: "/img/c9_w2/a0430.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0430"]
};
Blocks['condition_ac0530'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0530.png"}
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
    src: "/img/c9_w2/a0530.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0530"]
};
Blocks['condition_ac0630'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0630.png"}
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
    src: "/img/c9_w2/a0630.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0630"]
};
Blocks['condition_ac0730'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0730.png"}
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
    src: "/img/c9_w2/a0730.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0730"]
};
Blocks['condition_ac0830'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0830.png"}
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
    src: "/img/c9_w2/a0830.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0830"]
};
Blocks['condition_ac0930'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a0930.png"}
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
    src: "/img/c9_w2/a0930.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0930"]
};
Blocks['condition_ac1030'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a1030.png"}
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
    src: "/img/c9_w2/a1030.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1030"]
};
Blocks['condition_ac1130'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a1130.png"}
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
    src: "/img/c9_w2/a1130.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1130"]
};
Blocks['condition_ac1230'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/a1230.png"}
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
    src: "/img/c9_w2/a1230.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1230"]
};
Blocks['condition_dc0130'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0130.png"}
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
    src: "/img/c9_w2/d0130.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0130"]
};
Blocks['condition_dc0230'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0230.png"}
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
    src: "/img/c9_w2/d0230.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0230"]
};
Blocks['condition_dc0330'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0330.png"}
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
    src: "/img/c9_w2/d0330.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0330"]
};
Blocks['condition_dc0430'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0430.png"}
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
    src: "/img/c9_w2/d0430.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0430"]
};
Blocks['condition_dc0530'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0530.png"}
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
    src: "/img/c9_w2/d0530.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0530"]
};
Blocks['condition_dc0630'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0630.png"}
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
    src: "/img/c9_w2/d0630.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0630"]
};
Blocks['condition_dc0730'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0730.png"}
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
    src: "/img/c9_w2/d0730.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0730"]
};
Blocks['condition_dc0830'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0830.png"}
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
    src: "/img/c9_w2/d0830.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0830"]
};
Blocks['condition_dc0930'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d0930.png"}
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
    src: "/img/c9_w2/d0930.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c0930"]
};
Blocks['condition_dc1030'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d1030.png"}
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
    src: "/img/c9_w2/d1030.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1030"]
};
Blocks['condition_dc1130'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d1130.png"}
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
    src: "/img/c9_w2/d1130.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1130"]
};
Blocks['condition_dc1230'] = {
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 라면",
    en: "If %1 "
  },
  args0: [
    {type: "field_image", src: "/img/c9_w2/d1230.png"}
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
    src: "/img/c9_w2/d1230.png"
  }],
  messageh1: null,
  argsh1: null,
  action: ["conditioncheck","c1230"]
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
Blocks['condition2_td_up'] = {
  name: {
    ko: "목적지가 위쪽에 있다면",
    en: "If the target spot is at up side"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "목적지가 %1에 있다면" ,
    en: "If the target spot is at %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a3/d_up.png", width: 30, height: 30}
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
Blocks['condition2_td_down'] = {
  name: {
    ko: "목적지가 아래쪽에 있다면",
    en: "If the target spot is at down side"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "목적지가 %1에 있다면",
    en: "If the target spot is at %1"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/d_down.png", width: 30, height: 30}
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
Blocks['condition2_td_left'] = {
  name: {
    ko: "목적지가 왼쪽에 있다면",
    en: "If the target spot is at left side"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "목적지가 %1에 있다면",
    en: "If the target spot is at %1"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/d_left.png", width: 30, height: 30}
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
  action: ["conditioncheck2","food"]
};
Blocks['condition2_td_right'] = {
  name: {
    ko: "목적지가 오른쪽에 있다면",
    en: "If the target spot is at right side"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "목적지가 %1에 있다면",
    en: "If the target spot is at %1"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/d_right.png", width: 30, height: 30}
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
Blocks['condition2_itemluck_round'] = {
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
Blocks['condition2_itemluck_rectangle'] = {
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
Blocks['condition2_itemluck_triangle'] = {
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
  name: {
    ko: "가위바위보 조건",
    en: "Condition Rock, Scissors, Paper"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 이라면",
    en: "If %1",
    cn: "如果 %1"
  },
  args0: [
    {type: "field_image", src: "/img/kidsblocks/Rock.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/kidsblocks/Scissors.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/kidsblocks/Paper.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","rsp"]
};
Blocks['condition3_rsp_numbot'] = {
  name: {
    ko: "가위바위보 조건",
    en: "Condition Rock, Scissors, Paper"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 이라면",
    en: "If %1",
    cn: "如果 %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/numbot_r.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_s.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_p.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","rsp"]
};
Blocks['condition3_srp_numbot'] = {
  name: {
    ko: "가위바위보 조건",
    en: "Condition Rock, Scissors, Paper"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 이라면",
    en: "If %1",
    cn: "如果 %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/numbot_s.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_r.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_p.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","srp"]
};
Blocks['condition3_prs_numbot'] = {
  name: {
    ko: "가위바위보 조건",
    en: "Condition Rock, Scissors, Paper"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 이라면",
    en: "If %1",
    cn: "如果 %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/numbot_p.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_r.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_s.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","prs"]
};
Blocks['condition3_rps_numbot'] = {
  name: {
    ko: "가위바위보 조건",
    en: "Condition Rock, Scissors, Paper"
  },
  rgbColor: "#309E4A",
  message0: {
    ko: "%1 이라면",
    en: "If %1",
    cn: "如果 %1"
  },
  args0: [
    {type: "field_image", src: "/img/cho_a2/numbot_r.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_p.png", width: 30, height: 30}
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
    {type: "field_image", src: "/img/cho_a2/numbot_s.png", width: 30, height: 30}
  ],
  message5: "%1",
  args5: [{
    type: "input_statement",
    name: "else_statements"
  }],
  action: ["conditioncheck3","rps"]
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
