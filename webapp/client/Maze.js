Router.route('/maze/:type/:step', function() {
  var loader = new createjs.LoadQueue();
  var d1 = $.Deferred();
  var d2 = $.Deferred();
  var d3 = $.Deferred();
  createjs.Sound.alternateExtensions = ["mp3", "wav"];
  loader.installPlugin(createjs.Sound);
  Meteor.call('getMaze', this.params.type, this.params.step, function(error, maze) {
    loader.loadManifest(maze.manifest);
    d3.resolve(maze);
  });
  loader.on("complete", function() {
    var manifest = loader.getItems();
    // register sound resources
    for(var i = 0; i < manifest.length; i++) {
      if(manifest[i].item.type == "sound") {
        createjs.Sound.registerSound({
          id: manifest[i].item.id,
          src: manifest[i].item.src
        });
      }
    }
    // play bgm if it exist
    createjs.Sound.addEventListener("fileload", function(e) {
      if(loader.getItem("bgm")) {
        createjs.Sound.play("bgm", {loop: -1});
      }
    });
    d1.resolve();
  });
  Template.Maze.rendered = function() {
    d2.resolve();
  };
  $.when( this.params.step, d3, loader, d1, d2 ).done(init);
  this.render("Maze");
});

var kidscoding = new KidsCoding();

function init(step, maze, loader) {
  kidscoding.initBlockly(maze.toolbox);
  var mazeInfo = drawMaze(maze, loader);
  addEvents(step, loader, mazeInfo, maze.type || "");
  runTutorial(maze);
}

function drawMaze(maze, loader) {
  var stage = new createjs.Stage("display");
  if(loader.getItem("background")) {
    var background = new createjs.Bitmap(loader.getResult("background"));
    stage.addChild(background);
  } else if(loader.getItem("bg1")) {
    for(var i = 0; i < 8; i++) {
      for(var j = 0; j < 8; j++) {
        var idx = (i + j) % 2 + 1;
        var bg_tile = new createjs.Bitmap(loader.getResult("bg" + idx));
        setBitmapCoord(bg_tile, j, i);
        stage.addChild(bg_tile);
      }
    }
  }
  var mazeInfo = {
    map: _.map(maze.map, function(row) {
      return _.map(row, function(item) {
        return item;
      })
    }),
    canvas: {
      stage: stage,
      character: new createjs.Bitmap(loader.getResult("character")),
      foods: [],
      obstacles: []
    }
  };

  var obstacle_ids = _.chain(maze.manifest)
      .filter(function(el) {
        return el.obstacle;
      })
      .map(function(el) {
        return el.id || el;
      })
      .value();
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      switch(mazeInfo.map[i][j]) {
        case "@": // character
          setBitmapCoord(mazeInfo.canvas.character, j, i);
          break;
        case "%": // food
          var bitmap = new createjs.Bitmap(loader.getResult("food"));
          mazeInfo.canvas.foods.push(bitmap);
          setBitmapCoord(bitmap, j, i);
          stage.addChild(bitmap);
          break;
        case ")": // item
          var bitmap = new createjs.Bitmap(loader.getResult("item"));
          mazeInfo.canvas.item = bitmap;
          setBitmapCoord(bitmap, j, i);
          stage.addChild(bitmap);
          break;
        case "5": // rock
        case "4":
        case "3":
        case "2":
        case "1":
          var num = +mazeInfo.map[i][j];
          var bitmap = new createjs.Bitmap(loader.getResult("rock" + num));
          bitmap.type = "rock";
          bitmap.num = num;
          mazeInfo.canvas.obstacles.push(bitmap);
          setBitmapCoord(bitmap, j, i);
          stage.addChild(bitmap);
          break;
        case "^": // trap
          var trap = new createjs.Bitmap(loader.getResult("trap"));
          setBitmapCoord(trap, j, i);
          stage.addChild(trap);
          break;
        case "#": // obstacles
          var idx = parseInt(Math.random() * obstacle_ids.length, 10),
              bitmap = new createjs.Bitmap(loader.getResult(obstacle_ids[idx]));
          mazeInfo.canvas.obstacles.push(bitmap);
          setBitmapCoord(bitmap, j, i);
          stage.addChild(bitmap);
          break;
        case "R": // rock
        case "P": // paper
        case "S": // scissors
          var container = new createjs.Container();
          var bitmap = new createjs.Bitmap(loader.getResult("spider"));
          var hand = {
            "R": "rock",
            "P": "paper",
            "S": "scissors"
          }[mazeInfo.map[i][j]];
          var bitmap2 = new createjs.Bitmap(loader.getResult("hand_" + hand));
          var bounds = bitmap2.getBounds();
          var size = 25;
          bitmap2.scaleX = size / bounds.width;
          bitmap2.scaleY = size / bounds.height;
          bitmap2.x = 50 - size;
          container.hand = hand;
          container.addChild(bitmap, bitmap2);
          setBitmapCoord(container, j, i);
          stage.addChild(container);
          if(!mazeInfo.canvas.spiders) {
            mazeInfo.canvas.spiders = [];
          }
          mazeInfo.canvas.spiders.push(container);
          break;
        case ".":
        default:
          break;
      }
    }
  }
  stage.addChild(mazeInfo.canvas.character);
  stage.update();
  return mazeInfo;
}

function setBitmapCoord(bitmap, px, py) {
  bitmap.px = px;
  bitmap.py = py;
  bitmap.x = 50 * px + 25;
  bitmap.y = 50 * py + 25;
  bitmap.regX = 25;
  bitmap.regY = 25;
}

function addEvents(step, loader, mazeInfo, type) {
  $(document).on("contextmenu mousewheel", function(e) {
    e.preventDefault();
  });
  $("#modal .go-next").click(function(e) {
    var path = "/maze/";
    var matched = /\/maze\/([^/]*)\/(.*)/gm.exec(location.pathname);
    if(matched) {
      location.pathname = path + matched[1] + "/" +(+matched[2]+1);
    }
  });
  var org_px = mazeInfo.canvas.character.px,
      org_py = mazeInfo.canvas.character.py;
  $("#runCode").click(function(e) {
    if($(this).find("i").hasClass("fa-play")) {
      $(this).html('<i class="fa fa-refresh"></i> 처음상태로');
      // Generate JavaScript code and run it.
      window.LoopTrap = 1000;
      Blockly.JavaScript.INFINITE_LOOP_TRAP =
          'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
      var code = Blockly.JavaScript.workspaceToCode();
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
      eval("with(kidscoding){\n" + code + "\n}");
      if(kidscoding.queue.length == 0) {
        showModal("블럭이 하나도 없어요!");
      } else {
        popQueue(loader, mazeInfo, 0);
      }
    } else {
      $(this).html('<i class="fa fa-play"></i> 시작');
      createjs.Tween.removeAllTweens();
      kidscoding.queue = [];
      resetMaze(loader, mazeInfo, org_px, org_py);
    }
  });

  if(type == "game") {
    mazeInfo.score = 0;
    addFood(loader, mazeInfo);
    $("#scoreBox").show();
    $("#runCode").hide();
    $(document).keydown(function(e) {
      gameMove(e, loader, mazeInfo);
    });
  }
}

function runTutorial(maze) {
  var tutorial = maze.tutorial,
      idx = 0;
  if(tutorial) {
    showModal({
      video: tutorial[idx].video,
      msg: tutorial[idx].msg,
      tutorial: true
    });
  }
  $("#modal .tutorial").click(function(e) {
    idx++;
    if(idx < tutorial.length) {
      showModal({
        msg: tutorial[idx].msg,
        tutorial: true
      });
    } else {
      $('#modal').modal('hide');
    }
  });
}

function rotateCharacter(mazeInfo, rotation, callback) {
  var character = mazeInfo.canvas.character,
      tween = createjs.Tween.get(character);
  tween.to({rotation: rotation}, 500)
      .call(function() {
        character.rotation = (character.rotation + 360) % 360;
        callback();
      })
      .addEventListener("change", function() {
        mazeInfo.canvas.stage.update();
      });
}

function moveCharacter(mazeInfo, x_next, y_next, callback) {
  var character = mazeInfo.canvas.character,
      tween = createjs.Tween.get(character),
      rotation;
  if(character.px == x_next) {
    rotation = character.py > y_next? 0 : 180;
  } else {
    rotation = character.px > x_next ? 270 : 90;
  }
  if(character.rotation == 0 && rotation == 270) {
    rotation = -90;
  } else if(character.rotation == 270 && rotation == 0) {
    rotation = 360;
  }

  character.px = x_next;
  character.py = y_next;

  if(character.rotation != rotation) {
    tween.to({rotation: rotation}, 500);
  }
  tween.wait(300)
       .to({x:50*x_next + 25, y: 50*y_next + 25}, 700)
       .call(function() {
         character.rotation = (character.rotation + 360) % 360;
         callback();
       })
       .addEventListener("change", function() {
         mazeInfo.canvas.stage.update();
       });
}

function bounceCharacter(mazeInfo, x_next, y_next, callback) {
  var character = mazeInfo.canvas.character,
      tween = createjs.Tween.get(character),
      rotation;
  if(character.px == x_next) {
    rotation = character.py > y_next ? 0 : 180;
  } else {
    rotation = character.px > x_next ? 270 : 90;
  }
  if(rotation == 0) {
    y_next += 0.5;
  } else if(rotation == 180) {
    y_next -= 0.5;
  } else if(rotation == 90) {
    x_next -= 0.5;
  } else {
    x_next += 0.5;
  }
  if(character.rotation == 0 && rotation == 270) {
    rotation = -90;
  } else if(character.rotation == 270 && rotation == 0) {
    rotation = 360;
  }
  if(character.rotation != rotation) {
    tween.to({rotation: rotation}, 500);
  }
  tween.wait(200)
       .to({x:50*x_next + 25, y: 50*y_next + 25}, 350)
       .to({x:50*character.px + 25, y: 50*character.py + 25}, 350)
       .to({rotation: rotation+720}, 1000)
       .call(function() {
         character.rotation = (character.rotation + 360) % 360;
         callback();
       })
       .addEventListener("change", function() {
         mazeInfo.canvas.stage.update();
       });
}

function trapCharacter(mazeInfo, x_next, y_next, callback) {
  moveCharacter(mazeInfo, x_next, y_next, function() {
    var character = mazeInfo.canvas.character,
        tween = createjs.Tween.get(character);
    tween.to({rotation: character.rotation+720}, 1000)
         .call(function() {
           character.rotation = (character.rotation + 360) % 360;
           callback();
         })
         .addEventListener("change", function() {
           mazeInfo.canvas.stage.update();
         });
  });
}

function popQueue(loader, mazeInfo, q_idx) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods,
      args;
  if(q_idx == kidscoding.queue.length) {
    kidscoding.queue = [];
    for(var i = 0; i < foods.length; i++) {
      if(foods[i].visible == true) {
        createjs.Sound.play("fail");
        showModal("블럭을 다 썼지만 끝나지 않았어요");
        break;
      }
    }
    if(i == foods.length) {
      createjs.Sound.play("complete");
      showModal({
        msg: "성공!",
        goNext: true
      });
    }
    return;
  }
  args = kidscoding.queue[q_idx].args
  var type = kidscoding.queue[q_idx].type;
  if(type == "move") {
    var x_next = character.px,
        y_next = character.py,
        diff = args[0] == "jump_forward" ? 2 : 1;
    if(args[0] == "forward" || args[0] == "jump_forward") {
      if(character.rotation == 0) {
        y_next -= diff;
      } else if(character.rotation == 90) {
        x_next += diff;
      } else if(character.rotation == 180) {
        y_next += diff;
      } else {
        x_next -= diff;
      }
    } else {
      x_next += args[0];
      y_next += args[1];
    }
    var tile = mazeInfo.map[y_next][x_next];
    if(x_next < 0 || y_next < 0 || x_next >=8 || y_next >= 8) {
      tile = "#";
    }
    if( tile == "." || tile == "@" || tile == ")" ) {
      moveCharacter(mazeInfo, x_next, y_next, function() {
        popQueue(loader, mazeInfo, q_idx + 1);
      });
    } else if( tile == "%" ) {
      moveCharacter(mazeInfo, x_next, y_next, function() {
        for(var i = 0; i < foods.length; i++) {
          if(foods[i].px == x_next && foods[i].py == y_next) {
            foods[i].visible = false;
            break;
          }
        }
        createjs.Sound.play("success");
        mazeInfo.canvas.stage.update();
        popQueue(loader, mazeInfo, q_idx + 1);
      });
    } else if( tile == "5" || tile == "4" || tile == "3" || tile == "2" || tile == "1" ) {
      for(var i = 0; i < mazeInfo.canvas.obstacles.length; i++) {
        if( mazeInfo.canvas.obstacles[i].px == x_next &&
            mazeInfo.canvas.obstacles[i].py == y_next) {
          kidscoding.queue = [];
          createjs.Sound.play("fail");
          bounceCharacter(mazeInfo, x_next, y_next, function() {
            showModal("바위에 막혔어요");
          });
        }
      }
      if(i == mazeInfo.canvas.obstacles.length) {
        moveCharacter(mazeInfo, x_next, y_next, function() {
          popQueue(loader, mazeInfo, q_idx + 1);
        });
      }
    } else if( tile == "R" || tile == "S" || tile == "P" ) {
      for(var i = 0; i < mazeInfo.canvas.spiders.length; i++) {
        if( mazeInfo.canvas.spiders[i].px == x_next &&
            mazeInfo.canvas.spiders[i].py == y_next &&
            mazeInfo.canvas.spiders[i].visible == true) {
          kidscoding.queue = [];
          createjs.Sound.play("fail");
          trapCharacter(mazeInfo, x_next, y_next, function() {
            showModal("거미줄에 걸렸어요");
          });
          break;
        }
      }
      if(i == mazeInfo.canvas.spiders.length) {
        moveCharacter(mazeInfo, x_next, y_next, function() {
          popQueue(loader, mazeInfo, q_idx + 1);
        });
      }
    } else if( tile == "^" ) {
      kidscoding.queue = [];
      createjs.Sound.play("fail");
      trapCharacter(mazeInfo, x_next, y_next, function() {
        showModal("덫에 걸렸어요");
      });
    } else { // 이동할 수 없다면
      kidscoding.queue = [];
      createjs.Sound.play("fail");
      bounceCharacter(mazeInfo, x_next, y_next, function() {
        showModal("벽에 부딪쳤어요");
      });
    }
  } else if(type == "rotate") {
    var rotation = character.rotation;
    if(args[0] == "left") {
      rotation -= 90;
    } else {
      rotation += 90;
    }
    rotateCharacter(mazeInfo, rotation, function() {
      popQueue(loader, mazeInfo, q_idx + 1);
    });
  } else if(type == "getItem") {
    if( character.px == mazeInfo.canvas.item.px &&
        character.py == mazeInfo.canvas.item.py) {
      character.item = true;
      mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.item);
      mazeInfo.canvas.stage.update();
      createjs.Sound.play("success");
      setTimeout(function() {
        popQueue(loader, mazeInfo, q_idx + 1);
      }, 500);
    } else { // 아이템을 가져올 수 없다면
      kidscoding.queue = [];
      showModal("아이템을 가져올 수 없어요");
    }
  } else if(type == "useItem") {
    var x_next = character.px,
        y_next = character.py,
        rotation = character.rotation,
        num;
    if(!character.item) {
      kidscoding.queue = [];
      createjs.Sound.play("fail");
      showModal("아이템을 가지고 있지 않아요");
      return;
    }
    if(rotation == 0) {
      y_next--;
    } else if(rotation == 90) {
      x_next++;
    } else if(rotation == 180) {
      y_next++;
    } else if(rotation == 270) {
      x_next--;
    }
    num = +mazeInfo.map[y_next][x_next];
    if(!isNaN(num)) {
      for(var i = 0; i < mazeInfo.canvas.obstacles.length; i++) {
        if( mazeInfo.canvas.obstacles[i].px == x_next &&
            mazeInfo.canvas.obstacles[i].py == y_next) {
          num = mazeInfo.canvas.obstacles[i].num;

          // remove rock
          mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.obstacles[i]);
          mazeInfo.canvas.obstacles.splice(i, 1);

          // add rock
          if(num > 1) {
            var bitmap = new createjs.Bitmap(loader.getResult("rock" + (num-1)));
            bitmap.type = "rock";
            bitmap.num = num - 1;
            mazeInfo.canvas.obstacles.push(bitmap);
            setBitmapCoord(bitmap, x_next, y_next);
            mazeInfo.canvas.stage.addChild(bitmap);
          }

          createjs.Sound.play("hammer");
          mazeInfo.canvas.stage.update();
          setTimeout(function() {
            popQueue(loader, mazeInfo, q_idx + 1);
          }, 1000);
          return;
        }
      }
      // 이미 바위가 없어져 아이템을 사용하지 않은 경우
      createjs.Sound.play("fail");
      kidscoding.queue = [];
      showModal("아이템을 사용할 수 없어요");
    } else {
      createjs.Sound.play("fail");
      kidscoding.queue = [];
      showModal("아이템을 사용할 수 없어요");
    }
  } else if(type == "action") {
    var x_next = character.px,
        y_next = character.py,
        rotation = character.rotation,
        hand = args[0];
    if(rotation == 0) {
      y_next--;
    } else if(rotation == 90) {
      x_next++;
    } else if(rotation == 180) {
      y_next++;
    } else if(rotation == 270) {
      x_next--;
    }
    if( mazeInfo.map[y_next][x_next] != "R" &&
        mazeInfo.map[y_next][x_next] != "S" &&
        mazeInfo.map[y_next][x_next] != "P") {
      createjs.Sound.play("fail");
      kidscoding.queue = [];
      showModal("가위바위보를 할 수 없어요");
      return;
    }
    var spider;
    for(var i = 0; i < mazeInfo.canvas.spiders.length; i++) {
      if( mazeInfo.canvas.spiders[i].px == x_next &&
          mazeInfo.canvas.spiders[i].py == y_next) {
        spider = mazeInfo.canvas.spiders[i];
      }
    }
    if(hand == spider.hand) {
      createjs.Sound.play("fail");
      kidscoding.queue = [];
      showModal("비겼어요");
      createjs.Sound.play("fail");
      return;
    }
    if( (hand == "rock"     && spider.hand == "paper") ||
        (hand == "scissors" && spider.hand == "rock") ||
        (hand == "paper"    && spider.hand == "scissors") ) {
      kidscoding.queue = [];
      showModal("졌어요");
      createjs.Sound.play("fail");
      return;
    }
    spider.visible = false;
    mazeInfo.canvas.stage.update();
    createjs.Sound.play("success");
    setTimeout(function() {
      popQueue(loader, mazeInfo, q_idx + 1);
    }, 500);
  } else if(type == "condition") {
    var x_next = character.px,
        y_next = character.py,
        rotation = character.rotation;
    if(args[0] == "if_move_forward") {
      rotation += 0;
    } else if(args[0] == "if_move_left") {
      rotation -= 90;
    } else if(args[0] == "if_move_right") {
      rotation += 90;
    }
    rotation = (rotation + 360) % 360;
    if(rotation == 0) {
      y_next -= 1;
    } else if(rotation == 90) {
      x_next += 1;
    } else if(rotation == 180) {
      y_next += 1;
    } else {
      x_next -= 1;
    }
    var tile = mazeInfo.map[y_next][x_next],
        move_forward = false;
    if( tile == "." || tile == "@" || tile == ")" || tile == "%" ) {
      move_forward = true;
    }
    var blocks = args[move_forward ? 1 : 2];
    var temp = kidscoding.queue.splice(q_idx+1, kidscoding.queue.length);
    eval("with(kidscoding){\n" + blocks + "\n}");
    kidscoding.queue = kidscoding.queue.concat(temp);
    setTimeout(function() {
      popQueue(loader, mazeInfo, q_idx + 1);
    }, 1);
  } else if(type == "repeat") {
    var x_next = character.px,
        y_next = character.py;
    var tile = mazeInfo.map[y_next][x_next];
    var count = parseInt(args[0], 10);
    if( tile != "%" && args[0] == "repeat_until" ) {
      var blocks = args[1];
      var temp = kidscoding.queue.splice(q_idx + 1, kidscoding.queue.length);
      eval("with(kidscoding){\n" + blocks + "\n}");
      kidscoding.queue.push(_.clone(kidscoding.queue[q_idx]));
      kidscoding.queue = kidscoding.queue.concat(temp);
    } else if(count > 0) {
      var blocks = args[1];
      var temp = kidscoding.queue.splice(q_idx + 1, kidscoding.queue.length);
      eval("with(kidscoding){\n" + blocks + "\n}");
      kidscoding.queue.push(_.clone(kidscoding.queue[q_idx]));
      --kidscoding.queue[kidscoding.queue.length -1].args[0];
      kidscoding.queue = kidscoding.queue.concat(temp);
    }
    setTimeout(function() {
      popQueue(loader, mazeInfo, q_idx + 1);
    }, 1);
  }
}

function resetMaze(loader, mazeInfo, org_px, org_py) {
  var character = mazeInfo.canvas.character;
  character.px = org_px;
  character.py = org_py;
  character.x = org_px * 50 + 25;
  character.y = org_py * 50 + 25;
  character.rotation = 0;
  character.item = false;

  if(mazeInfo.canvas.item) {
    mazeInfo.canvas.stage.addChild(mazeInfo.canvas.item);
  }

  // reset foods
  for(var i = 0; i < mazeInfo.canvas.foods.length; i++) {
    mazeInfo.canvas.foods[i].visible = true;
  }

  // reset rocks
  for(var i = 0; i < mazeInfo.canvas.obstacles.length; i++) {
    if(mazeInfo.canvas.obstacles[i].type == "rock") {
      mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.obstacles[i]);
      mazeInfo.canvas.obstacles.splice(i, 1);
    }
  }
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      switch(mazeInfo.map[i][j]) {
        case "5": // rock
        case "4":
        case "3":
        case "2":
        case "1":
          var num = +mazeInfo.map[i][j];
          var bitmap = new createjs.Bitmap(loader.getResult("rock" + num));
          bitmap.type = "rock";
          bitmap.num = num;
          mazeInfo.canvas.obstacles.push(bitmap);
          setBitmapCoord(bitmap, j, i);
          mazeInfo.canvas.stage.addChild(bitmap);
          break;
      }
    }
  }

  // reset spiders
  if(mazeInfo.canvas.spiders) {
    for(var i = 0; i < mazeInfo.canvas.spiders.length; i++) {
      mazeInfo.canvas.spiders[i].visible = true;
    }
  }

  // 캐릭터를 항상 위로
  mazeInfo.canvas.stage.removeChild(character);
  mazeInfo.canvas.stage.addChild(character);
  mazeInfo.canvas.stage.update();
}

function showModal(options) {
  if(typeof options == "string") {
    options = {
      msg: options,
      goNext: false,
      tutorial: false
    };
  }
  $("#modal .btn").hide();
  if(options.goNext) {
    $("#modal .go-next").show();
  } else if(options.tutorial) {
    $("#modal .tutorial").show();
  } else {
    $("#modal .close-modal").show();
  }
  if(options.video) {
    $("#modal .modal-msg-box").hide();
    $("#modal video").show();
    $("#modal video source").prop("src", options.video);
    $("#modal video").get(0).load();
  } else {
    $("#modal .modal-msg-box").show();
    $("#modal video").hide();
  }
  $("#modal .modal-msg").text(options.msg);
  $('#modal').modal({
    backdrop: "static"
  });
  $('#modal').modal('show');
}

function gameMove(e, loader, mazeInfo) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods,
      x_next = character.px,
      y_next = character.py,
      i = 0;
  switch(e.keyCode) {
    case 37: // left
      x_next--;
      break;
    case 38: // up
      y_next--;
      break;
    case 39: // right
      x_next++;
      break;
    case 40: //down
      y_next++;
      break;
    default:
      return;
  }
  e.preventDefault();
  if(createjs.Tween.hasActiveTweens()) {
    return;
  }

  if( mazeInfo.map[y_next][x_next] == "." ) {
    moveCharacter(mazeInfo, x_next, y_next, function() {
      for(i = 0; i < foods.length; i++) {
        if(foods[i].px == x_next && foods[i].py == y_next) {
          $("#scoreBox .score").text(++mazeInfo.score);
          removeFood(mazeInfo, x_next, y_next);
          addFood(loader, mazeInfo);
          break;
        }
      }
    });
  } else if( mazeInfo.map[y_next][x_next] == "^" ) {
    trapCharacter(mazeInfo, x_next, y_next, function() {
      // showModal("덫에 걸렸어요");
    });
  } else { // 이동할 수 없다면
    bounceCharacter(mazeInfo, x_next, y_next, function() {
      // showModal("벽에 부딪쳤어요");
    });
  }
}

function addFood(loader, mazeInfo) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods;
  var i, x, y;
  while(true) {
    x = parseInt(Math.random() * 6 + 1, 10);
    y = parseInt(Math.random() * 6 + 1, 10);
    if(character.px != x && character.py != y && mazeInfo.map[y][x] == ".") {
      for(i = 0; i < foods.length; i++) {
        if(foods[i].px == x && foods[i].py == y) {
          break;
        }
      }
      if(i == foods.length) {
        break;
      }
    }
  }
  var bitmap = new createjs.Bitmap(loader.getResult("food"));
  mazeInfo.canvas.foods.push(bitmap);
  setBitmapCoord(bitmap, x, y);
  mazeInfo.canvas.stage.addChild(bitmap);
  mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.character);
  mazeInfo.canvas.stage.addChild(mazeInfo.canvas.character);
  mazeInfo.canvas.stage.update();
}

function removeFood(mazeInfo, x, y) {
  var foods = mazeInfo.canvas.foods;
  var i;
  for(i = 0; i < foods.length; i++) {
    if(foods[i].px == x && foods[i].py == y) {
      mazeInfo.canvas.stage.removeChild(foods[i]);
      mazeInfo.canvas.stage.update();
      foods.splice(i, 1);
      break;
    }
  }
}
