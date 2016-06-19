(function($) {

var d1,
    d2,
    step,
    loader,
    mazeInfo,
    maze,
    kidscoding = new KidsCoding(),
    tileFactory = new TileFactory(),
    tutorial = null,
    tutorialIdx = 0,
    message_url = "";

page('*', function(ctx, next) {
  var hashbang = ctx.pathname.indexOf("#!"),
      pathname = hashbang >= 0 ? ctx.pathname.slice(hashbang + 2) : ctx.pathname,
      path = ["maze"].concat(pathname.split("/").filter(function(val) {
        return val;
      })),
      map_url = path.join("/") + ".json",
      manifest_url = path.slice(0, -1).concat(["manifest.json"]).join("/");

  // page 이동시 이전에 재생되던 bgm을 멈춤
  createjs.Sound.stop("bgm");

  step = path[path.length - 1];
  d1 = $.Deferred();
  d2 = $.Deferred();
  $.when( step, d1, d2 ).done(preInit);

  // load map json file
  $.getJSON(map_url, function(json) {
    maze = json;
    d1.resolve(json);
  }).fail(function(jqXHR, msg, err) {
    throw( "[" + msg + " - " + map_url + "]\n" + err.name + ": " + err.message);
  });

  // load manifest.json file
  $.getJSON(manifest_url, function(manifest) {
    var image_loader = new createjs.LoadQueue();
    var sound_loader = new createjs.LoadQueue();
    var getResult = image_loader.constructor.prototype.getResult;
    var newGetResult = function() {
      var result = getResult.apply(image_loader, arguments);
      if(result == null) {
        throw("[Cannot find \"" + arguments[0] + "\" on manifest.json]");
      }
      return result;
    };
    var noBgm = false;

    // loader for images
    image_loader.loadManifest(manifest.filter(function(item) {
      return item.type != "sound";
    }));
    image_loader.on("complete", function() {
      loader = image_loader;
      d2.resolve(image_loader);
    });
    image_loader.getResult = newGetResult;

    // loader for sounds
    createjs.Sound.alternateExtensions = ["mp3", "wav"];
    sound_loader.installPlugin(createjs.Sound);
    sound_loader.loadManifest(manifest.filter(function(item) {
      return item.type == "sound";
    }));
    sound_loader.on("complete", function() {
      if(!noBgm && sound_loader.getItem("bgm")) {
        $("#playstop").removeClass("hidden");
      }
    });
    sound_loader.on("error", function(e) {
      // 오프라인 모드에서 bgm 없을 경우 처리
      if(e.data.id == "bgm") {
        noBgm = true;
      }
    });
    sound_loader.getResult = newGetResult;
  }).fail(function(jqXHR, msg, err) {
    throw( "[" + msg + " - " + manifest_url + "]\n" + err.name + ": " + err.message);
  });

});

page({
  hashbang: true
});

addEvents();

function preInit() {
  //캐릭터 선택 팝업
  var queries = {},
      idx = location.hash.indexOf("?"),
      search = idx >= 0 ? location.hash.slice(idx + 1) : "";

  search.split("&").map(function(query) {
    var sp = query.split("=");
    if(sp[0]) {
      queries[sp[0]] = sp[1];
    }
  });

  if(maze.select_character && !queries.hasOwnProperty("x") && !queries.hasOwnProperty("y")) {
    showModal({
      select_character: true,
      character1: loader.getItem("message").src,
      character2: loader.getItem("message2").src
    });
  } else {
    init();
  }
}

function init() {
  var message_id = maze.message || maze.character,
      message_item = loader.getItem(message_id)
                  || loader.getItem("message")
                  || loader.getItem("character");
  // TODO: sprite일 경우도 message 캐릭터를 보여줄 수 있어야 함
  if(message_item && !message_item.sprite) {
    message_url = message_item.src;
  } else {
    message_url = "/img/ladybug.png";
  }

  var queries = {},
      idx = location.hash.indexOf("?"),
      search = idx >= 0 ? location.hash.slice(idx + 1) : "";

  search.split("&").map(function(query) {
    var sp = query.split("=");
    if(sp[0]) {
      queries[sp[0]] = sp[1];
    }
  });
  // index 화면 초기 구동시 localData 삭제
  if(!queries.hasOwnProperty("x") && !queries.hasOwnProperty("y") && !queries.hasOwnProperty("back")) {
    store.remove("data");
    store.remove('character');
    if(!maze.select_character) {
      store.remove('character_id');
      store.remove('message_id');
    }
  }

  tileFactory.init(maze, loader);
  if(store.get('character')) {
    message_url = decodeURIComponent(store.get('character'));
  }
  if(store.get('message_id')) {
    message_url = loader.getItem(store.get('message_id')).src;
  }

  initMaze();
  $("#runCode").html('<i class="fa fa-play"></i> 시작');
  if(maze.type != "world" && maze.type != "game") {
    $("#virtualKeypad").hide();
    $("#blocklyDiv").show();
    $("#scoreBox").hide();
    $("#runCode").show();
  } else {
    $("#virtualKeypad").show();
    $("#blocklyDiv").hide();
    $("#scoreBox").show();
    $("#runCode").hide();
  }
  drawMaze();
  kidscoding.init(loader, mazeInfo, run, tileFactory);
  kidscoding.initBlockly(maze.toolbox, maze.workspace);

  function blockLimitsHandler(event) {
    var xml = event.xml || event.oldXml,
        type = xml ? (xml.getAttribute("type") || "") : "";
    if(type == "start") {
      return;
    }
    if (event.type == Blockly.Events.CREATE || event.type == Blockly.Events.DELETE) {
      kidscoding.blockLimits[type] += event.type == Blockly.Events.CREATE ? -1 : 1;
      var toolbox = maze.toolbox.map(function(item) {
        var tokens = item.split(":"),
            disabled = kidscoding.blockLimits[tokens[0]] === 0 ? ' disabled="true"' : "";
        return '<block type="' + tokens[0] + '"' + disabled + '></block>';
      }).join("");
      kidscoding.workspace.updateToolbox('<xml>' + toolbox + '</xml>');
    }
  }
  kidscoding.workspace.addChangeListener(blockLimitsHandler);

  if(maze.type == "game" || maze.type == "world") {
    gameMode(loader, maze.type, tileFactory);
  }
  handle_resize();

  if(queries.hasOwnProperty("x") && queries.hasOwnProperty("y") && !queries.hasOwnProperty("back")) {
    // 월드맵이 있는 코스에서 한 스탭을 완료후 월드맵으로 돌아온 경우
    setBitmapCoord(mazeInfo.canvas.character, +queries.x, +queries.y);
    mazeInfo.canvas.stage.update();
    kidscoding.Actions._setFocus(mazeInfo.canvas.character.px, mazeInfo.canvas.character.py, 0, 0);
  } else {
    $("#runTutorial").removeClass("hidden");
    runTutorial(maze.tutorial);
  }
}

function initMaze() {
  var map_width = maze.map[0].length;
  var map_height = maze.map.length;

  mazeInfo = {
    map: maze.map.map(function(row) {
      return [].slice.call(new String(row));
    }),
    land: maze.land ? maze.land.map(function(row) {
      return [].slice.call(new String(row));
    }) : null,
    width: map_width,
    height: map_height,
    view_size: maze.view_size || null,
    tile_size: maze.tile_size || 50,
    canvas: {
      stage: new createjs.Stage("display"),
      character: null,
      items: [],
      foods: [],
      obstacles: [],
      others: []
    }
  };
  mazeInfo.canvas.stage.removeAllChildren();
  mazeInfo.canvas.stage.canvas.width = Math.min(mazeInfo.view_size || map_width, map_width) * mazeInfo.tile_size;
  mazeInfo.canvas.stage.canvas.height = Math.min(mazeInfo.view_size || map_height, map_height) * mazeInfo.tile_size;
  if(maze.render == "pixel") {
    var ctx = mazeInfo.canvas.stage.canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.oImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    $("#display").addClass("pixel");
  } else {
    $("#display").removeClass("pixel");
  }

  if(!mazeInfo.land && loader.getItem("background")) {
    // 1-image background
    var background = new createjs.Bitmap(loader.getResult("background"));
    mazeInfo.canvas.stage.addChild(background);
  } else if(!mazeInfo.land && loader.getItem("bg1")) {
    // mosaic background
    for(var i = 0; i < map_height; i++) {
      for(var j = 0; j < map_width; j++) {
        var idx = (i + j) % 2 + 1;
        var bg_tile = new createjs.Bitmap(loader.getResult("bg" + idx));
        setBitmapCoord(bg_tile, j, i);
        mazeInfo.canvas.stage.addChild(bg_tile);
      }
    }
  } else if(mazeInfo.land && loader.getItem("land0")) {
    // land background
    // +---+---+---+
    // | 0 | 1 | 2 |
    // +---+---+---+
    // | 3 | 4 | 5 |
    // +---+---+---+
    // | 6 | 7 | 8 |
    // +---+---+---+
    // urdl == 8421
    var arr = [4, 3, 7, 6, 5, 9, 8, 10, 1, 0, 7, 6, 2, 11, 8, 10];
    for(var i = 0; i < map_height; i++) {
      for(var j = 0; j < map_width; j++) {
        var tile = mazeInfo.land[i][j];
        var bg_tile = new createjs.Bitmap();
        if(tile == ".") {
          bg_tile.image = loader.getResult("land4");
        } else {
          var idx = 0,
              walls = [
                i == 0 ? "." : mazeInfo.land[i-1][j],
                j == map_width-1 ? "." : mazeInfo.land[i][j+1],
                i == map_height-1 ? "." : mazeInfo.land[i+1][j],
                j == 0 ? "." : mazeInfo.land[i][j-1]
              ];
          while(walls.length > 0) {
            idx <<= 1;
            if(walls.shift() != tile) {
              idx += 1;
            }
          }
          bg_tile.image = loader.getResult("land"+arr[idx]);
        }
        setBitmapCoord(bg_tile, j, i);
        mazeInfo.canvas.stage.addChild(bg_tile);
      }
    }
  }
  mazeInfo.canvas.stage.update();
}

function drawMaze() {
  var localData = store.get('data') || {},
      canvas = mazeInfo.canvas;
  for(var i = 0; i < mazeInfo.height; i++) {
    for(var j = 0; j < mazeInfo.width; j++) {
      if(maze.type == "world") {
        var extra = maze.extra ? maze.extra.filter(function(obj) {
          return obj.y == i && obj.x == j;
        })[0] : null;
        if(extra && extra.link) {
          // 이미 성공한 경우에는 별을 놓지 않아야 함
          var path = extra.link.split("/").slice(0, -1).join("/");
          if(localData[path] && localData[path].complete.indexOf(extra.link.split("/").slice(-1)[0]) >= 0) {
            continue;
          }
        }
      }
      var bitmap = tileFactory.create(mazeInfo.map[i][j], j, i);
      if(bitmap) {
        if(bitmap.role == "character") {
          canvas.character = bitmap;
        } else if(bitmap.role == "food") {
          canvas.foods.push(bitmap);
        } else if(bitmap.role == "item") {
          canvas.items.push(bitmap);
        } else if(bitmap.obstacle) {
          canvas.obstacles.push(bitmap);
        } else {
          canvas.others.push(bitmap);
        }
        canvas.stage.addChild(bitmap);
      }
    }
  }
  // 캐릭터를 항상 위로
  canvas.stage.removeChild(canvas.character);
  canvas.stage.addChild(canvas.character);
  canvas.stage.update();
}

function setBitmapCoord(bitmap, px, py) {
  var bounds = bitmap.getBounds();
  bitmap.px = px;
  bitmap.py = py;
  bitmap.x = mazeInfo.tile_size * px + mazeInfo.tile_size / 2;
  bitmap.y = mazeInfo.tile_size * py + mazeInfo.tile_size / 2;
  bitmap.scaleX = mazeInfo.tile_size / bounds.width;
  bitmap.scaleY = mazeInfo.tile_size / bounds.height;
  bitmap.regX = bounds.width / 2;
  bitmap.regY = bounds.height / 2;
}

function handle_resize(e) {
  var size = $(window).height() - $("#navbarMaze").height() - $("#maze-container .bottom-row").height();
  if($(window).width() / 2 < size) {
    size = parseInt($(window).width() / 2, 10);
  }
  var view_width = Math.min(mazeInfo.view_size || mazeInfo.width, mazeInfo.width),
      view_height = Math.min(mazeInfo.view_size || mazeInfo.height, mazeInfo.height),
      zoom = parseInt(100 * size / (view_width * mazeInfo.tile_size), 10) / 100;
  $("#display").css({
    width: view_width * mazeInfo.tile_size * zoom,
    height: view_height * mazeInfo.tile_size * zoom
  });

  var real_width = $("#display").width();
  $(".sidebar").width(real_width);
  $(".workspace").css("left", real_width + "px");
};

function addEvents() {
  $(document).on("contextmenu mousewheel", function(e) {
    e.preventDefault();
  });
  $(window).on("resize", handle_resize);
  $("#modal .go-next").click(function(e) {
    var queries = {},
        idx = location.hash.indexOf("?"),
        search = idx >= 0 ? location.hash.slice(idx + 1) : "";

    search.split("&").map(function(query) {
      var sp = query.split("=");
      if(sp[0]) {
        queries[sp[0]] = sp[1];
      }
    });
    if(queries.back) {
      var path = queries.back.split("/").slice(0, -1).join("/");
      var localData = store.get('data') || {};
      if(!localData[path]) {
        localData[path] = {
          score: 0,
          complete: []
        };
      }
      if(localData[path].complete.indexOf(step) < 0) {
        localData[path].complete.push(step);
        localData[path].score += maze.score || 1;
        store.set('data', localData);
      }
      page(queries.back + "?x=" + queries.x + "&y=" + queries.y);
      return;
    }
    var path = location.hash.slice(2).split("/").filter(function(val){
      return val;
    });
    $('#modal').modal('hide');
    page( path.slice(0, -1).concat([+step+1]).join("/") );
  });
  $("#modal .reset-maze").click(function(e) {
    $("#runCode").html('<i class="fa fa-play"></i> 시작');
    createjs.Tween.removeAllTweens();
    resetMaze(mazeInfo, maze, loader, tileFactory);
  });
  $("#runCode").click(function(e) {
    e.preventDefault();
    if($(this).find("i").hasClass("fa-play")) {
      var blocks = kidscoding.workspace.getAllBlocks(),
          startblock = blocks.filter(function(block) {
            return block.type === "start";
          })[0];;
      if(startblock.getNextBlock()) {
        $(this).html('<i class="fa fa-refresh"></i> 처음상태로');
        // remove the selection of the last-placed-block
        kidscoding.workspace.getAllBlocks().map(function(block) {
          block.removeSelect()
        });
        run(startblock, function() {
          var foods = mazeInfo.canvas.foods;
          if(foods.length == 1 && foods[0].itemCountBitmap) {
            var itemCount = foods[0].itemCountBitmap ? +foods[0].itemCountBitmap.textBitmap.text : 0;
            if(foods[0].useItem <= itemCount) {
              createjs.Sound.play("complete");
              if(maze.success) {
                runTutorial(maze.success);
              } else {
                showModal({
                  msg: "성공!",
                  goNext: true
                });
              }
            } else {
              createjs.Sound.play("fail");
              showModal("블럭을 다 썼지만 끝나지 않았어요");
            }
          } else {
            for(var i = 0; i < foods.length; i++) {
              if(foods[i].visible == true) {
                createjs.Sound.play("fail");
                showModal("블럭을 다 썼지만 끝나지 않았어요");
                break;
              }
            }
            if(i == foods.length) {
              createjs.Sound.play("complete");
              if(maze.success) {
                runTutorial(maze.success);
              } else {
                showModal({
                  msg: "성공!",
                  goNext: true
                });
              }
            }
          }
        });
      } else {
        showModal("블럭이 하나도 없어요!");
      }
    } else {
      $(this).html('<i class="fa fa-play"></i> 시작');
      createjs.Tween.removeAllTweens();
      resetMaze(mazeInfo, maze, loader, tileFactory);
    }
  });

  $("#playstop a").click(function(e) {
    e.preventDefault();
    if($("#playstop i").hasClass("fa-play")) {
      $("#playstop i").addClass("fa-stop");
      $("#playstop i").removeClass("fa-play");
      createjs.Sound.play("bgm", {loop: -1});
    } else {
      $("#playstop i").addClass("fa-play");
      $("#playstop i").removeClass("fa-stop");
      createjs.Sound.stop("bgm");
    }
  });
  $("#runTutorial a").click(function(e) {
    e.preventDefault();
    runTutorial(maze.tutorial);
  });
  function handleMove(e) {
    if(createjs.Tween.hasActiveTweens()) {
      return;
    }
    if(maze.type != "world" && maze.type != "game") {
      return;
    }
    // var direct = {37:"l", 38:"u", 39:"r", 40:"d", 32:"jump_forward"}[e.keyCode];
    var direct = e.type == "keydown" ? {37:"l", 38:"u", 39:"r", 40:"d"}[e.keyCode] : $(e.target).attr("data-direct");

    if(!direct) {
      return;
    }
    e.preventDefault();
    kidscoding.Actions.move(direct, {}, function(obj) {
      if(maze.type == "game" && obj && obj.role == "food") {
        obj.visible = false;
        createjs.Sound.play("success");
        mazeInfo.canvas.stage.update();
        $("#scoreBox .score").text(++mazeInfo.score);
        addFood();
      }
      if(obj && obj.link) {
        var localData = store.get('data') || {};
        var hash = location.hash.slice(2),
            idx = hash.indexOf("?"),
            path = idx >= 0 ? hash.slice(0, idx) : hash;
        path = path.split("/").slice(0, -1).join("/");
        var score = localData[path] ? localData[path].score || 0 : 0;
        if(!obj.min_score || score >= obj.min_score) {
          var temp = "?back=" + (idx >= 0 ? hash.slice(0, idx) : hash) + "&x=" + mazeInfo.canvas.character.px + "&y=" + mazeInfo.canvas.character.py;
          if(obj.link.slice(-5) == "index") {
            // 새로운 index로 넘어갈땐 돌아올 필요가 없음
            temp = "";
          }
          page(obj.link + temp);
        } else {
          showModal("별을 " + obj.min_score + "개 이상 모아야 해요");
        }
      }
      if(obj && obj.tutorial) {
        runTutorial(obj.tutorial);
      }
    });
  }
  $(document).keydown(handleMove);
  $("#virtualKeypad .key").click(handleMove);

  $("#modal .tutorial").click(function handleClick(e) {
    var tItem = tutorial[tutorialIdx],
        link = tutorial[tutorialIdx-1] ? tutorial[tutorialIdx-1].link : null;
    if(link) {
      if(link.slice(0, 7) == "http://" || link.slice(0, 1) == "/") {
        location.href = link;
      } else {
        page(link);
      }
      return;
    }
    if(tutorialIdx < tutorial.length) {
      if(tItem.hasOwnProperty("x") && tItem.hasOwnProperty("y")) {
        kidscoding.Actions._setFocus(tItem.x, tItem.y, 0, 500);
      }
      showModal({
        video: tItem.video,
        msg: tItem.msg,
        img: tItem.img,
        link: tItem.link,
        tutorial: true
      });
    } else {
      $('#modal').modal('hide');
      kidscoding.Actions._setFocus(mazeInfo.canvas.character.px, mazeInfo.canvas.character.py, 0, 1000);
    }
    tutorialIdx++;
  });

  $("#modal .character1-modal, #modal .character2-modal").click(function(e) {
    var isFirst = $(e.currentTarget).hasClass("character1-modal"),
        character = isFirst ? "character" : "character2",
        message = isFirst ? "message" : "message2";
    store.set("character_id", character);
    store.set("message_id", message);
    init();
  });
}

function runTutorial(input_tutorial) {
  if(!input_tutorial) {
    return;
  }
  tutorial = input_tutorial;
  tutorialIdx = 0;
  $('#modal').modal('hide');
  $("#modal .tutorial").click();
}

function gameMode(loader, type, tileFactory) {
  var character = mazeInfo.canvas.character,
      foods = mazeInfo.canvas.foods,
      stage = mazeInfo.canvas.stage;
  mazeInfo.score = 0;
  function addFood() {
    var i, x, y;
    while(true) {
      x = parseInt(Math.random() * mazeInfo.width + 1, 10);
      y = parseInt(Math.random() * mazeInfo.height + 1, 10);
      if(character.px == x && character.py == y) {
        continue;
      }
      var obj = kidscoding.Actions._getCanvasObject(x, y);
      if(!obj) {
        for(i = 0; i < foods.length; i++) {
          if(foods[i].visible == false) {
            foods[i].visible = true;
            tileFactory.setBitmapCoord(foods[i], x, y);
            break;
          }
        }
        if(i == foods.length) {
          var bitmap = tileFactory.create("%", x, y);
          foods.push(bitmap);
          stage.addChild(bitmap);
        }
        break;
      }
    }
    stage.removeChild(character);
    stage.addChild(character);
    stage.update();
  }
  if(type == "game") {
    addFood();
  }
  $("#scoreBox .food").replaceWith(loader.getResult("food"));

  var localData = store.get('data') || {};
  var hash = location.hash.slice(2),
      idx = hash.indexOf("?"),
      path = idx >= 0 ? hash.slice(0, idx) : hash;
  path = path.split("/").slice(0, -1).join("/");
  var score = localData[path] ? localData[path].score || 0 : 0;
  $("#scoreBox .score").text(score);
}

function run(block, callback) {
  if(!block) {
    callback();
    return;
  }
  var action = Blocks[block.type].action;
  if(typeof action == "function") {
    action = action(block);
  }
  block.addSelect();
  if(action) {
    var type = action[0],
        args = action.slice(1);
    args.push(block);
    args.push(function(obj) {
      if( typeof obj == "string") {
        // TODO: fix this later
        // jQuery's class manipulation functions do not work with the SVG elements
        // See: http://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
        var $svg = $(block.svgGroup_).find(".blocklyPath"),
            className = $svg.attr("class");
        $svg.attr("class", className + " error");

        createjs.Sound.play("fail");
        showModal(obj);
        return;
      }
      if( obj && typeof obj == "object" ) {
        if( obj.obstacle ) {
          // TODO: fix this later
          // jQuery's class manipulation functions do not work with the SVG elements
          // See: http://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
          var $svg = $(block.svgGroup_).find(".blocklyPath"),
              className = $svg.attr("class");
          $svg.attr("class", className + " error");
          createjs.Sound.play("fail");
          showModal("벽에 부딪쳤어요");
          return;
        }
        if( obj.role == "food" && !obj.useItem) {
          obj.visible = false;
          createjs.Sound.play("success");
          mazeInfo.canvas.stage.update();
        }
        // // 쓰이는 경우가 없어서 주석처리함
        // if(obj.link) {
        //   location.href = location.protocol + "//" + location.host + obj.link + "?back=" + location.pathname;
        // }
        if(obj.tutorial) {
          runTutorial(obj.tutorial);
        }
      }
      setTimeout(function() {
        block.removeSelect();
        run(block.getNextBlock(), callback);
      }, 1);
    });
    kidscoding.Actions[type].apply(kidscoding.Actions, args);
  } else {
    setTimeout(function() {
      block.removeSelect();
      run(block.getNextBlock(), callback);
    }, 500);
  }
}

function resetMaze(mazeInfo, maze, loader, tileFactory) {
  // TODO: fix this later
  // jQuery's class manipulation functions do not work with the SVG elements
  // See: http://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
  var $svg = $(".workspace .error"),
      className = $svg.attr("class");
  if(className) {
    var newClassName = className.split(" ").filter(function(name) {return name != "error"}).join(" ");
    $svg.attr("class", newClassName);
  }

  clearTimeout(kidscoding.Actions.setTimeoutKey);

  mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.character);
  mazeInfo.canvas.items.map(function(item) {
    mazeInfo.canvas.stage.removeChild(item);
  });
  mazeInfo.canvas.foods.map(function(food) {
    mazeInfo.canvas.stage.removeChild(food);
  });
  mazeInfo.canvas.obstacles.map(function(obstacle) {
    mazeInfo.canvas.stage.removeChild(obstacle);
  });
  mazeInfo.canvas.others.map(function(obj) {
    mazeInfo.canvas.stage.removeChild(obj);
  });
  mazeInfo.canvas.character = null;
  mazeInfo.canvas.items = [];
  mazeInfo.canvas.foods = [];
  mazeInfo.canvas.obstacles = [];
  mazeInfo.canvas.others = [];
  mazeInfo = drawMaze(mazeInfo, maze, loader, tileFactory);
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
    $("#modal .go-next, #modal .reset-maze").show();
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
  if(options.select_character){
    $("#modal .modal-msg-box").hide();
    $("#modal .modal-select").show();
    $("#modal .character1-modal").show();
    $("#modal .character2-modal").show();
    $("#modal .modal-character1").attr("src", options.character1);
    $("#modal .modal-character2").attr("src", options.character2);
    $("#modal .modal-footer .tutorial").hide();
  } else {
    $("#modal .modal-msg-box").show();
    $("#modal .modal-select").hide();
  }
  var img_src = options.img || message_url;
  $(".modal-msg-box img").attr("src", img_src);
  $("#modal .modal-msg").html(options.msg);
  $('#modal').modal({
    backdrop: "static"
  });
  $('#modal').modal('show');
}

})(jQuery);
