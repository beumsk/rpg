function screenStory(textName) {
  canvas.style.background = '#ddd';

  let i = 0;

  contentEl.innerHTML = `<div class="text">${texts[textName][i]}</div>`;

  document.addEventListener('keydown', keyStartHandler);
  function keyStartHandler() {
    i++;
    if (i < texts[textName].length) {
      contentEl.innerHTML = `<div class="text">${texts[textName][i]}</div>`;
    } else {
      document.removeEventListener('keydown', keyStartHandler);
      contentEl.innerHTML = '';
      if (textName === 'outro') {
        screenTransition('bottom', () => screenEnd(true));
      } else {
        screenTransition('bottom', () => screenWorld());
      }
    }
  }
}
