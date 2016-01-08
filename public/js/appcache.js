(function(global) {
  var appCache = global.applicationCache;
  if(!appCache) {
    return;
  }
  // debugger
  // // Check if a new cache is available on page load.
  // global.addEventListener('load', function(e) {
  //   appCache.addEventListener('updateready', function(e) {
  //     debugger
  //     if (appCache.status == appCache.UPDATEREADY) {
  //       // Browser downloaded a new app cache.
  //       if (confirm('A new version of this site is available. Load it?')) {
  //         global.location.reload();
  //       }
  //     } else {
  //       // Manifest didn't changed. Nothing new to server.
  //     }
  //   }, false);
  //
  // }, false);


global.log = [];
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
  if(e.type === 'cached') {
    $('#appcache .msg').text('업데이트 완료');
  }
  global.log.push(e.type);
  //...
}

function handleCacheError(e) {
  alert('Error: Cache failed to update!');
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
