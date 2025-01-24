function parseDuration(timeStr) {
  const parts = timeStr.split(':').map(part => parseInt(part));
  let seconds = 0;
  if (parts.length === 3) {
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    seconds = parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    seconds = parts[0];
  }
  return seconds;
}

async function checkRedirect() {
  const settings = await browser.storage.local.get({
    enabled: true,
    minTime: 20,
    redirectUrl: 'https://example.com',
    redirectShorts: false
  });

  if (!settings.enabled) return;

  if (window.location.pathname.startsWith('/shorts/') && settings.redirectShorts) {
    window.location.href = settings.redirectUrl;
    return;
  }

  const durationElement = document.querySelector('.ytp-time-duration');
  if (durationElement?.textContent) {
    const seconds = parseDuration(durationElement.textContent.trim());
    if (seconds < (settings.minTime * 60)) {
      window.location.href = settings.redirectUrl;
    }
  }
}

const observer = new MutationObserver(checkRedirect);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

checkRedirect();
