function screenEnd(win) {
  canvas.style.backgroundImage = '';

  stateEl.innerHTML = '';

  let fontSize = baseW / 32;
  let textColor = cText2;

  let animationId;

  function start() {
    clearCanvas();

    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    ctx.fillText(
      `You ${win ? 'win and' : 'died but'} scored ${
        player.xp +
        player.hp * 5 +
        player.str * 10 +
        player.def * 5 +
        player.gems
      }`,
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
  document.addEventListener('keydown', keyEndHandler);
  function keyEndHandler() {
    stop();
    document.removeEventListener('keydown', keyEndHandler);
    screenSplash();
  }
}
