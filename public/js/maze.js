(function($) {

var d1 = $.Deferred(),
    d2 = $.Deferred(),
    path = location.pathname.split("/"),
    path = path.length == 3 ? path.concat(["index"]) : path,
    map_url = path.join("/") + ".json",
    manifest_url = path.slice(0, -1).concat(["manifest.json"]).join("/"),
    step = path[3];

// load map json file
$.getJSON(map_url, function(json) {
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

  // loader for images
  image_loader.loadManifest(manifest.filter(function(item) {
    return item.type != "sound";
  }));
  image_loader.on("complete", function() {
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
    if(sound_loader.getItem("bgm")) {
      createjs.Sound.play("bgm", {loop: -1});
      $("#playstop").removeClass("hidden");
    }
  });
  sound_loader.getResult = newGetResult;
}).fail(function(jqXHR, msg, err) {
  throw( "[" + msg + " - " + manifest_url + "]\n" + err.name + ": " + err.message);
});

$.when( step, d1, d2 ).done(init);

var kidscoding,
    mazeInfo;

function init(step, maze, loader) {
  var tileFactory = new TileFactory(maze, loader, maze.tile_size || 50);
  mazeInfo = initMaze(maze, loader, tileFactory);
  mazeInfo = drawMaze(mazeInfo, maze, loader, tileFactory);
  kidscoding = new KidsCoding(loader, mazeInfo, run);
  if(maze.type != "world" && maze.type != "game") {
    kidscoding.initBlockly(maze.toolbox, maze.workspace);
  } else {
    $("#virtualKeypad").show();
    $("#blocklyDiv").hide();
  }

  var queries = {};
  location.search.slice(1).split("&").map(function(query) {
    var sp = query.split("=");
    if(sp[0]) {
      queries[sp[0]] = sp[1];
    }
  });

  if(maze.type == "game" || maze.type == "world") {
    gameMode(loader, maze.type, tileFactory);
  } else {
    $("#runCode").show();
  }

  addEvents(step, loader, mazeInfo, maze, tileFactory);

  if(queries.hasOwnProperty("x") && queries.hasOwnProperty("y") && !queries.hasOwnProperty("back")) {
    setBitmapCoord(mazeInfo.canvas.character, +queries.x, +queries.y);
    mazeInfo.canvas.stage.update();
    kidscoding.Actions._setFocus(mazeInfo.canvas.character.px, mazeInfo.canvas.character.py, 0, 0);

  } else {
    $("#runTutorial").removeClass("hidden");
    runTutorial(maze.tutorial);
  }
}

function initMaze(maze, loader, tileFactory) {
  var stage = new createjs.Stage("display");
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
      stage: stage,
      character: null,
      item: null,
      foods: [],
      obstacles: [],
      others: []
    }
  };
  stage.canvas.width = Math.min(mazeInfo.view_size || map_width, map_width) * mazeInfo.tile_size;
  stage.canvas.height = Math.min(mazeInfo.view_size || map_height, map_height) * mazeInfo.tile_size;
  if(maze.render == "pixel") {
    var ctx = stage.canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.oImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    $("#display").addClass("pixel");
  }

  if(!mazeInfo.land && loader.getItem("background")) {
    // 1-image background
    var background = new createjs.Bitmap(loader.getResult("background"));
    stage.addChild(background);
  } else if(!mazeInfo.land && loader.getItem("bg1")) {
    // mosaic background
    for(var i = 0; i < map_height; i++) {
      for(var j = 0; j < map_width; j++) {
        var idx = (i + j) % 2 + 1;
        var bg_tile = new createjs.Bitmap(loader.getResult("bg" + idx));
        setBitmapCoord(bg_tile, j, i);
        stage.addChild(bg_tile);
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
        stage.addChild(bg_tile);
      }
    }
  }

  return mazeInfo;
}

function drawMaze(mazeInfo, maze, loader, tileFactory) {
  var localData = store.get('data') || {};
  for(var i = 0; i < mazeInfo.height; i++) {
    for(var j = 0; j < mazeInfo.width; j++) {
      if(maze.type == "world") {
        var extra = maze.extra ? maze.extra.filter(function(obj) {
          return obj.y == i && obj.x == j;
        })[0] : null;
        if(extra && extra.link) {
          var path = extra.link.split("/").slice(1, -1).join("/");
          if(localData[path] && localData[path].complete.indexOf(extra.link.split("/").slice(-1)[0]) >= 0) {
            continue;
          }
        }
      }
      var bitmap = tileFactory.create(mazeInfo.map[i][j], j, i);
      switch(bitmap ? bitmap.role : null) {
        case "character":
          mazeInfo.canvas.character = bitmap;
          break;
        case "food":
          mazeInfo.canvas.foods.push(bitmap);
          break;
        case "item":
          mazeInfo.canvas.item = bitmap;
          break;
      }
      if(bitmap) {
        if(bitmap.obstacle) {
          mazeInfo.canvas.obstacles.push(bitmap);
        }
        if(bitmap.role != "character" && bitmap.role != "food" && bitmap.role != "item") {
          mazeInfo.canvas.others.push(bitmap);
        }
        mazeInfo.canvas.stage.addChild(bitmap);
      }
    }
  }
  // 캐릭터를 항상 위로
  mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.character);
  mazeInfo.canvas.stage.addChild(mazeInfo.canvas.character);
  mazeInfo.canvas.stage.update();
  return mazeInfo;
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

function addEvents(step, loader, mazeInfo, maze, tileFactory) {
  $(document).on("contextmenu mousewheel", function(e) {
    e.preventDefault();
  });
  var handle_resize = function(e) {
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
  $(window).on("resize", handle_resize);
  handle_resize();
  $("#modal .go-next").click(function(e) {
    var queries = {};
    location.search.slice(1).split("&").map(function(query) {
      var sp = query.split("=");
      if(sp[0]) {
        queries[sp[0]] = sp[1];
      }
    });
    if(queries.back) {
      var path = location.pathname.split("/").slice(1, -1).join("/");
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
      location.href = location.protocol + "//" + location.host + queries.back + "?x=" + queries.x + "&y=" + queries.y;
      return;
    }
    var path = location.pathname.split("/").filter(function(val){
      return val
    });
    location.pathname = path.slice(0, -1).join("/") + "/"+ (+path.slice(-1)[0] + 1);
  });
  $("#modal .reset-maze").click(function(e) {
    $("#runCode").html('<i class="fa fa-play"></i> 시작');
    createjs.Tween.removeAllTweens();
    resetMaze(mazeInfo, maze, loader, tileFactory);
  });
  var org_px = mazeInfo.canvas.character.px,
      org_py = mazeInfo.canvas.character.py;
  $("#runCode").click(function(e) {
    if($(this).find("i").hasClass("fa-play")) {
      var startblock = kidscoding.workspace.getBlockById("start");
      if(startblock.getNextBlock()) {
        $(this).html('<i class="fa fa-refresh"></i> 처음상태로');
        // remove the selection of the last-placed-block
        kidscoding.workspace.getAllBlocks().map(function(block) {
          block.removeSelect()
        });
        run(startblock, function() {
          var foods = mazeInfo.canvas.foods;
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
  $("#runTutorial a").click(function() {
    runTutorial(maze.tutorial);
  });
}

function runTutorial(tutorial) {
  var idx = 0;
  if(!tutorial) {
    return;
  }
  $("#modal .tutorial").click(function handleClick(e) {
    if(idx > 0 && tutorial[idx-1].link) {
      location.href = tutorial[idx-1].link;
    } else if(idx < tutorial.length) {
      if(tutorial[idx].hasOwnProperty("x") && tutorial[idx].hasOwnProperty("y")) {
        kidscoding.Actions._setFocus(tutorial[idx].x, tutorial[idx].y, 0, 500);
      }
      showModal({
        video: tutorial[idx].video,
        msg: tutorial[idx].msg,
        img: tutorial[idx].img,
        link: tutorial[idx].link,
        tutorial: true
      });
    } else {
      $("#modal .tutorial").off("click", handleClick);
      $('#modal').modal('hide');
      kidscoding.Actions._setFocus(mazeInfo.canvas.character.px, mazeInfo.canvas.character.py, 0, 1000);
    }
    idx++;
  });
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
      if(obj.role == "empty") {
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
  $("#scoreBox").show();
  $("#scoreBox .food").replaceWith(loader.getResult("food"));
  var localData = store.get('data') || {};

  var path = location.pathname.split("/");
  path = path.length == 3 ? path.concat(["index"]) : path;
  path = path.slice(1, -1).join("/");
  $("#scoreBox .score").text(localData[path] ? localData[path].score || 0 : 0);

  $("#runCode").hide();
  $(document).keydown(function(e) {
    if(createjs.Tween.hasActiveTweens()) {
      return;
    }
    // var direct = {37:"l", 38:"u", 39:"r", 40:"d", 32:"jump_forward"}[e.keyCode];
    var direct = {37:"l", 38:"u", 39:"r", 40:"d"}[e.keyCode];
    if(!direct) {
      return;
    }
    e.preventDefault();
    kidscoding.Actions.move(direct, {}, function(obj) {
      if(type == "game" && obj.role == "food") {
        obj.visible = false;
        createjs.Sound.play("success");
        mazeInfo.canvas.stage.update();
        $("#scoreBox .score").text(++mazeInfo.score);
        addFood();
      }
      if(obj.link) {
        location.href = location.protocol + "//" + location.host + obj.link + "?back=" + location.pathname + "&x=" + character.px + "&y=" + character.py;
      }
      if(obj.tutorial) {
        runTutorial(obj.tutorial);
      }
    });
  });
  $("#virtualKeypad .key").click(function(e) {
    if(createjs.Tween.hasActiveTweens()) {
      return;
    }
    var direct = $(e.target).attr("data-direct");
    if(!direct) {
      return;
    }
    e.preventDefault();
    kidscoding.Actions.move(direct, {}, function(obj) {
      if(type == "game" && obj.role == "food") {
        obj.visible = false;
        createjs.Sound.play("success");
        mazeInfo.canvas.stage.update();
        $("#scoreBox .score").text(++mazeInfo.score);
        addFood();
      }
      if(obj.link) {
        location.href = location.protocol + "//" + location.host + obj.link + "?back=" + location.pathname + "&x=" + character.px + "&y=" + character.py;
      }
      if(obj.tutorial) {
        runTutorial(obj.tutorial);
      }
    });
  });
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
      if( typeof obj == "object" && obj != null) {
        if( obj.obstacle ) {
          // TODO: fix this later
          // jQuery's class manipulation functions do not work with the SVG elements
          // See: http://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
          var $svg = $(block.svgGroup_).find(".blocklyPath"),
              className = $svg.attr("class");
          $svg.attr("class", className + " error");

          var message = {
            rock: "바위에 막혔어요",
            obstacle: "벽에 부딪쳤어요",
            spider: "거미줄에 걸렸어요",
            trap: "덫에 걸렸어요"
          }[obj.role];
          createjs.Sound.play("fail");
          showModal(message);
          return;
        }
        if( obj.role == "food" ) {
          obj.visible = false;
          createjs.Sound.play("success");
          mazeInfo.canvas.stage.update();
        }
        if(obj.link) {
          location.href = location.protocol + "//" + location.host + obj.link + "?back=" + location.pathname;
        }
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
  mazeInfo.canvas.stage.removeChild(mazeInfo.canvas.item);
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
  mazeInfo.canvas.item = null
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
  var img_src = options.img || "/img/ladybug.png";
  $(".modal-msg-box img").attr("src", img_src);
  $("#modal .modal-msg").html(options.msg);
  $('#modal').modal({
    backdrop: "static"
  });
  $('#modal').modal('show');
}

})(jQuery);
