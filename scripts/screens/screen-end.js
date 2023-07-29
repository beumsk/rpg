function screenEnd() {
  canvas.style.backgroundImage = '';

  let fontSize = baseW / 32;
  let textColor = cText2;

  let animationId;

  function start() {
    clearCanvas();

    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    ctx.fillText(
      `You died and scored ${(currentMap.lvl - 1) * 100}`,
      baseW / 2,
      baseH / 2
    );

    if (fontSize < baseW / 16) {
      fontSize += 0.5;
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
    screenStart();
  }
}
