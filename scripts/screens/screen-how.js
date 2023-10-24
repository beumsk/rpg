function screenHow() {
  contentEl.style.background = cWhite2;

  const backButton = contentEl.getElementsByClassName('back');

  contentEl.innerHTML = `
    <div class="start">
      <h1>How to play</h1>
      <p>Fight your way through enemies leading to new maps leading to new worlds to finally beat the masters and bring peace.</p>
      <p>You can use touch/clicks or keyboard.</p>
      <p><kbd>Esc</kbd>: open/close menu when walking in the world</p>
      <p><kbd>◂▴▾▸</kbd>: navigate menus and select buttons</p>
      <p><kbd>Enter | Spacebar</kbd>: validate selection</p>
      <p><kbd>Return</kbd>: go back</p>
      <button class="back">← Back</button>
    </div>
  `;

  backButton[0].addEventListener('click', keyHowHandler);
  backButton[0].focus();

  function keyHowHandler() {
    stop();
  }

  function stop() {
    backButton[0].removeEventListener('click', keyHowHandler);
    screenStart();
  }
}
