(function($) {

var d1,
    d2,
    loader,
    mazeInfo,
    maze,
    kidscoding = new KidsCoding(),
    tileFactory = new TileFactory(),
    drawFactory = new DrawFactory(),
    history = new History(),
    dialogue = null,
    dialogueIdx = 0,
    dialogueCallback = null,
    message_url = "",
    messages = null,
    map_path = null,
    map_qs = {},
    resize_debounce = 50,
    resize_timeoutkey,
    blink_debounce = 50,
    blink_timeoutkey,
    isMoving;

page('*', function(ctx, next) {
  var hashbang = ctx.pathname.indexOf("#!"),
      pathname = hashbang >= 0 ? ctx.pathname.slice(hashbang + 2) : ctx.pathname,
      path,
      map_url,
      manifest_url,
      idx;
  path = pathname.split("/").filter(function(val) {
    return val;
  });
  map_url = "maze/" + path.join("/") + ".json";
  manifest_url = "maze/" + path.slice(0, -1).concat(["manifest.json"]).join("/");

  // page 이동시 이전에 재생되던 bgm을 멈춤
  createjs.Sound.stop("bgm");

  // devtool 초기화
  devtool._drawFinished = false;
  devtool.actions = [];

  d1 = $.Deferred();
  d2 = $.Deferred();
  d3 = $.Deferred();
  $.when( d1, d2, d3 ).done(preInit);

  // load map json file
  $.getJSON(map_url, function(json) {
    maze = json;
    map_path = path;
    map_qs = {};
    ctx.querystring.split("&").forEach(function(str) {
      var token = str.split("=");
      map_qs[token[0]] = token[1];
    });
    var lang = store.session.get("lang", "ko");
    if(map_qs.lang) {
      lang = map_qs.lang;
      store.session.set("lang", lang);
    }
    $.getJSON("/msg/" + lang + ".json", function(msg_obj) {
      messages = msg_obj;
      Object.keys(msg_obj).forEach(function(key) {
        $("[data-msg=" + key + "]").text(msg_obj[key]);
      });
      $("[data-msg=title]").text(/^\w\d/.test(map_path[0]) ? messages.kidsthinking : messages.kidscoding);
      $("[data-msg=header]").text(/^\w\d/.test(map_path[0]) ? messages.header_kidsthinking : messages.header_kidscoding);
      // TODO: 이어하기 기능
      // if(last_path && last_path != ctx.path) {
      //   showModal({
      //     msg: messages.ask_continue,
      //     confirm: true,
      //     onConfirmYes: function() {
      //
      //       page(last_path);
      //     },
      //     onConfirmNo: function() {
      //       d1.resolve(json);
      //     }
      //   });
      // } else {
        d1.resolve(json);
      // }
    });
  }).fail(function(jqXHR, msg, err) {
    console.log( "[" + msg + " - " + map_url + "]\n" + err.name + ": " + err.message);
    alert("잘못된 경로로 접속하셨습니다.");
  });

  // load manifest.json file
  $.getJSON(manifest_url, function(manifest) {
    manifest = manifest.filter(function(item) {
      return !(item.book && item.title);
    });
    var image_loader = new createjs.LoadQueue();
    var sound_loader = new createjs.LoadQueue();
    // var font_loader = new createjs.FontLoader({
    //   src: ["/fonts/DSEG7Classic-Bold.woff", "/fonts/DSEG7Classic-Bold.ttf"],
    //   type: "font"
    // }, true);

    var getResult = image_loader.constructor.prototype.getResult;
    var newGetResult = function() {
      var result = getResult.apply(image_loader, arguments);
      if(result == null) {
        throw("[Cannot find \"" + arguments[0] + "\" on manifest.json]");
      }
      return result;
    };
    var noBgm = false;

    var newGetimgsrc = function(imageId) {
      for(var i = 0; i<manifest.length;i++){
        if(manifest[i].id==imageId) return manifest[i].src;
      }
      throw("[Cannot find \"" + imageId + "\" on manifest.json]");
    };

    // loader for images
    image_loader.loadManifest(manifest.filter(function(item) {
      return item.type != "sound";
    }));
    image_loader.on("complete", function() {
      loader = image_loader;
      d2.resolve(image_loader);
    });
    image_loader.getResult = newGetResult;
    image_loader.getImgsrc = newGetimgsrc;

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

    // font_loader.on("complete", function() {
    //   d3.resolve(font_loader);
    // });
    // font_loader.load();
    d3.resolve();
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
  if(maze.select_character && !store.session.has("character_id")) {
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
                  || loader.getItem("character"),
      fullscreenEnabled =
          document.fullscreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.msFullscreenEnabled;
  // TODO: sprite일 경우도 message 캐릭터를 보여줄 수 있어야 함
  if(message_item && !message_item.sprite) {
    message_url = message_item.src;
  } else {
    message_url = "/img/ladybug.png";
  }

  // 키즈씽킹 / 키즈코딩 타이틀 설정
  document.title = /^\w\d/.test(map_path[0]) ? messages.kidsthinking : messages.kidscoding;

  history.init(map_path[0], map_path[1]);
  tileFactory.init(maze, loader);
  drawFactory.init(maze);
  if(store.session.get("character")) {
    message_url = decodeURIComponent(store.session.get("character"));
  }
  if(store.session.get("message_id")) {
    message_url = loader.getItem(store.session.get("message_id")).src;
  }
  if(!maze.tutorial) {
    message_url = loader.getItem("food").src;
    maze.tutorial = [{
      msg: messages.goal,
      img: message_url
    }];
  }
  $(".noti-char").attr("src", message_url);

  initMaze();
  $("#runCode .start").show();
  $("#runCode .reset").hide();
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
  if(fullscreenEnabled) {
    $("#fullscreen").show();
  } else {
    $("#fullscreen").hide();
  }
  drawMaze();
  kidscoding.init(loader, mazeInfo, run, tileFactory);
  kidscoding.initBlockly(maze.toolbox, maze.workspace, maze.workspace2);
  $(".noti-guide").scrollTop() < 10 && $('.noti-up').css('border-color', "transparent transparent gray")
  function blockLimitsHandler(event) {
    if(!kidscoding.blockLimits) {
      return;
    }
    var xml = event.xml || event.oldXml,
        type = xml ? (xml.getAttribute("type") || "") : "",
        blocks = kidscoding.workspace.getFlyout().getWorkspace().getAllBlocks();
    if(type == "start" || type == "") {
      return;
    }
    if (event.type != Blockly.Events.CREATE && event.type != Blockly.Events.DELETE) {
      return;
    }
    updateBlockLimit(xml, event.type == Blockly.Events.CREATE ? -1 : 1);
    for(var i = 0; i < blocks.length; i++) {
      var disabled = kidscoding.blockLimits[blocks[i].type] === 0;
      if(blocks[i].disabled != disabled) {
        blocks[i].setDisabled(disabled);
        blocks[i].setMovable(!disabled);
        blocks[i].updateDisabled(disabled);
        blocks[i].updateMovable(!disabled);
      }
    }
  }
  function updateBlockLimit(block, delta) {
    var type = block.getAttribute("type");
    if(block.tagName == "BLOCK" && kidscoding.blockLimits.hasOwnProperty(type)) {
      kidscoding.blockLimits[type] += delta;
    }
    for(var i = 0; i < block.childNodes.length; i++) {
      if(block.childNodes[i].nodeType == 1) {
        updateBlockLimit(block.childNodes[i], delta);
      }
    }
  }
  kidscoding.workspace.addChangeListener(blockLimitsHandler);

  if(maze.type == "game" || maze.type == "world") {
    gameMode(loader, maze.type, tileFactory);
  }
  clearTimeout(resize_timeoutkey);
  resize_timeoutkey = setTimeout(function() {
    handle_resize();
  }, resize_debounce);
  var lang = store.session.get("lang", "ko"),
      goal = maze.goal || Object.assign(
        {img: loader.getItem("food").src},
        maze.tutorial[maze.tutorial.length - 1]
      ),
      goal_msg = goal["msg:" + lang] || goal["msg"];
  if(!$.isArray(goal.img)) {
    goal.img = goal.img ? [goal.img] : [message_url];
  }
  $(".goal-imgs .goal-img").remove();
  var count = 0, max = 0;
  for(i = 0; i <= goal.img.length; i++) {
    if(i == goal.img.length || goal.img[i] == "\n") {
      max = Math.max(count, max);
      count = 0;
    } else {
      count++;
    }
  }
  goal.img.forEach(function(src, i) {
    if(src == "\n") {
      $("<br/>").appendTo(".goal-imgs");
      return;
    }
    $('<img class="goal-img">')
      .attr("src", src)
      .css("max-width", (100 / max).toFixed(2) + "%")
      .appendTo(".goal-imgs");
  });
  $(".side_guide .goal-msg").html(goal_msg.replace(/\n/g, "<br/>"));
  var localData = history.loadData();
  if(maze.type == "world" && localData.worldmap) {
    // 월드맵이 있는 코스에서 한 스탭을 완료후 월드맵으로 돌아온 경우
    tileFactory.setCoord(mazeInfo.canvas.character, localData.worldmap.x, localData.worldmap.y);
    mazeInfo.canvas.stage.update();
    kidscoding.Actions._setFocus(mazeInfo.canvas.character.px, mazeInfo.canvas.character.py, 0, 0);
  } else {
    $("#startTutorial").removeClass("hidden");
    var fullscreen = store.session.get("fullscreen", null),
        fullscreenElement =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;
    if((fullscreen === null || fullscreen === true) && fullscreenEnabled && !fullscreenElement) {
      showModal({
        msg: messages.ask_fullscreen,
        confirm: true,
        onConfirmYes: function(e) {
          e.preventDefault();
          e.stopPropagation();
          FullScreen();
          store.session.set('fullscreen', true);
          startDialogue(maze.tutorial, function() {history.start();});
        },
        onConfirmNo: function(e) {
          e.preventDefault();
          e.stopPropagation();
          store.session.set('fullscreen', false);
          startDialogue(maze.tutorial, function() {history.start();});
        },
        onClose: function(e) {
          history.start();
        }
      });
    } else {
      startDialogue(maze.tutorial, function() {history.start();});
    }
  }
  isMoving = false;
  devtool.drawFinished();
}

function initMaze() {
  var map_width = maze.map[0].length;
  var map_height = maze.map.length;

  mazeInfo = {
    map: maze.map.map(function(row) {
      return row.split("");
    }),
    land: maze.land ? maze.land.map(function(row) {
      return row.split("");
    }) : null,
    width: map_width,
    height: map_height,
    view_size: maze.view_size || null,
    tile_size: maze.tile_size || 50,
    mandatory: typeof maze.mandatory == "string" ? maze.mandatory.split(",") : (maze.mandatory || []),
    canvas: {
      stage: new createjs.Stage("display"),
      character: null,
      items: [],
      foods: [],
      obstacles: [],
      others: [],
      drawings: []
    }
  };
  mazeInfo.canvas.stage.removeAllChildren();
  mazeInfo.canvas.stage.canvas.width = Math.min(mazeInfo.view_size || map_width, map_width) * mazeInfo.tile_size;
  mazeInfo.canvas.stage.canvas.height = Math.min(mazeInfo.view_size || map_height, map_height) * mazeInfo.tile_size;
  var ctx = mazeInfo.canvas.stage.canvas.getContext("2d");
  if(maze.render == "pixel") {
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.oImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    $("#display, modal-character, modal-character1, modal-character2").addClass("pixel");
  } else {
    ctx.imageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.oImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    $("#display, modal-character, modal-character1, modal-character2").removeClass("pixel");
  }

  if(!mazeInfo.land && loader.getItem("background")) {
    // 1-image background
    var background = new createjs.Bitmap(loader.getResult("background")),
        bounds = background.getBounds();
    background.scaleX = mazeInfo.tile_size * mazeInfo.width / bounds.width;
    background.scaleY = mazeInfo.tile_size * mazeInfo.height / bounds.height;
    mazeInfo.canvas.stage.addChild(background);
  } else if(!mazeInfo.land && loader.getItem("bg1")) {
    // mosaic background
    for(var i = 0; i < map_height; i++) {
      for(var j = 0; j < map_width; j++) {
        var idx = (i + j) % 2 + 1;
        var bg_tile = new createjs.Bitmap(loader.getResult("bg" + idx));
        tileFactory.setScale(bg_tile);
        tileFactory.setCoord(bg_tile, j, i);
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
        tileFactory.setScale(bg_tile);
        tileFactory.setCoord(bg_tile, j, i);
        mazeInfo.canvas.stage.addChild(bg_tile);
      }
    }
  }
  mazeInfo.canvas.stage.update();
}

function drawMaze() {
  var localData = history.loadData(),
      canvas = mazeInfo.canvas;
  for(var i = 0; i < mazeInfo.height; i++) {
    for(var j = 0; j < mazeInfo.width; j++) {
      if(maze.type == "world") {
        var extra = maze.extra ? maze.extra.filter(function(obj) {
          return obj.y == i && obj.x == j;
        })[0] : null;
        if(extra && extra.link) {
          // 이미 성공한 경우에는 별을 놓지 않아야 함
          var path = extra.link.split("/");
          if(path[0] == map_path[0] && localData.complete.indexOf(path[1]) >= 0) {
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
  if(maze.draw) {
    maze.draw.forEach(function(item) {
      var drawing = drawFactory.create(item);
      canvas.drawings.push(drawing);
      canvas.stage.addChild(drawing);
    });
  }
  // 캐릭터를 항상 위로
  canvas.stage.removeChild(canvas.character);
  canvas.stage.addChild(canvas.character);
  canvas.stage.update();
}

function handle_resize(e) {
  var size,
      workspace_height = 200;

  // ============ 가로폭이 더 좁을 경우, 회전을 부탁 한다는 알림창 ============
  // if($(window).height() > $(window).width()) {
  //   $("#maze-rotateAlert").removeClass("rotate-alert")
  //   $("#navbarMaze, #maze-container, #maze-notification").addClass("rotate-alert")
  // } else {
  //   $("#maze-rotateAlert").addClass("rotate-alert")
  //   $("#navbarMaze, #maze-container, #maze-notification").removeClass("rotate-alert")
  // }
  // ===============================================================

  if(kidscoding.isHorizontal) {
    size = $(window).height() - workspace_height;
    if($(window).width() < size) {
      size = $(window).width();
    }
  } else {
    size = $(window).height() - $("#navbarMaze").height() - $("#maze-notification").height() - $("#maze-container .bottom-row").height();
    if($(window).width() / 2 < size) {
      size = parseInt($(window).width() / 2, 10);
    }
  }
  var view_width = Math.min(mazeInfo.view_size || mazeInfo.width, mazeInfo.width),
      view_height = Math.min(mazeInfo.view_size || mazeInfo.height, mazeInfo.height),
      zoom = parseInt(100 * size / (view_width * mazeInfo.tile_size), 10) / 100,
      display_height = parseInt(view_height * mazeInfo.tile_size * zoom, 10),
      display_width = parseInt(view_width * mazeInfo.tile_size * zoom, 10);

  if(kidscoding.isHorizontal) {
    var flyout = kidscoding.workspace.getFlyout(),
        blocks = kidscoding.workspace.getAllBlocks(),
        startblock = blocks.filter(function(block) {
          return block.type === "start";
        })[0],
        coord = startblock.getRelativeToSurfaceXY(),
        dx = 0,
        dy = (display_height + 30) - coord.y;
    $("#maze-notification").css({
      display: "none"
    })
    $(".sidebar").css({
      height: display_height,
      left: (maze.type == "world" ? 0 : flyout.getWidth()) + "px"
    });
    $(".side_guide").css({
      height: display_height,
      left: display_width + "px"
    });
    // $(".goal, .side_console").css({
    //   "height": "50%",
    //   "min-height": display_height*0.5
    //   // left: display_width + "px"
    // });
    if(maze.type == "world") {
      $(".bottom-row").addClass("horizontal_world");
    } else {
      $(".bottom-row").removeClass("horizontal_world");
    }
    startblock.moveBy(dx, dy);
  } else {
    $(".sidebar").width(display_width);
    $(".workspace").css("left", display_width + "px");
    $(".bottom-row").removeClass("horizontal_world");
  }
  $("#display").css({
    width: display_width,
    height: display_height
  });
  // 늑대와여우 안드로이드 태블릿에서 캔버스 없어지는 현상 수정
  var ex0 = navigator.userAgent.indexOf("Linux; Android 5.1.1; NYTSSA")>=0;
  if(ex0) {
    $("#display").hide();
  }
  Blockly.svgResize(kidscoding.workspace);
  if(ex0) {
    clearTimeout(blink_timeoutkey);
    blink_timeoutkey = setTimeout(function() {
      $("#display").show();
    }, blink_debounce);
  }
};
function addEvents() {
  if(store.session.has("showbook")) {
    $("#logout").removeClass("hidden");
  }
  $(".noti-arrow").click(function(e){
    e.preventDefault();
    e.stopPropagation();

    var noti = $(".noti-guide"),
        scrollHeight = $(".noti-guide").prop("scrollHeight")-100,
        goScroll = $(e.target).data("arrow") === "up" ? noti.scrollTop()-100 : noti.scrollTop()+100;
    noti.scrollTop(goScroll)
    noti.scrollTop() > 10 ? $('.noti-up').css('border-color', "") : $('.noti-up').css('border-color', "transparent transparent gray");
    ( scrollHeight-10 < noti.scrollTop() && noti.scrollTop() < scrollHeight+10) ? $('.noti-down').css('border-color', "gray transparent transparent") : $('.noti-down').css('border-color', "");
  })
  $("#logout a").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    showModal({
      msg: messages.ask_logout,
      confirm: true,
      onConfirmYes: function() {
        var showBook = store.session.get("showbook");
        if(showBook) {
          if(!store.session.get("externallogin")) {
            store.session.clear();
          }
          location.href = showBook.split("#")[0];
        }
      }
    });
  });
  $("a.navbar-brand").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var showBook = store.session.get("showbook");
    if(showBook) {
      showModal({
        msg: messages.ask_select,
        confirm: true,
        onConfirmYes: function() {
          location.href = showBook;
        }
      });
    }
  });
  $(document).on("contextmenu mousewheel", function(e) {
    e.stopPropagation();
    if($(e.target).closest(".goal").length == 0) {
      e.preventDefault();
    }
  });
  $(window).on("resize", function(e) {
    clearTimeout(resize_timeoutkey);
    resize_timeoutkey = setTimeout(function() {
      handle_resize(e);
    }, resize_debounce);
  });
  $("#modal .go-next").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#modal').modal('hide');

    var localData = history.loadData(),
        step = map_path[map_path.length-1],
        dest = maze.success ? maze.success[maze.success.length-1].link : null;
    if(dest && maze.type != "world" && localData.worldmap) {
      // 문제에서 문제로 넘어갈 경우는 worldmap으로 돌아갈 필요가 없으므로 wolrdmap 정보 삭제
      // 예) index -> 1 -> 2 와 같은 식으로 넘어갈 경우,
      // 1에서 success.link 써주면 2부터는 자동으로 3으로 넘어감
      localData.worldmap = null;
    }
    if(!dest && maze.type != "world" && localData.worldmap) {
      // success가 없고 wolrdmap data가 있을때
      dest = localData.worldmap.path;
    } else if(!dest) {
      // 1,2,3,...의 단순 증가 형태
      var path = map_path.slice();
      path[path.length-1]++;
      if(isNaN(path[path.length-1])) {
        alert("주소가 잘못 설정되었습니다.");
        return;
      }
      dest = path.join("/");
    }
    if(localData.complete.indexOf(step) < 0) {
      localData.complete.push(step);
      localData.score += maze.score || 1;
      history.saveData(localData);
    }
    if(dest.slice(0, 7) == "http://" || dest.slice(0, 1) == "/") {
      location.href = dest;
    } else {
      page(dest);
    }
  });
  $("#modal .reset-maze").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#modal').modal('hide');
    $("#runCode .start").show();
    $("#runCode .reset").hide();
    createjs.Tween.removeAllTweens();
    resetMaze(mazeInfo, maze, loader, tileFactory);
  });
  $("#runCode").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if($(this).find("span:visible").hasClass("glyphicon-play")) {
      var blocks = kidscoding.workspace.getAllBlocks(),
          startblock = blocks.filter(function(block) {
            return block.type === "start";
          })[0];;
      if(startblock.getNextBlock()) {
        $("#runCode .start").hide();
        $("#runCode .reset").show();
        // remove the selection of the last-placed-block
        kidscoding.workspace.getAllBlocks().map(function(block) {
          block.removeSelect()
        });
        // check mandatory
        var failed = checkMandatory(startblock, mazeInfo.mandatory.slice());
        if(failed) {
          kidscoding.registerBlock(failed);
          var blockName = Blocks[failed].name,
              msg = messages.fail_mandatory.split("%1").join(blockName);
          kidscoding.isHorizontal ? showModal(msg) : renderAlert(msg, {ruleErr: "block"} )

        } else {
          // start run
          kidscoding.Actions.delay = 100;
          run(startblock, checkEnd);
        }
      } else {
        kidscoding.isHorizontal ? showModal(messages.fail_noBlocks) : renderAlert(messages.fail_noBlocks, {blockErr : "empty"})
      }
    } else {
      $('.noti-guide .speech:last-child').remove();
      $('.noti-guide').prop("scrollHeight") === $('.noti-guide').height() ? $('.noti-direct').css("display", "none") : $('.noti-direct').css("display", "")
      $('.noti-guide').scrollTop(10)
      $("#runCode .start").show();
      $("#runCode .reset").hide();
      createjs.Tween.removeAllTweens();
      resetMaze(mazeInfo, maze, loader, tileFactory);
    }
  });

  $("#playstop a").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
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
  function handleMove(e) {
    if(e.type != "keydown") {
      // touchstart, click은 화면 확대가 되기 때문에 prevent 처리
      // keydown은 개발자도구를 불러오기가 불편하므로 예외처리
      e.preventDefault();
    }
    e.stopPropagation();
    if(isMoving || createjs.Tween.hasActiveTweens()) {
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
    isMoving = true;
    kidscoding.Actions.delay = 100;
    kidscoding.Actions.move(direct, {}, function(obj) {
      if(maze.type == "game" && obj && obj.role == "food") {
        obj.visible = false;
        createjs.Sound.play("success");
        mazeInfo.canvas.stage.update();
        $("#scoreBox .score").text(++mazeInfo.score);
        addFood();
      }
      if(obj && obj.link) {
        var localData = history.loadData();
        if(!obj.min_score || localData.score >= obj.min_score) {
          if(obj.link.slice(-5) == "index") {
            // 새로운 index로 넘어갈때
            page(obj.link);
            return;
          } else {
            // 문제 풀이 화면으로 넘어갈때 : back link를 저장
            localData.worldmap = {
              x: mazeInfo.canvas.character.px,
              y: mazeInfo.canvas.character.py,
              path: map_path.join("/")
            };
            history.saveData(localData);
            page(obj.link);
            return;
          }
        } else {
          var msg = messages.fail_notEnough.split("%1").join(obj.min_score);
          kidscoding.isHorizontal ? showModal(msg) : renderAlert(msg, {ruleErr: "item"});
        }
      }
      if(obj && obj.tutorial) {
        startDialogue(obj.tutorial);
      }
      isMoving = false;
    });
  }
  $(document).keydown(handleMove);
  $("#virtualKeypad").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
  $("#virtualKeypad .key").on("touchstart click", handleMove);

  // 튜토리얼 대화창 모달 시작
  $("#startTutorial a").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    startDialogue(maze.tutorial);
  });
  // 대화창 모달에서 다음 클릭
  $("#modal .dialogue-next").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    runDialogue();
  });

  $("#modal .character1-modal, #modal .character2-modal").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var isFirst = $(e.currentTarget).hasClass("character1-modal"),
        character = isFirst ? "character" : "character2",
        message = isFirst ? "message" : "message2";
    store.session.set("character_id", character);
    store.session.set("message_id", message);
    init();
  });

  $("#modal .confirm-yes, #modal .confirm-no, #modal button.close").click(function(e) {
    var callback = $(this).data("callback");
    if($.isFunction(callback)) {
      callback.call(this, e);
    }
  });
  $("#fullScreen").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    FullScreen();
  })
  // 캔버스 여러번 터치시 화면 확대 되는 현상 막음
  $("#display").on("touchstart click", function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
}

function FullScreen(el) {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
    store.session.set('fullscreen', true);
  }
  else {
    cancelFullScreen.call(doc);
  };
};

function startDialogue(input_dialogue, input_callback) {
  var lang = store.session.get("lang", "ko");
  if(!input_dialogue) {
    return;
  }
  dialogue = input_dialogue;
  dialogueIdx = 0;
  dialogueCallback = input_callback || function() {};

  if(kidscoding.isHorizontal) {
    runDialogue();
  } else {
    $('#modal').modal('hide');
    var noti = $('.noti-guide');
    noti.empty();
    input_dialogue.map(function(txt) {
      var msg = (txt["msg" + (lang ? ":" + lang : "")] || txt["msg"]).replace(/\n/g, "<br/>");
      noti.append("<div class='speech'><div class='speech-bubble'>"+msg+"</div></div>");
    });
    noti.prop("scrollHeight") === noti.height() ? $('.noti-direct').css("display", "none") : $('.noti-direct').css("display", "");
    noti.scrollTop(10);
  }
}

function runDialogue() {
  var tItem = dialogue[dialogueIdx],
      link = dialogue[dialogueIdx-1] ? dialogue[dialogueIdx-1].link : null,
      lang = store.session.get("lang", "ko");
  if(link) {
    // 튜토리얼의 맨 끝에서 다른 페이지로 넘어갈때
    dialogueCallback();
    $("#modal .go-next").click();
    return;
  }
  if(dialogueIdx < dialogue.length) {
    if(tItem.hasOwnProperty("x") && tItem.hasOwnProperty("y")) {
      kidscoding.Actions._setFocus(tItem.x, tItem.y, 0, 500);
    }
    showModal({
      video: tItem.video,
      msg: tItem["msg" + (lang ? ":" + lang : "")] || tItem["msg"],
      img: tItem.img,
      link: tItem.link,
      dialogue: true,
      onClose: dialogueCallback
    });
  } else {
    $('#modal').modal('hide');
    kidscoding.Actions._setFocus(mazeInfo.canvas.character.px, mazeInfo.canvas.character.py, 0, 1000);
    dialogueCallback();
  }
  dialogueIdx++;
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
            tileFactory.setCoord(foods[i], x, y);
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

  var localData = history.loadData();
  $("#scoreBox .score").text(localData.score);
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
        //성공이라는 단어를 callback했을 경우 바로 성공 메시지가 뜨도록하기
        if(obj.substring(0,2) == "성공"){
          var imgsrc = obj.split("#!");
          history.end(true, maze.score, countBlocks());
          createjs.Sound.play("complete");
          if(maze.success) {
            startDialogue(maze.success);
          } else {
            if(imgsrc.length == 1){
              showModal({
                msg: messages.success,
                goNext: true
              });
            }else{
              showModal({
                msg: messages.success,
                img: imgsrc[1],
                goNext: true
              });
            }
          }
          return;
        }
        //일반적인 메시지가 callback했을 경우 해당 메시지를 띄우고 실패
        var $svg = $(block.svgGroup_).find(".blocklyPath"),
            className = $svg.attr("class");
        $svg.attr("class", className + " error");
        history.end(false, maze.score, countBlocks());
        createjs.Sound.play("fail");
        kidscoding.isHorizontal ? showModal(obj) : renderAlert(obj, {ruleErr: "actions"});
        return;
      }
      if( obj && typeof obj == "object" ) {
        if( obj.obstacle ) {
          // TODO: fix this later
          // jQuery's class manipulation functions do not work with the SVG elements
          // See: http://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
          var $svg = $(block.svgGroup_).find(".blocklyPath"),
              className = $svg.attr("class"),
              custom = kidscoding.tileFactory.custom_tiles[obj.tile] || {},
              lang = store.session.get("lang", "ko"),
              msg = custom["msg:" + lang] || custom["msg"] || messages.fail_wall;
          $svg.attr("class", className + " error");
          history.end(false, maze.score, countBlocks());
          createjs.Sound.play("fail");
          kidscoding.isHorizontal ? showModal(msg) : renderAlert(msg, {ruleErr: "wall"});
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
          startDialogue(obj.tutorial);
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

function checkEnd() {
  var foods = mazeInfo.canvas.foods;
  if(foods.length == 1 && (foods[0].itemCountBitmap || foods[0].itemList)) {
    var itemCount = tileFactory.getItemCount(foods[0]);
    if(foods[0].useItem <= itemCount) {
      history.end(true, maze.score, countBlocks());
      createjs.Sound.play("complete");
      if(maze.success) {
        startDialogue(maze.success);
      } else {
        showModal({
          msg: messages.success,
          goNext: true
        });
      }
    } else {
      history.end(false, maze.score, countBlocks());
      createjs.Sound.play("fail");
      kidscoding.isHorizontal ? showModal(messages.fail_done) : renderAlert(messages.fail_done, { blockErr : "default"});
    }
  } else {
    for(var i = 0; i < foods.length; i++) {
      var isSuccess = foods[i].complete ||
          foods[i].visible == false ||
          (foods[i].useItem && kidscoding.tileFactory.getItemCount(foods[i]) >= foods[i].useItem);
      if(!isSuccess) {
        history.end(false, maze.score, countBlocks());
        createjs.Sound.play("fail");
        kidscoding.isHorizontal ? showModal(messages.fail_done) : renderAlert(messages.fail_done, { blockErr : "shortage"});
        break;
      }
    }
    if(i == foods.length) {
      if( foods.length == 1 &&
          !(foods[0].px == mazeInfo.canvas.character.px &&
          foods[0].py == mazeInfo.canvas.character.py)) {
        history.end(false, maze.score, countBlocks());
        createjs.Sound.play("fail");
        kidscoding.isHorizontal ? showModal(messages.fail_done) : renderAlert(messages.fail_done, { blockErr : "exceed"});
      } else {
        history.end(true, maze.score, countBlocks());
        createjs.Sound.play("complete");
        if(maze.success) {
          startDialogue(maze.success);
        } else {
          showModal({
            msg: messages.success,
            goNext: true
          });
        }
      }
    }
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
  history.reset();
}
function renderAlert(msg, type) {
  var typeKey = Object.keys(type).toString(),
      noti = $('.noti-guide');
  noti.append("<div class='speech'><p class='speech-bubble "+typeKey+"'>"+msg+"</p></div>")
  var goToScroll = noti.prop("scrollHeight")
  noti.prop("scrollHeight") === noti.height() ? $('.noti-direct').css("display", "none") : $('.noti-direct').css("display", "")
  noti.scrollTop(goToScroll)
}

function showModal(options) {
  if(typeof options == "string") {
    options = {
      msg: options,
      goNext: false,
      dialogue: false,
      confirm: false
    };
  }
  $("#modal .btn").hide();
  $("#modal button.close").data("callback", options.onClose);
  $("#modal .confirm-yes").data("callback", options.onConfirmYes);
  $("#modal .confirm-no").data("callback", options.onConfirmNo);
  if(options.goNext) {
    $("#modal .go-next, #modal .reset-maze").show();
  } else if(options.dialogue) {
    $("#modal .dialogue-next").show();
  } else if (options.confirm) {
    $("#modal .confirm-yes").show();
    $("#modal .confirm-no").show();
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
    $("#modal .dialogue-next").hide();
  } else {
    $("#modal .modal-msg-box").show();
    $("#modal .modal-select").hide();
  }
  var imgs = options.img;
  if(!$.isArray(imgs)) {
    imgs = imgs ? [imgs] : [message_url];
  }

  $(".modal-msg-box img").remove();
  var count = 0, max = 0;
  for(i = 0; i <= imgs.length; i++) {
    if(i == imgs.length || imgs[i] == "\n") {
      max = Math.max(count, max);
      count = 0;
    } else {
      count++;
    }
  }
  imgs.forEach(function(src) {
    if(src == "\n") {
      $("<br/>").appendTo(".modal-imgs");
      return;
    }
    $('<img class="modal-character">')
      .attr("src", src)
      .css("width", (100 / max).toFixed(2) + "%")
      .appendTo(".modal-imgs");
  });
  //캐릭터 선택 오류 options.msg가 null이 되는 문제 수정
  if(!options.select_character){
    $(".modal-msg-box .modal-msg").html(options.msg.replace(/\n/g, "<br/>"));
  }
  $('#modal').modal({
    backdrop: "static"
  });
  $('#modal').modal('show');
}

function checkMandatory(startblock, mandatory) {
  var blocks = startblock.getDescendants(),
      idx, i;
  for(i = 0; i < blocks.length; i++) {
    idx = mandatory.indexOf(blocks[i].type);
    if(idx >= 0) {
      mandatory.splice(idx, 1);
    }
  }
  return mandatory[0] || null;
}

function countBlocks(block) {
  var count = 0,
      statements;
  block = block || kidscoding.workspace.getAllBlocks().filter(function(block) {
    return block.type === "start";
  })[0];
  do {
    count++;
    statements = block.getInputTargetBlock("statements");
    if(statements) {
      count += countBlocks(statements);
    }
    block = block.getNextBlock();
  } while(block);
  return count;
}

})(jQuery);
