(() => {
  const normalizePath = (path) => {
    if (!path) {
      return '/';
    }
    return path.length > 1 ? path.replace(/\/+$/, '') : path;
  };

  const createExactUrlHandler = (targetUrl, handler) => ({
    predicate: (url) => url.href === targetUrl,
    handler,
  });

  const createPathHandler = (path, handler) => ({
    predicate: (url) => normalizePath(url.pathname) === normalizePath(path),
    handler,
  });

  const redirect = (destination) => {
    window.location.href = destination;
  };

  const waitForElement = (selector, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      const start = performance.now();

      const check = () => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
          return;
        }

        if (performance.now() - start > timeout) {
          reject(new Error(`Element ${selector} not found within ${timeout}ms`));
          return;
        }

        requestAnimationFrame(check);
      };

      check();
    });
  };

  const fetchCatImageUrl = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && data[0].url) {
        return data[0].url;
      }

      console.warn('Invalid API response or missing image URL in one of the requests.');
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }

    return null;
  };

  const setupCatsPage = async () => {
    try {
      const contentDiv = await waitForElement('#content');
      contentDiv.innerHTML = '';
      contentDiv.style.position = 'relative';

      const header = document.createElement('h1');
      header.textContent = 'CATS!!!!!';
      contentDiv.appendChild(header);

      const numberOfCats = 30;
      const catImagePromises = Array.from({ length: numberOfCats }, fetchCatImageUrl);

      const catImageUrls = await Promise.all(catImagePromises);

      catImageUrls.forEach((catImageUrl) => {
        if (!catImageUrl) {
          return;
        }

        const imgElement = document.createElement('img');
        imgElement.src = catImageUrl;
        imgElement.alt = 'Random cat image';
        imgElement.style.maxWidth = '150px';
        imgElement.style.maxHeight = '150px';
        imgElement.style.display = 'inline-block';
        imgElement.style.pointerEvents = 'none';

        const marginRange = 20;
        const marginTop = Math.random() * marginRange - marginRange / 2;
        const marginLeft = Math.random() * marginRange - marginRange / 2;
        imgElement.style.marginTop = `${marginTop}px`;
        imgElement.style.marginBottom = `${marginTop}px`;
        imgElement.style.marginLeft = `${marginLeft}px`;
        imgElement.style.marginRight = `${marginLeft}px`;

        const verticalAlignOptions = ['top', 'middle', 'bottom'];
        imgElement.style.verticalAlign =
          verticalAlignOptions[Math.floor(Math.random() * verticalAlignOptions.length)];

        contentDiv.appendChild(imgElement);
      });
    } catch (error) {
      console.error('Error setting up the cats page:', error);
    }
  };

  const activateHomeEnhancements = async () => {
    try {
      const module = await import(chrome.runtime.getURL('misc/homepage.js'));
      if (module && typeof module.initHomePageEnhancements === 'function') {
        module.initHomePageEnhancements();
      }
    } catch (error) {
      console.error('Failed to load home page enhancements module:', error);
    }
  };

  const handlers = [
    createExactUrlHandler('https://www.roblox.com/cats', setupCatsPage),
    createExactUrlHandler('https://www.roblox.com/fishstrap', () => redirect('https://fishstrap.app')),
    createExactUrlHandler('https://www.roblox.com/rovalra', () => redirect('https://rovalra.com')),
    createExactUrlHandler('https://www.roblox.com/roseal', () => redirect('https://www.roseal.live')),
    createExactUrlHandler('https://www.roblox.com/rokitty', () => redirect('https://www.rokitty.app')),
    createExactUrlHandler('https://www.roblox.com/roqol', () => redirect('https://roqol.io/')),
    createPathHandler('/home', activateHomeEnhancements),
  ];

  const runHandlers = () => {
    const currentUrl = new URL(window.location.href);
    handlers.forEach(({ predicate, handler }) => {
      try {
        if (predicate(currentUrl)) {
          handler(currentUrl);
        }
      } catch (error) {
        console.error('RoValra page handler failed', error);
      }
    });
  };

  runHandlers();
})();
