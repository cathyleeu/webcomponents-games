(function(global) {
  var appCache = global.applicationCache;
  if(!appCache) {
    return;
  }

  function handleCacheEvent(e) {
    if(e.type === 'downloading') {
      $('#appcache').modal('show');
    }
    if(e.type === 'progress') {
      var val = e.loaded / e.total,
          val1 = parseInt(val * 1000) / 10 + "%",
          val2 = parseInt(val * 100) + "%";
      $('#appcache .progress-bar').css("width", val1).text(val2);
    }
    if(e.type === 'cached' || e.type === 'updateready') {
      $('#appcache .msg').text('업데이트 완료');
      $('#appcache button').show().click(function() {
        global.location.reload();
      });
    }
  }

  function handleCacheError(e) {
    // alert('Error: Cache failed to update!');
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

})(window);
