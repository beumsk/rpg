function screenTransition(dir, screenFunc = screenWorld) {
  let duration = 2;

  infoEl.innerText = '';

  transitionEl.style.backgroundColor = cGrad2;

  transitionEl.className = `transition to-${dir}`;
  transitionEl.style.animationDuration = duration + 's';

  setTimeout(() => {
    screenFunc();
    transitionEl.className = 'transition';
  }, duration * 1000);
}
