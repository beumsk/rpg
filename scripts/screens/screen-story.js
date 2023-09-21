function screenStory(textArr, screenFunc) {
  canvas.style.background = '#ddd';

  let i = 0;

  contentEl.innerHTML = `<div class="text">${textArr[i]}</div>`;

  document.addEventListener('keydown', keyStoryHandler);
  function keyStoryHandler() {
    i++;
    if (i < textArr.length) {
      contentEl.innerHTML = `<div class="text">${textArr[i]}</div>`;
    } else {
      document.removeEventListener('keydown', keyStoryHandler);
      contentEl.innerHTML = '';
      screenTransition('bottom', () => screenFunc());
    }
  }
}
