function screenTransition(dir, screen = 'world') {
  let rectX = 0;
  let rectY = 0;

  if (dir === 'left') rectX = canW;

  if (dir === 'top') rectY = canH;

  let animationId;

  function start() {
    ctx.fillStyle = cBack3;
    if (dir !== 'top' && dir !== 'bottom') {
      ctx.fillRect(rectX, rectY, 16, canH);
      if (dir === 'left') {
        transitionLogic(rectX !== 0, (rectX -= 8));
      } else {
        transitionLogic(rectX !== canW, (rectX += 8));
      }
    } else {
      ctx.fillRect(rectX, rectY, canW, 16);
      if (dir === 'top') {
        transitionLogic(rectY !== 0, (rectY -= 8));
      } else {
        transitionLogic(rectY !== canW, (rectY += 8));
      }
    }
  }

  function transitionLogic(condition, operation) {
    if (condition) {
      operation;
      animationId = requestAnimationFrame(start);
    } else {
      stop();
      screenLogic(screen);
    }
  }

  function stop() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canW, canH);
  }

  start();
}
