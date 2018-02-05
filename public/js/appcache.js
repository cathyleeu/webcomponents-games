(function(global) {
  var appCache = global.applicationCache;
  if(!appCache) {
    return;
  }
  var new_manifest = null,
      new_contents,
      timeoutkey;

  function handleCacheEvent(e) {
    if(e.type === 'downloading') { // 업데이트 시작
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
          // downloading manifest를 가져올 수 없다면, major update가 됨
        }
      });
      if(old_contents == new_contents && hasAppCache) {
        // 기존 manifest와 차이가 없고, appcache가 있는 상태라면 minor update
      } else {
        $('#appcache .msg').html(msg.downloading + "<br/>" + new_contents);
        $('#appcache').modal('show');
        $('#appcache button.btn-default').hide();
      }
      $('.check-update-msg').text(msg.updating).data("update-status", "updating");
    }
    if(e.type === 'progress') { // 업데이트 중
      var val = e.loaded / e.total,
          val1 = parseInt(val * 1000) / 10 + "%",
          val2 = parseInt(val * 100) + "%";
      $('#appcache .progress-bar').css("width", val1).text(val2);
    }
    if(e.type === 'cached') { // 처음 캐시된 경우
      store.set("contents", new_contents);
      store.set("manifest", new_manifest);
      $('#appcache .msg').html(msg.update_complete + '<br/>' + new_contents);
      $('.check-update-msg').text(msg.updated).data("update-status", "updated");
      setTimeout(function() {
        alert(msg.update_complete);
        global.location.reload();
      }, 1);
    }
    if(e.type === 'updateready') { // 업데이트 된 경우 리프레시
      store.set("contents", new_contents);
      store.set("manifest", new_manifest);
      global.location.reload();
    }
    if(e.type === 'noupdate') { // 업데이트 할 것 없음
      $('.check-update-msg').text(msg.updated).data("update-status", "updated");
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
      alert(msg.failed_to_check);
      $('#appcache').modal('hide');
      return;
    }
    $('#appcache .progress-bar').css("width", progress + "%").text(parseInt(progress) + "%");
    if(i == manifest.length) {
      $('#appcache .msg').html(msg.success_to_check + '<br/>' + old_contents);
      $('#appcache button.btn-default').show();
    } else {
      timeoutkey = setTimeout(function() {
        checkManifest(manifest, i+1);
      }, 1);
    }
  }

  $(".check-update").click(function(e) {
    var old_contents = store.get("contents"),
        update_status = $(".check-update-msg").data("update-status");
    if(update_status == "updating") {
      $('#appcache .msg').html(msg.updating + "<br/>" + new_contents);
      $('#appcache').modal('show');
      $('#appcache button.btn-default').hide();
      return;
    } else if(update_status == "default") { // 오프라인 상태
      if(!old_contents) {
        alert(msg.failed_to_check);
        return;
      }
      $('#appcache .msg').html(msg.check_cache + "<br/>" + old_contents);
      $('#appcache').modal('show');
      $('#appcache button.btn-default').hide();
      clearTimeout(timeoutkey);
      checkManifest(store.get("manifest"), 0);
    } else { // == "updated" 최신 업데이트 상태
      if(new_contents || old_contents) {
        alert(msg.current_contents + "\n" + (new_contents || old_contents));
      } else {
        alert(msg.latest_update);
      }
    }
  });

})(window);
