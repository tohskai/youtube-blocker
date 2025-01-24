let settings = {
  enabled: true,
  minTime: 20,
  redirectUrl: 'https://example.com'
};

browser.storage.local.get(settings).then(result => {
  settings = result;
});

browser.storage.local.onChanged.addListener(changes => {
  for (let key in changes) {
    settings[key] = changes[key].newValue;
  }
});

browser.webNavigation.onCompleted.addListener(
  function(details) {
    if (!settings.enabled) return;
    
    const url = new URL(details.url);
    if (url.pathname.startsWith('/watch') || url.pathname.startsWith('/shorts/')) {
      browser.tabs.executeScript(details.tabId, {
        file: 'content-script.js'
      });
    }
  },
  {
    url: [
      { hostSuffix: 'youtube.com', pathPrefix: '/watch' },
      { hostSuffix: 'youtube.com', pathPrefix: '/shorts/' }
    ]
  }
);
