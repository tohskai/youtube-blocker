document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('save').addEventListener('click', saveSettings);

async function loadSettings() {
  const result = await browser.storage.local.get({
    enabled: true,
    minTime: 20,
    redirectUrl: 'https://example.com',
    redirectShorts: false
  });

  document.getElementById('enabled').checked = result.enabled;
  document.getElementById('minTime').value = result.minTime;
  document.getElementById('redirectUrl').value = result.redirectUrl;
  document.getElementById('redirectShorts').checked = result.redirectShorts;
}

async function saveSettings() {
  const settings = {
    enabled: document.getElementById('enabled').checked,
    minTime: parseInt(document.getElementById('minTime').value),
    redirectUrl: document.getElementById('redirectUrl').value,
    redirectShorts: document.getElementById('redirectShorts').checked
  };

  browser.storage.local.set(settings)
    .then(() => showStatus('Settings saved!'))
    .catch(error => showStatus(`Error: ${error.message}`));
}

function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  setTimeout(() => status.textContent = '', 2000);
}
