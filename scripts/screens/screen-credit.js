function screenCredit() {
  contentEl.style.background = cWhite2;

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

  backButton[0].addEventListener('click', keyCreditHandler);
  backButton[0].focus();

  function keyCreditHandler() {
    stop();
  }

  function stop() {
    backButton[0].removeEventListener('click', keyCreditHandler);
    screenStart();
  }
}
