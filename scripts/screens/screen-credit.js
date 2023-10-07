function screenCredit() {
  canvas.style.background = cWhite2;

  contentEl.innerHTML = `
    <div class="start">
      <h1>Credit</h1>
      <p>Game director, developer and designer: Rémy Beumier</p>
      <p>Soundtracks: xDeviruchi https://www.youtube.com/watch?v=5bn3Jmvep1k</p>
      <p>Designs: </p>
    </div>
  `;

  document.addEventListener('keydown', keyCreditHandler);
  contentEl.addEventListener('click', keyCreditHandler);

  function keyCreditHandler() {
    stop();
  }

  function stop() {
    document.removeEventListener('keydown', keyCreditHandler);
    contentEl.removeEventListener('click', keyCreditHandler);
    contentEl.innerHTML = '';
    screenStart();
  }
}
