function screenTransition(dir, screenFunc = screenWorld) {
  const speed = step / 2;
  let rectX = 0;
  let rectY = 0;

  infoEl.innerText = '';

  if (dir === 'right') rectX = -speed;
  if (dir === 'left') rectX = baseW;
  if (dir === 'bottom') rectY = -speed;
  if (dir === 'top') rectY = baseH;

  let animationId;

  function start() {
    ctx.fillStyle = cBack3;
    if (dir !== 'top' && dir !== 'bottom') {
      ctx.fillRect(rectX, rectY, step, baseH);
      if (dir === 'left') {
        transitionLogic(rectX !== 0, (rectX -= speed));
      } else {
        transitionLogic(rectX !== baseW, (rectX += speed));
      }
    } else {
      ctx.fillRect(rectX, rectY, baseW, step);
      if (dir === 'top') {
        transitionLogic(rectY !== 0, (rectY -= speed));
      } else {
        transitionLogic(rectY !== baseW, (rectY += speed));
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
    clearCanvas();
  }

  start();
}
