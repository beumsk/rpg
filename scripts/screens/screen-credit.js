function screenCredit() {
  canvas.style.background = cWhite2;

  const backButton = contentEl.getElementsByClassName('back');

  contentEl.innerHTML = `
    <div class="start">
      <h1>Credit</h1>
      <p>Game director, developer and designer: Rémy Beumier</p>
      <p>Soundtracks: xDeviruchi https://www.youtube.com/watch?v=5bn3Jmvep1k</p>
      <button class="back">← Back</button>
    </div>
  `;
  // <p>Designs: </p>

  document.addEventListener('keydown', keyCreditHandler);
  backButton[0].addEventListener('click', keyCreditHandler);

  function keyCreditHandler() {
    stop();
  }

  function stop() {
    document.removeEventListener('keydown', keyCreditHandler);
    backButton[0].removeEventListener('click', keyCreditHandler);
    contentEl.innerHTML = '';
    screenStart();
  }
}
