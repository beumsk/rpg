function screenTransition(dir, screenFunc = screenWorld, text, bg = cGrad2) {
  let duration = 1;

  // TODO: add more transitions

  infoEl.innerText = '';
  ctx.fillStyle = 'transparent';

  transitionEl.style.backgroundColor = bg;

  transitionEl.className = `transition to-${dir}`;
  transitionEl.style.animationDuration = duration + 's';

  if (text) {
    transitionEl.innerHTML = `<h1>${text}</h1>`;
  }

  actionMenuEl.innerText = '';

  setTimeout(() => {
    contentEl.innerHTML = '';
    fightEl.innerHTML = '';
    transitionEl.innerHTML = '';
    screenFunc();
    transitionEl.className = 'transition';
  }, duration * 1000 + 400);
}
