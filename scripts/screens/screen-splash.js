function screenSplash() {
  canvas.style.background = '#ddd';

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
      ctx.fillText('Press any key', baseW / 2, baseH - baseW / 8);
    }

    animationId = requestAnimationFrame(start);
  }

  function stop() {
    cancelAnimationFrame(animationId);
    ctx.textAlign = 'start';
    clearCanvas();
  }

  start();
  document.addEventListener('keydown', keyStartHandler);
  function keyStartHandler() {
    stop();
    document.removeEventListener('keydown', keyStartHandler);
    screenTransition('bottom', () => screenStart());
  }
}
