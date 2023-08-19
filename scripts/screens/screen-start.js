function screenStart() {
  canvas.style.background = '#ddd';

  // reset
  cGrad2 = cBack4;
  stateEl.style.background = cBack2;
  player = { ...playerBase };
  maps = [...mapsBase];
  currentMap = { ...maps[0] };
  stuffEquip(stuffBase);

  // TODO: add load game logic
  contentEl.innerHTML = `
    <div class="text">
      <h1>Ready to start your adventure?</h1>
    </div>
  `;
  // <p>OR</p>
  // <h1>Continue your adventure?</h1>

  document.addEventListener('keydown', keyStartHandler);
  function keyStartHandler() {
    document.removeEventListener('keydown', keyStartHandler);
    contentEl.innerHTML = '';
    // screenTransition('bottom', () => screenStory('intro'));
    screenTransition('bottom', () => screenWorld());
  }
}
