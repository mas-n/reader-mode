const readerModeTabs = {};

// Listen for icon click
chrome.action.onClicked.addListener((tab) => {
  const tabId = tab.id;
  console.log('Extension clicked for tab:', tabId);

  // Toggle Reader Mode
  if (readerModeTabs[tabId]) {
    deactivateReaderMode(tabId);
  } else {
    activateReaderMode(tabId);
  }
});

// Activate Reader Mode
function activateReaderMode(tabId) {
  readerModeTabs[tabId] = true;

  console.log('Activating Reader Mode for tab:', tabId);

  // Inject the content script to enable Reader Mode
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: enableReaderMode
  });

  // Change the icon to 'on'
  chrome.action.setIcon({ path: "icon_on.png", tabId: tabId });
}

// Deactivate Reader Mode
function deactivateReaderMode(tabId) {
  readerModeTabs[tabId] = false;

  console.log('Deactivating Reader Mode for tab:', tabId);

  // Reload the tab to reset the page
  chrome.tabs.reload(tabId);

  // Change the icon back to 'off'
  chrome.action.setIcon({ path: "icon.png", tabId: tabId });
}

// Function to enable Reader Mode (injected into the page)
function enableReaderMode() {
  console.log('Reader Mode activated on this page');

  let mainContent = document.querySelector('article') ||
                    document.querySelector('main') ||
                    document.querySelector('[role="main"]') ||
                    document.querySelector('body');

  if (!mainContent) {
    console.error('Unable to find the main content');
    return;
  }

  // Clone and clean the content
  let contentClone = mainContent.cloneNode(true);
  let unnecessaryElements = contentClone.querySelectorAll('img, iframe, video, object, [class*="video"], [id*="video"], [aria-label*="video"], [class*="comment"], [id*="comment"], [aria-label*="comment"], [class*="openweb"], [id*="openweb"], [aria-label*="openweb"], script, style');
  unnecessaryElements.forEach(element => element.remove());

  // Replace the body content with the cleaned version
  document.body.innerHTML = '';
  document.body.appendChild(contentClone);

  // Apply reader-friendly styles
  document.body.style.fontFamily = 'Arial, sans-serif';
  document.body.style.lineHeight = '1.6';
  document.body.style.padding = '20px';

  // Style links to resemble text but underlined
  let links = document.querySelectorAll('a');
  links.forEach(link => {
    link.style.color = 'inherit';
    link.style.textDecoration = 'underline';
  });

  console.log('Reader Mode styling applied');
}
