function screenSplash() {
  canvas.style.background = '#ddd';

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  }

  async function loadAllImages(imagesArray) {
    try {
      const loadedImages = await Promise.all(imagesArray.map(loadImage));
      imagesLoaded.push(...loadedImages);
      if (loadedImages) {
        document.addEventListener('keydown', keySplashHandler);
        contentEl.innerHTML = `
          <div class="splash">
            <img src='./img/logo.png', class="logo" />
            <h1 style="color: var(--red)">Tavara</h1>
            <p>Press any key</p>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  loadAllImages(imagesToLoad);

  function keySplashHandler() {
    document.removeEventListener('keydown', keySplashHandler);
    audioPlay('start');
    screenTransition('bottom', () => screenStart());
  }
}
