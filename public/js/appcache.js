(function(global) {
  var appCache = global.applicationCache;
  if(!appCache) {
    return;
  }
  var new_manifest,
      new_contents;

  function handleCacheEvent(e) {
    if(e.type === 'downloading') {
      var old_contents = store.get("contents"),
          hasAppCache = true;
      try {
        appCache.update();
      } catch(e) {
        // update 실패했다면 appcache가 없다는 것을 알 수 있음
        hasAppCache = false;
      }
      $.ajax({
        url: location.href.replace("/code/", "/cache/"),
        async: false,
        cache: false,
        timeout: 1000,
        success: function(result) {
          new_manifest = result.split("\n").filter(function(line) {
            line = line.trim();
            return  line.charAt(0) != "#" &&
                    line != "CACHE MANIFEST" &&
                    line != "CACHE:" &&
                    line != "NETWORK:" &&
                    line != "FALLBACK:" &&
                    line != "*";
          });
          new_contents = result.match(/#contents:(.*)/)[1];
        },
        error: function(e) {
          // $(".check-update").show();
          alert("manifest 가져오기 실패");
        }
      });
      if(old_contents == new_contents && hasAppCache) {
        // 기존 manifest와 차이가 없고, appcache가 있는 상태라면 minor update
      } else {
        $('#appcache .msg').html("새로운 컨텐츠를 다운로드 중입니다.<br/>" + new_contents);
        $('#appcache').modal('show');
        $('#appcache button.btn-default').hide();
      }
      $('.check-update-msg').text("업데이트 중...");
    }
    if(e.type === 'progress') {
      var val = e.loaded / e.total,
          val1 = parseInt(val * 1000) / 10 + "%",
          val2 = parseInt(val * 100) + "%";
      $('#appcache .progress-bar').css("width", val1).text(val2);
    }
    if(e.type === 'cached') { // 처음 캐시된 경우
      store.set("contents", new_contents);
      store.set("manifest", new_manifest);
      $('#appcache .msg').html('업데이트 완료<br/>' + new_contents);
      $('#appcache button.btn-default').show();
      $('.check-update-msg').text("최신 업데이트 상태");
    }
    if(e.type === 'updateready') { // 업데이트 된 경우
      store.set("contents", new_contents);
      store.set("manifest", new_manifest);
      global.location.reload();
    }
    if(e.type === 'noupdate') { // 업데이트 된 경우
      $('.check-update-msg').text("최신 업데이트 상태");
    }
  }

  function handleCacheError(e) {
    // alert('키즈씽킹 캐시 다운로드에 실패하였습니다. 저장 공간을 확인해주세요.');
    // $("#appcache").modal("hide");
  };

  // Fired after the first cache of the manifest.
  appCache.addEventListener('cached', handleCacheEvent, false);

  // Checking for an update. Always the first event fired in the sequence.
  appCache.addEventListener('checking', handleCacheEvent, false);

  // An update was found. The browser is fetching resources.
  appCache.addEventListener('downloading', handleCacheEvent, false);

  // The manifest returns 404 or 410, the download failed,
  // or the manifest changed while the download was in progress.
  appCache.addEventListener('error', handleCacheError, false);

  // Fired after the first download of the manifest.
  appCache.addEventListener('noupdate', handleCacheEvent, false);

  // Fired if the manifest file returns a 404 or 410.
  // This results in the application cache being deleted.
  appCache.addEventListener('obsolete', handleCacheEvent, false);

  // Fired for each resource listed in the manifest as it is being fetched.
  appCache.addEventListener('progress', handleCacheEvent, false);

  // Fired when the manifest resources have been newly redownloaded.
  appCache.addEventListener('updateready', handleCacheEvent, false);

  function checkManifest(manifest, i) {
    var old_contents = store.get("contents"),
        progress;
    $.ajax({
      url: manifest[i],
      async: false,
      dataType: 'text',
      success: function(result) {
        progress = +((i+1)/manifest.length).toFixed(3) * 100;
      },
      error: function(e) {
        progress = -1;
      }
    });
    if(progress == -1) {
      alert("다운로드 받은 파일을 확인 할 수 없습니다.\n인터넷 연결 확인후 재접속 해주세요.");
      $('#appcache').modal('hide');
      return;
    }
    $('#appcache .progress-bar').css("width", progress + "%").text(parseInt(progress) + "%");
    if(i == manifest.length) {
      $('#appcache .msg').html('확인 완료<br/>' + old_contents);
      $('#appcache button.btn-default').show();
    } else {
      setTimeout(function() {
        checkManifest(manifest, i+1);
      }, 1);
    }
  }

  $(".check-update").click(function(e) {
    var old_contents = store.get("contents"),
        update_status = $(".check-update-msg").text();
    if(update_status == "업데이트 중...") {
      $('#appcache .msg').html("업데이트 중입니다.<br/>" + new_contents);
      $('#appcache').modal('show');
      $('#appcache button.btn-default').hide();
      return;
    } else if(update_status == "업데이트 확인") { // 오프라인 상태
      if(!old_contents) {
        alert("다운로드 받은 파일을 확인 할 수 없습니다.\n인터넷 연결 확인후 재접속 해주세요.");
        return;
      }
      $('#appcache .msg').html("다운로드 받은 파일을 확인 중입니다.<br/>" + old_contents);
      $('#appcache').modal('show');
      $('#appcache button.btn-default').hide();
      checkManifest(store.get("manifest"), 0);
    } else { // 최신 업데이트 상태
      alert("현재 컨텐츠는 다음과 같습니다.\n" + old_contents);
    }
  });

})(window);
