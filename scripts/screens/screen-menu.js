function screenMenu() {
  container.style.backgroundImage = '';

  let animationId;

  // TODO: add logic when too many items in menu
  // TODO: add text when menu is empty or remove it?

  const mainMenu = [
    { name: 'stats' },
    { name: 'attacks' },
    { name: 'items' },
    { name: 'stuff' },
    { name: 'options' },
  ];
  let currentMenu = mainMenu;
  let currentMenuName = 'main';
  let currentMenuItem = 'stats';

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
      currentMenu = mainMenu;
      currentMenuName = 'main';
      currentMenuItem = mainMenu[0].name;
    } else if (key === 'ArrowRight' || key === 'Enter' || key === ' ') {
      if (currentMenuName === 'main') {
        if (currentMenuItem !== 'stats') {
          currentMenu = player[currentMenuItem].filter((x) => x.qtt !== 0);
          currentMenuName = currentMenuItem;
          currentMenuItem = player[currentMenuItem][0].name;
        } else {
          currentMenu = [
            { name: `${player.name}` },
            { name: `lvl: ${player.lvl}` },
            { name: `xp: ${player.xp}` },
            { name: `map: ${currentMap.lvl}` },
            { name: `gold: ${player.gold}` },
            { name: `str: ${player.str}` },
            { name: `hp: ${player.hp}/${player.hpmax}` },
          ];
        }
      } else if (currentMenuName === 'items') {
        itemUse(currentMenuItem);
      } else if (currentMenuName === 'attacks') {
        // TODO: re order attacks option?
      } else if (currentMenuName === 'stuff') {
        // TODO: add option to equip stuff
      } else if (currentMenuName === 'options') {
        // TODO: add options: sound, save, load
      }
    } else if (key === 'Escape') {
      stop();
      document.removeEventListener('keydown', keyWorldHandler);
      screenWorld(true);
    }
  }

  function start() {
    document.addEventListener('keydown', keyWorldHandler);

    const step = () => {
      ctx.clearRect(0, 0, canW, canH);
      // drawRect(1, 1, 160, canH - 2, cWhite, cBlack, 1);
      ctx.font = '12px monospace';
      currentMenu
        .filter((x) => x.qtt !== 0)
        .map((x, i) => {
          if (currentMenuName !== 'stats') {
            ctx.fillStyle = x.name === currentMenuItem ? cText2 : cText;
          }
          if (['attacks', 'items', 'stuff'].includes(currentMenuName)) {
            ctx.fillText(x.desc, textOffset, textOffset * 2 + 24 * i);
          } else {
            ctx.fillText(x.name, textOffset, textOffset * 2 + 24 * i);
          }
        });

      animationId = requestAnimationFrame(step);
    };
    step();
  }

  function stop() {
    cancelAnimationFrame(animationId);
    document.removeEventListener('keydown', keyWorldHandler);
    ctx.clearRect(0, 0, canW, canH);
  }

  start();
}
