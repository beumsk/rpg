function screenTransition(dir, screenFunc = screenWorld) {
  let duration = 1;

  infoEl.innerText = '';
  ctx.fillStyle = 'transparent';

  transitionEl.style.backgroundColor = cGrad2;

  transitionEl.className = `transition to-${dir}`;
  transitionEl.style.animationDuration = duration + 's';

  actionMenuEl.innerText = '';

  setTimeout(() => {
    screenFunc();
    transitionEl.className = 'transition';
  }, duration * 1000);
}
