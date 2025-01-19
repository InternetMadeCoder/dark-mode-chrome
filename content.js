chrome.storage.sync.get(["darkMode"], function (result) {
    if (result.darkMode) {
      enableDarkMode();
    }
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
  