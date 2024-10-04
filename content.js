// Function to activate Reader Mode
function enableReaderMode() {
    let mainContent = document.querySelector('article') ||
                      document.querySelector('main') ||
                      document.querySelector('[role="main"]') ||
                      document.querySelector('body');
  
    if (!mainContent) {
      console.error('Unable to find the main content');
      return;
    }
  
    // Clone and clean the content (remove images, videos, comments)
    let contentClone = mainContent.cloneNode(true);
    let unnecessaryElements = contentClone.querySelectorAll('img, iframe, video, object, [class*="video"], [id*="video"], [aria-label*="video"], [class*="comment"], [id*="comment"], [aria-label*="comment"], [class*="openweb"], [id*="openweb"], [aria-label*="openweb"], script, style');
    unnecessaryElements.forEach(element => element.remove());
  
    // Replace the body content with the cleaned version
    document.body.innerHTML = '';
    document.body.appendChild(contentClone);
  
    // Apply simple reader mode styling
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.lineHeight = '1.6';
    document.body.style.padding = '20px';
  
    // Style links to resemble text but underlined
    let links = document.querySelectorAll('a');
    links.forEach(link => {
      link.style.color = 'inherit';
      link.style.textDecoration = 'underline';
    });
  }
  