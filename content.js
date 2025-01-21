chrome.storage.sync.get(["darkMode"], function (result) {
    if (result.darkMode) {
      enableDarkMode();
    }
});

function enableDarkMode() {
  const style = document.createElement('style');
  style.id = 'dark-mode-style';
  
  // Check if current page is a PDF viewer
  const isPdfViewer = document.body?.classList.contains('loadingInProgress') || 
                     document.querySelector('#viewer.pdfViewer') !== null;
  
  if (isPdfViewer) {
    style.innerHTML = `
      body {
        background-color: #202124 !important;
      }
      #viewer .page {
        background-color: #202124 !important;
      }
      .page {
        filter: invert(0.9) hue-rotate(180deg) !important;
      }
      #viewer .canvasWrapper {
        background-color: #202124 !important;
      }
      .toolbar {
        background-color: #202124 !important;
        color: #e8eaed !important;
      }
      #viewerContainer {
        background-color: #202124 !important;
      }
    `;
  } else {
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
  }
  document.head.appendChild(style);
}

function disableDarkMode() {
  const style = document.getElementById('dark-mode-style');
  if (style) {
    style.remove();
  }
}
