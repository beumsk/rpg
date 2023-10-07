function screenHow() {
  canvas.style.background = cWhite2;

  contentEl.innerHTML = `
    <div class="start">
      <h1>How to play</h1>
      <p>Fight your way through enemies leading to new maps leading to new worlds and finally to bring peace.</p>
      <p><kbd>Esc</kbd>: open/close menu when walking in the world</p>
      <p><kbd>←↑↓→</kbd>: to navigate menus and select buttons</p>
      <p><kbd>Enter</kbd>: to validate selection</p>
      <p><kbd>Return</kbd>: to go back</p>
    </div>
  `;

  document.addEventListener('keydown', keyHowHandler);
  contentEl.addEventListener('click', keyHowHandler);

  function keyHowHandler() {
    stop();
  }

  function stop() {
    document.removeEventListener('keydown', keyHowHandler);
    contentEl.removeEventListener('click', keyHowHandler);
    contentEl.innerHTML = '';
    screenStart();
  }
}
