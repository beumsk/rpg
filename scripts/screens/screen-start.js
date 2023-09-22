function screenStart() {
  let index = 0;
  let startButtons = contentEl.getElementsByTagName('button');

  contentEl.innerHTML = `
    <div class="start">
      <h1 style="color: var(--red)">Tavara</h1>
      <button data-type="start">Start a new adventure</button>
      <button data-type="how">How to play</button>
      <button data-type="credit">Credit</button>
    </div>
  `;

  // TODO: add export/import file ?
  if (localStorage.getItem('game')) {
    const startEl = document.querySelector('[data-type="start"]');
    startEl.insertAdjacentHTML(
      'afterend',
      `<button data-type="continue">Continue your adventure</button>`
    );
  }

  Array.from(startButtons).map((x) => x.addEventListener('click', startClick));
  startButtons[0].focus();

  document.addEventListener('keydown', keyStartHandler);

  function keyStartHandler(e) {
    const key = e.key;
    if (key === 'ArrowDown') {
      index = index !== startButtons.length - 1 ? index + 1 : 0;
      startButtons[index].focus();
    } else if (key === 'ArrowUp') {
      index = index !== 0 ? index - 1 : startButtons.length - 1;
      startButtons[index].focus();
    }
  }

  function stop() {
    document.removeEventListener('keydown', keyStartHandler);
    contentEl.innerHTML = '';
  }

  function startClick(e) {
    let crt = e.target;
    stop();
    if (crt.dataset.type === 'start') {
      gameReset();
      // screenTransition('bottom', () => screenStory(texts['intro'], () => screenWorld()));
      screenTransition('bottom', () => screenWorld());
    } else if (crt.dataset.type === 'continue') {
      gameLoad();
      screenTransition('bottom', () => screenWorld());
    } else if (crt.dataset.type === 'how') {
      screenHow();
    } else if (crt.dataset.type === 'credit') {
      screenCredit();
    }
  }
}
