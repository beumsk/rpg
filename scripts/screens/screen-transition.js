function screenTransition(dir, screenFunc = screenWorld, text) {
  let duration = 1;

  infoEl.innerText = '';
  ctx.fillStyle = 'transparent';

  transitionEl.style.backgroundColor = cGrad2;

  transitionEl.className = `transition to-${dir}`;
  transitionEl.style.animationDuration = duration + 's';

  if (text) {
    transitionEl.innerHTML = `<h1>${text}</h1>`;
  }

  actionMenuEl.innerText = '';

  setTimeout(() => {
    transitionEl.innerHTML = '';
    screenFunc();
    transitionEl.className = 'transition';
  }, duration * 1000 + 400);
}
