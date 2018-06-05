function History() {
  this.stdt = null;
  this.chapter = null;
  this.problem = null;
};
History.prototype.init = function(chapter, problem) {
  this.chapter = chapter;
  this.problem = problem;
}
History.prototype.loadData = function() {
  var id = store.session.get("user", {id:null}).id,
      local = id ? store.namespace(id) : store.session.namespace("anonymous");
  return local.get(this.chapter, {score:0,complete:[],worldmap:null,data:{}});
}
History.prototype.saveData = function(localData) {
  var id = store.session.get("user", {id:null}).id,
      local = id ? store.namespace(id) : store.session.namespace("anonymous");
  local.set(this.chapter, localData);
}
History.prototype.start = function() {
  this.stdt = new Date().getTime();
};
History.prototype.end = function(isSuccess, score, count) {
  var duration = new Date().getTime() - this.stdt,
      localData = this.loadData(),
      data = localData.data[this.problem] || {
        history: [],
        date: this.stdt,
        success: false,
        score: score || 1, // 문제의 점수
        failed: 0,      // 첫 성공 이전에 실패 한 수
        duration: 0,    // 첫 성공까지의 시간
        block: 0        // 첫 성공시 블록 수
      };
  // 첫 성공인 경우
  if(!data.success && isSuccess) {
    data.success = true;
    data.failed = data.history.length;
    data.duration = duration + data.history.reduce(function(sum, item) {
      return sum + item[1];
    }, 0);
    data.block = count;
  }
  data.history.push([isSuccess, duration, count]);
  localData.data[this.problem] = data;
  this.saveData(localData);
  this.stdt = null;
};
History.prototype.reset = function() {
  if(!this.stdt) {
    this.start();
  }
};
History.sendData = function(options) {
  var keys = store.keys().filter(function(item) {
        return item != "contents" && item != "manifest";
      }),
      docs = [];
  keys.forEach(function(key) {
    var contents = store.get(key).data,
        tokens = key.split(/[,.]/),
        ids = tokens[0].split("-"),
        preset = {
          parentId: ids[0],
          kinder: ids[0] + "-" + ids[1],
          classId: tokens[0],
          userId: tokens[1],
          chapter: tokens[2]
        };
    if(!contents || tokens[0] == "anonymous") {
      return;
    }
    Object.keys(contents).forEach(function(problem) {
      var content = contents[problem],
          doc = Object.assign({
            problem: problem,
            failed: content.failed,
            score: content.score,
            duration: content.duration,
            block: content.block,
            success: content.success,
            date: content.date
          }, preset);
      docs.push(doc);
    });
  });
  if(docs.length == 0) {
    return;
  }
  $.ajax({
    url: "/reports",
    method: "POST",
    cache: false,
    timeout: 1000,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(docs),
    success: function(result) {
      var contents = store.get("contents") || "";
      contents = contents.split(",").map(function(item) {
        return item.split("-").join("").toLowerCase();
      });
      keys.forEach(function(key) {
        var content = key.split(/[,.]/)[2].split("_")[0];
        if(contents.indexOf(content) >= 0) {
          var item = store.get(key);
          item.data = {};
          store.set(key, item);
        } else {
          store.remove(key);
        }
      });
      options.success(result);
    },
    error: function(e) {
      options.error(e);
    }
  });
}
