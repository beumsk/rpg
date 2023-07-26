function screenMenu() {
  container.style.backgroundImage = '';

  let animationId;

  subText = '';

  // TODO: add logic when too many items in menu

  const mainMenu = [
    { name: 'stats' },
    { name: 'attacks' },
    { name: 'items' },
    { name: 'stuff' },
    { name: 'options' },
  ];
  let currentMenu;
  let currentMenuName;
  let currentMenuItem;
  defaultMenu();

  function defaultMenu() {
    currentMenu = mainMenu;
    currentMenuName = 'main';
    currentMenuItem = mainMenu[0].name;
  }

  function keyWorldHandler(event) {
    const key = event.key;
    if (key === 'ArrowUp') {
      let i = currentMenu.findIndex((x) => x.name === currentMenuItem);
      currentMenuItem =
        currentMenu[i > 0 ? i - 1 : currentMenu.length - 1].name;
    } else if (key === 'ArrowDown') {
      let i = currentMenu.findIndex((x) => x.name === currentMenuItem);
      currentMenuItem =
        currentMenu[i < currentMenu.length - 1 ? i + 1 : 0].name;
    } else if (key === 'ArrowLeft' || key === 'Backspace') {
      if (currentMenu === mainMenu) {
        stop();
      } else {
        defaultMenu();
      }
    } else if (key === 'ArrowRight' || key === 'Enter' || key === ' ') {
      if (currentMenuName === 'main') {
        if (currentMenuItem === 'stats') {
          currentMenu = [
            { name: `lvl: ${player.lvl}` },
            { name: `xp: ${player.xp}` },
            { name: `map: ${currentMap.lvl}` },
            { name: `gold: ${player.gold}` },
            { name: `str: ${player.str}` },
            { name: `hp: ${player.hp}/${player.hpmax}` },
          ];
        } else if (currentMenuItem === 'stuff') {
          currentMenu = player[currentMenuItem];
          currentMenuName = currentMenuItem;
          currentMenuItem = currentMenu[0].name;
        } else if (currentMenuItem === 'options') {
          currentMenu = [{ name: `sound` }, { name: `save` }, { name: `load` }];
        } else {
          currentMenu = player[currentMenuItem].filter((x) => x.qtt !== 0);
          currentMenuName = currentMenuItem;
          currentMenuItem = currentMenu[0].name;
          if (!currentMenu.length) defaultMenu();
        }
      } else if (currentMenuName === 'items') {
        itemUse(currentMenuItem, defaultMenu);
      } else if (currentMenuName === 'attacks') {
        // TODO: re order attacks option?
      } else if (currentMenuName === 'stuff') {
        stuffEquip(stuff.filter((x) => x.name === currentMenuItem));
      } else if (currentMenuName === 'options') {
        // TODO: add options: sound, save, load
      }
    } else if (key === 'Escape') {
      stop();
    }
  }

  function start() {
    document.addEventListener('keydown', keyWorldHandler);

    const step = () => {
      ctx.clearRect(0, 0, canW, canH);
      ctx.font = '12px monospace';
      currentMenu
        .filter((x) => x.qtt !== 0)
        .map((x, i) => {
          if (currentMenuName !== 'stats') {
            ctx.fillStyle = x.name === currentMenuItem ? cText2 : cText;
          }
          if (currentMenuName === 'attacks') {
            ctx.fillText(x.desc, textOffset, textOffset * 2 + 24 * i);
          } else if (currentMenuName === 'stuff') {
            // TODO: add icons for stuff
            ctx.fillText(
              x.equiped
                ? `|${x.equiped.charAt(0).toUpperCase()}| ${
                    x.name
                  } ${JSON.stringify(x.effect)}`
                : `    ${x.name} ${JSON.stringify(x.effect)}`,
              textOffset,
              textOffset * 2 + 24 * i
            );
          } else if (currentMenuName === 'items') {
            ctx.fillText(
              `${x.desc}: x${x.qtt}`,
              textOffset,
              textOffset * 2 + 24 * i
            );
          } else {
            ctx.fillText(x.name, textOffset, textOffset * 2 + 24 * i);
          }
        });

      drawInfoBox();
      ctx.fillText(subText, textOffset, canH - 16);

      animationId = requestAnimationFrame(step);
    };
    step();
  }

  function stop() {
    cancelAnimationFrame(animationId);
    document.removeEventListener('keydown', keyWorldHandler);
    ctx.clearRect(0, 0, canW, canH);
    screenWorld(true);
  }

  start();
}
