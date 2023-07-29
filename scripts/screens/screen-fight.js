function screenFight() {
  canvas.style.backgroundImage = `linear-gradient(45deg, ${cBack2} 60%, ${cBack4} 60%)`;
  canvas.style.backgroundSize = 'unset';

  // TODO: simplify the logic

  const rectWidth = 120;
  const rectHeight = 48;
  let enemyX = 0;
  const enemyY = textOffset * 2;
  let playerX = baseW - rectWidth - textOffset * 2;
  const playerY = baseH - rectHeight - 48;

  const mainMenu = [{ name: 'attacks' }, { name: 'items' }];
  let currentMenu;
  let currentMenuName;
  let currentMenuItem;
  defaultMenu();

  function defaultMenu() {
    currentMenu = mainMenu;
    currentMenuName = 'main';
    currentMenuItem = mainMenu[0].name;
  }

  let nextPlay = 'player';

  let animationId;

  function keyFightHandler(event) {
    const key = event.key;
    if (nextPlay === 'player') {
      // menu navigation
      if (key === 'Enter' || key === ' ') {
        if (currentMenuName === 'main') {
          currentMenu = player[currentMenuItem].filter((x) => x.qtt !== 0);
          currentMenuName = currentMenuItem;
          currentMenuItem = player[currentMenuItem][0].name;
          if (!currentMenu.length) defaultMenu();
        } else if (currentMenuName === 'items') {
          nextPlay = 'player item';
          subText = `${player.name} uses ${currentMenuItem}`;
        } else if (currentMenuName === 'attacks') {
          nextPlay = 'player attack';
          subText = `${player.name} uses ${currentMenuItem}`;
        }
      } else if (key === 'Backspace' || key === 'Escape') {
        defaultMenu();
      } else if (key === 'ArrowRight') {
        let i = currentMenu.findIndex((x) => x.name === currentMenuItem);
        currentMenuItem =
          currentMenu[i < currentMenu.length - 1 ? i + 1 : 0].name;
      } else if (key === 'ArrowLeft') {
        let i = currentMenu.findIndex((x) => x.name === currentMenuItem);
        currentMenuItem =
          currentMenu[i > 0 ? i - 1 : currentMenu.length - 1].name;
      }
    } else {
      // menu action
      if (key === 'Enter' || key === ' ') {
        if (nextPlay === 'player attack') {
          attackUse(currentMenuItem);
          if (currentEnemy.hp === 0) {
            subText = `${currentEnemy.name} is dead`;
            nextPlay = 'enemy dead';
          } else {
            subText = `${currentEnemy.name} is attacking...`;
            nextPlay = 'enemy';
          }
        } else if (nextPlay === 'player item') {
          itemUse(currentMenuItem);
          subText = `${currentEnemy.name} is attacking...`;
          nextPlay = 'enemy';
        } else if (nextPlay === 'enemy dead') {
          player.xp += currentEnemy.xp;
          player.gold += currentEnemy.gold;
          randomKeyDrop();
          checkLvlUp(player.lvl, player.xp);
          stop();
          screenTransition('left', () => screenWorld());
          nextPlay = 'player';
        } else if (nextPlay === 'enemy') {
          subText = `${currentEnemy.name} uses ${currentEnemy.attacks[0].name}`;
          nextPlay = 'enemy attack';
        } else if (nextPlay === 'enemy attack') {
          currentEnemy.attackUse();
          defaultMenu();
          if (player.hp === 0) {
            subText = `${player.name} is dead`;
            nextPlay = 'player dead';
          } else {
            subText = '';
            nextPlay = 'player';
          }
        } else if (nextPlay === 'player dead') {
          stop();
          screenTransition('bottom', () => screenEnd());
          nextPlay = 'player';
        }
      }
    }
  }

  function start() {
    document.addEventListener('keydown', keyFightHandler);

    const frame = () => {
      clearCanvas();

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
      ctx.font = '16px monospace';
      ctx.fillStyle = cText;
      ctx.fillText(
        currentEnemy.name,
        enemyX + textOffset,
        enemyY + textOffset * 2
      );
      ctx.fillText(player.name, playerX + textOffset, playerY + textOffset * 2);

      // create menu of actions
      drawInfoBox();
      if (nextPlay === 'player') {
        currentMenu
          .filter((x) => x.qtt !== 0)
          .map((x, i) => {
            ctx.fillStyle = x.name === currentMenuItem ? cText2 : cText;
            ctx.fillText(x.name, textOffset + 72 * i, baseH - 16);
          });
      } else {
        ctx.fillText(subText, textOffset, baseH - textOffset * 2);
      }

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
}
