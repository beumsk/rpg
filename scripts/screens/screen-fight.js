function screenFight() {
  canvas.style.backgroundImage = `linear-gradient(45deg, ${cBack2} 60%, ${cGrad2} 60%)`;
  canvas.style.backgroundSize = 'unset';

  const rectWidth = 120;
  const rectHeight = 48;
  let enemyX = 0;
  const enemyY = textOffset * 2;
  let playerX = baseW - rectWidth - textOffset * 2;
  const playerY = baseH - rectHeight - textOffset * 2;

  let animationId;

  const mainMenu = [{ name: 'attacks' }, { name: 'items' }];

  let index = 0;
  let menuLinks = infoEl.getElementsByTagName('button');
  let crtMenu = 'main';

  createMenu(mainMenu, 'main');

  function keyFightHandler(e) {
    const key = e.key;
    if (key === 'Backspace' || key === 'Escape') {
      createMenu(mainMenu, 'main');
    } else if (key === 'ArrowRight') {
      e.preventDefault();
      index = index !== menuLinks.length - 1 ? index + 1 : 0;
      menuLinks[index].focus();
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      index = index !== 0 ? index - 1 : menuLinks.length - 1;
      menuLinks[index].focus();
    } else if (key === 'Enter') {
      const next = fireQueue();
      if (next === 'stop') {
        stop();
        screenTransition('left', () => screenFightEnd());
      } else if (next === 'play') {
        createMenu(mainMenu, 'main');
      }
    }
  }

  function start() {
    document.addEventListener('keydown', keyFightHandler);

    const frame = () => {
      clearCanvas();

      // TODO: show player/enemy hp as text?
      // TODO: show how much dmg p/e hit?
      // TODO: add attacks animations

      // animates the boxes
      if (enemyX < baseW - rectWidth - textOffset * 2) enemyX += 4;
      if (playerX > textOffset * 2) playerX -= 4;

      // create enemy and player boxes
      drawRect(enemyX, enemyY, rectWidth, rectHeight, cWhite, cEnemy, 1);
      drawRect(
        enemyX + textOffset,
        enemyY + textOffset * 4,
        rectWidth - textOffset * 2,
        textOffset,
        cEnemy,
        cEnemy,
        currentEnemy.hp / currentEnemy.hpmax
      );
      drawRect(playerX, playerY, rectWidth, rectHeight, cWhite, cPlayer, 1);
      drawRect(
        playerX + textOffset,
        playerY + textOffset * 4,
        rectWidth - textOffset * 2,
        textOffset,
        cPlayer,
        cPlayer,
        player.hp / player.hpmax
      );
      ctx.font = '12px monospace';
      ctx.fillStyle = cText;
      ctx.fillText(
        currentEnemy.name,
        enemyX + textOffset,
        enemyY + textOffset * 2
      );
      ctx.fillText(player.name, playerX + textOffset, playerY + textOffset * 2);

      animationId = requestAnimationFrame(frame);
    };
    frame();
  }

  function stop() {
    cancelAnimationFrame(animationId);
    document.removeEventListener('keydown', keyFightHandler);
    clearCanvas();
  }

  start();

  function createMenu(menuList, menuName) {
    crtMenu = menuName;
    infoEl.innerHTML = '';
    if (menuList?.length > 0) {
      menuList.map((x, i) => {
        const linkEl = document.createElement('button');
        linkEl.href = '';
        linkEl.innerText = x.name;
        linkEl.dataset.menu = menuName;
        linkEl.dataset.value = x.name;
        infoEl.appendChild(linkEl);
        index = 0;
        if (i === index) linkEl.focus();
        linkEl.addEventListener('click', linkClick);
      });
    } else {
      createMenu(mainMenu, 'main');
    }
  }

  function linkClick(e) {
    e.preventDefault();
    let crt = e.target;
    if (crtMenu === 'main') {
      if (crt.dataset.value === 'attacks' || crt.dataset.value === 'items') {
        createMenu(player[crt.dataset.value], crt.dataset.value);
      }
    } else if (crtMenu === 'attacks') {
      playerAttack(crt.innerText);
    } else if (crtMenu === 'items') {
      itemUse(crt.innerText, false);
    }
  }
}
