function screenSplash() {
  canvas.style.background = '#ddd';

  let pressMsg = '';

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
      document.addEventListener('keydown', keySplashHandler);
      pressMsg = 'Press any key';
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  loadAllImages(imagesToLoad);

  let fontSize = baseW / 4;
  let textColor = cText2;

  let animationId;

  function start() {
    clearCanvas();

    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    ctx.fillText('Tarava', baseW / 2, baseH / 2);

    if (fontSize > baseW / 8) {
      fontSize -= 1;
    } else {
      ctx.font = '20px monospace';
      ctx.fillStyle = cText;
      ctx.fillText(pressMsg, baseW / 2, baseH - baseW / 8);
    }

    animationId = requestAnimationFrame(start);
  }

  function stop() {
    cancelAnimationFrame(animationId);
    ctx.textAlign = 'start';
    clearCanvas();
  }

  start();
  function keySplashHandler() {
    stop();
    document.removeEventListener('keydown', keySplashHandler);
    screenTransition('bottom', () => screenStart());
  }
}
