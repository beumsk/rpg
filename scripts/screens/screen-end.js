function screenEnd(win) {
  canvas.style.background = cWhite2;

  bgImg = 'temple';
  cGrad1 = cBack2;
  cGrad2 = cBack4;
  stateEl.style.background = cBack2;
  contentEl.style.background = 'transparent';

  stateEl.innerHTML = '';

  contentEl.innerHTML = `
    <div class="end">
      <img src='./img/logo.png', class="logo" />
      <h1 style="color: var(--red)">You ${win ? 'win and' : 'died but'} scored 
      ${player.xp + player.hp * 5 + player.str * 10 + player.def * 5 + player.gems}</h1>
      <p>Press any key</p>
    </div>
  `;

  document.addEventListener('keydown', keyEndHandler);
  contentEl.addEventListener('click', keyEndHandler);

  function keyEndHandler() {
    document.removeEventListener('keydown', keyEndHandler);
    contentEl.removeEventListener('click', keyEndHandler);
    screenSplash();
  }
}
