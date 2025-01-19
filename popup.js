const toggle = document.getElementById('toggle');
const status = document.querySelector('.status');
const body = document.body;

function updateUI(isDarkMode) {
  toggle.classList.toggle('active', isDarkMode);
  status.textContent = isDarkMode ? 'Dark mode active' : 'Light mode active';
  body.classList.toggle('dark', isDarkMode);
}

// Initial state
chrome.storage.sync.get(['darkMode'], function (result) {
  const isDarkMode = result.darkMode || false;
  updateUI(isDarkMode);
});

toggle.addEventListener('click', () => {
  const isDarkMode = toggle.classList.toggle('active');
  updateUI(isDarkMode);

  chrome.storage.sync.set({ darkMode: isDarkMode });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: isDarkMode ? enableDarkMode : disableDarkMode
    });
  });
});

function enableDarkMode() {
  const style = document.createElement('style');
  style.id = 'dark-mode-style';
  style.innerHTML = `
    html {
      filter: invert(1) hue-rotate(180deg);
      background-color: #121212 !important;
    }

    img, video, iframe, canvas {
      filter: invert(1) hue-rotate(180deg) !important;
    }

    [role="img"], picture, svg {
      filter: none !important;
    }
  `;
  document.head.appendChild(style);
}

function disableDarkMode() {
  const style = document.getElementById('dark-mode-style');
  if (style) {
    style.remove();
  }
}
