(function($) {

var loader = new createjs.LoadQueue();
var d1 = $.Deferred();
var d2 = $.Deferred();
var d3 = $.Deferred();
var type = location.pathname.split("/")[2];
var step = location.pathname.split("/")[3];

createjs.Sound.alternateExtensions = ["mp3", "wav"];
loader.installPlugin(createjs.Sound);
$.getJSON(location.pathname + ".json", function(json) {
  loader.loadManifest(json.manifest);
  d3.resolve(json);
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
$(function() {
  d2.resolve();
});
$.when( step, d3, loader, d1, d2 ).done(init);

var kidscoding;

function init(step, maze, loader) {
  var mazeInfo = drawMaze(maze, loader);
  kidscoding = new KidsCoding(loader, mazeInfo);
  kidscoding.initBlockly(maze.toolbox);
  addEvents(step, loader, mazeInfo, maze.type || "");
  runTutorial(maze);
}

function drawMaze(maze, loader) {
  var stage = new createjs.Stage("display");
  var map_width = maze.map[0].length;
  var map_height = maze.map.length;

  stage.canvas.width = (maze.view_size || map_width) * 50;
  stage.canvas.height = (maze.view_size || map_height) * 50;

  if(loader.getItem("background")) {
    var background = new createjs.Bitmap(loader.getResult("background"));
    stage.addChild(background);
  } else if(loader.getItem("bg1")) {
    for(var i = 0; i < map_height; i++) {
      for(var j = 0; j < map_width; j++) {
        var idx = (i + j) % 2 + 1;
        var bg_tile = new createjs.Bitmap(loader.getResult("bg" + idx));
        setBitmapCoord(bg_tile, j, i);
        stage.addChild(bg_tile);
      }
    }
  }
  var character = new createjs.Bitmap();
  var mazeInfo = {
    map: maze.map.map(function(row) {
      return [].slice.call(new String(row));
    }),
    width: map_width,
    height: map_height,
    view_size: maze.view_size || null,
    canvas: {
      stage: stage,
      character: character,
      foods: [],
      obstacles: []
    }
  };

  var obstacle_ids = maze.manifest
      .filter(function(el){
        return el.obstacle;
      })
      .map(function(el) {
        return el.id || el;
      });
  for(var i = 0; i < map_height; i++) {
    for(var j = 0; j < map_width; j++) {
      switch(mazeInfo.map[i][j]) {
        case "u": // directed character
        case "d":
        case "l":
        case "r":
          character.image = loader.getResult("character_" + mazeInfo.map[i][j]);
          character.direct = character.initDirect = mazeInfo.map[i][j];
          character.rotate_mode = "image";
          setBitmapCoord(mazeInfo.canvas.character, j, i);
          mazeInfo.map[i][j] = ".";
          break;
        case "@": // undirected character
          character.image = loader.getResult("character");
          character.direct = character.initDirect = "u";
          character.rotate_mode = "rotation";
          setBitmapCoord(mazeInfo.canvas.character, j, i);
          mazeInfo.map[i][j] = ".";
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
          bitmap.img1 = loader.getResult("rock1");
          bitmap.img2 = loader.getResult("rock2");
          bitmap.img3 = loader.getResult("rock3");
          bitmap.img4 = loader.getResult("rock4");
          bitmap.img5 = loader.getResult("rock5");
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
  var bounds = bitmap.getBounds();
  bitmap.px = px;
  bitmap.py = py;
  bitmap.x = 50 * px + 25;
  bitmap.y = 50 * py + 25;
  bitmap.scaleX = 50 / bounds.width;
  bitmap.scaleY = 50 / bounds.height;
  bitmap.regX = bounds.width / 2;
  bitmap.regY = bounds.height / 2;
}

function addEvents(step, loader, mazeInfo, type) {
  $(document).on("contextmenu mousewheel", function(e) {
    e.preventDefault();
  });
  var handle_resize = function(e) {
    var size = $(window).height() - $("#navbarMaze").height() - $("#maze-container .row").height();
    if($(window).width() / 2 < size) {
      size = parseInt($(window).width() / 2, 10);
    }
    var view_size = mazeInfo.view_size || mazeInfo.width;
    var zoom = size / (view_size * 50);
    zoom = parseInt(zoom * 100, 10) / 100;
    $("#display").css("zoom", zoom);
    var real_width = parseInt($("#display").width() * zoom + 0.5, 10);
    $(".sidebar").width(real_width);
    $(".workspace").css("left", real_width + "px");
  };
  $(window).on("resize", handle_resize);
  handle_resize();
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
      var code = Blockly.JavaScript.workspaceToCode(kidscoding.workspace);
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
      eval("with(kidscoding){\n" + code + "\n}");
      if(kidscoding.queue.length == 0) {
        showModal("블럭이 하나도 없어요!");
      } else {
        kidscoding.q_idx = 0;
        popQueue(loader, mazeInfo);
      }
    } else {
      $(this).html('<i class="fa fa-play"></i> 시작');
      createjs.Tween.removeAllTweens();
      kidscoding.queue.splice(0, kidscoding.queue.length);
      resetMaze(loader, mazeInfo, org_px, org_py);
    }
  });

  if(type == "game") {
    mazeInfo.score = 0;
    addFood(loader, mazeInfo);
    $("#scoreBox").show();
    $("#runCode").hide();
    $(document).keydown(function(e) {
      var direct = {37: "l", 38: "u", 39: "r", 40: "d"}[e.keyCode];
      if(!direct) {
        return;
      }
      e.preventDefault();
      kidscoding.Actions._gameMove.call(kidscoding.Actions, direct, function(tile) {
        if(tile == ".") {
          var character = mazeInfo.canvas.character,
              foods = mazeInfo.canvas.foods;
          for(var i = 0; i < foods.length; i++) {
            if(foods[i].px == character.px && foods[i].py == character.py) {
              $("#scoreBox .score").text(++mazeInfo.score);
              mazeInfo.canvas.stage.removeChild(foods[i]);
              mazeInfo.canvas.stage.update();
              foods.splice(i, 1);
              addFood(loader, mazeInfo);
              break;
            }
          }
        }
      });
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

function popQueue(loader, mazeInfo) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods,
      q_idx = kidscoding.q_idx,
      queue = kidscoding.queue;
  if(q_idx == queue.length) {
    queue.splice(0, queue.length);
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
  var type = queue[q_idx].type;
  var args = queue[q_idx].args.concat([function(err) {
    if(err) {
      queue.splice(0, queue.length);
      createjs.Sound.play("fail");
      showModal(err);
    } else {
      setTimeout(function() {
        kidscoding.q_idx++;
        popQueue(loader, mazeInfo);
      }, 1);
    }
  }]);
  kidscoding.Actions[type].apply(kidscoding.Actions, args);
}

function resetMaze(loader, mazeInfo, org_px, org_py) {
  var character = mazeInfo.canvas.character;
  character.px = org_px;
  character.py = org_py;
  character.x = org_px * 50 + 25;
  character.y = org_py * 50 + 25;
  character.rotation = 0;
  character.item = false;
  character.direct = character.initDirect;
  if(character.rotate_mode == "image") {
    character.image = loader.getResult("character_" + character.direct);
  }

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
  for(var i = 0; i < mazeInfo.height; i++) {
    for(var j = 0; j < mazeInfo.width; j++) {
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




})(jQuery);
