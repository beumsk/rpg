function screenStart() {
  canvas.style.background = '#ddd';

  // reset
  cGrad1 = cBack2;
  cGrad2 = cBack4;
  stateEl.style.background = cBack2;
  player = { ...playerBase };
  maps = [...mapsBase];
  currentMap = { ...maps[0] };
  stuffEquip(stuffBase);
  stuffRewarded = [];

  let index = 0;
  let startButtons = contentEl.getElementsByTagName('button');

  // TODO: add load game logic
  contentEl.innerHTML = `
    <div class="start">
      <h1 style="color: var(--red)">Tavara</h1>
      <button data-type="start">Start your adventure</button>
      <button data-type="continue">Continue your adventure</button>
      <button data-type="how">How to play</button>
      <button data-type="credit">Credit</button>
    </div>
  `;

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
      // screenTransition('bottom', () => screenStory('intro'));
      screenTransition('bottom', () => screenWorld());
    } else if (crt.dataset.type === 'continue') {
      // TODO: add continue feature
    } else if (crt.dataset.type === 'how') {
      screenHow();
    } else if (crt.dataset.type === 'credit') {
      screenCredit();
    }
  }
}
