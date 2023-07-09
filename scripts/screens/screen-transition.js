function screenTransition(dir, screenFunc = screenWorld) {
  const step = 8;
  let rectX = 0;
  let rectY = 0;

  if (dir === 'right') rectX = -step;
  if (dir === 'left') rectX = canW;
  if (dir === 'bottom') rectY = -step;
  if (dir === 'top') rectY = canH;

  let animationId;

  function start() {
    ctx.fillStyle = cBack3;
    if (dir !== 'top' && dir !== 'bottom') {
      ctx.fillRect(rectX, rectY, 16, canH);
      if (dir === 'left') {
        transitionLogic(rectX !== 0, (rectX -= step));
      } else {
        transitionLogic(rectX !== canW, (rectX += step));
      }
    } else {
      ctx.fillRect(rectX, rectY, canW, 16);
      if (dir === 'top') {
        transitionLogic(rectY !== 0, (rectY -= step));
      } else {
        transitionLogic(rectY !== canW, (rectY += step));
      }
    }
  }

  function transitionLogic(condition, operation) {
    if (condition) {
      operation;
      animationId = requestAnimationFrame(start);
    } else {
      stop();
      screenFunc();
    }
  }

  function stop() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canW, canH);
  }

  start();
}
