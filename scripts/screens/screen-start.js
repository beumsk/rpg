function screenStart() {
  canvas.style.background = '#ddd';

  // reset
  player = { ...playerBase };
  currentMap = { ...maps[player.lvl] };
  stuffEquip(stuffBase);
  // stuffFind(stuff.filter((x) => !x.base));

  // TODO: add load game logic
  contentEl.innerHTML = `
  <h1>Ready to start your adventure?</h1>
  `;
  // <p>OR</p>
  // <h1>Continue your adventure?</h1>

  document.addEventListener('keydown', keyStartHandler);
  function keyStartHandler() {
    document.removeEventListener('keydown', keyStartHandler);
    contentEl.innerHTML = '';
    screenTransition('bottom', () => screenWorld());
  }
}
