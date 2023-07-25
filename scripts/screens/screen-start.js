function screenStart() {
  container.style.backgroundImage = '';

  // reset
  player = { ...playerBase };
  currentMap = { ...maps[1] };
  stuffEquip(stuffBase);
  stuffFind(stuff.filter((x) => x.name === 'test ring'));

  // TODO: load logic?

  let fontSize = 120;
  let textColor = cText2;

  let animationId;

  function start() {
    ctx.clearRect(0, 0, canW, canH);

    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    ctx.fillText('RPG', canW / 2, canH / 2);

    if (fontSize > 60) {
      fontSize -= 1;
    } else {
      ctx.font = '20px monospace';
      ctx.fillStyle = cText;
      ctx.fillText('Press any key', canW / 2, canH / 2 + 70);
    }

    animationId = requestAnimationFrame(start);
  }

  function stop() {
    cancelAnimationFrame(animationId);
    ctx.textAlign = 'start';
    ctx.clearRect(0, 0, canW, canH);
  }

  start();
  document.addEventListener('keydown', keyStartHandler);
  function keyStartHandler() {
    stop();
    document.removeEventListener('keydown', keyStartHandler);
    screenTransition('bottom', () => screenWorld());
  }
}
