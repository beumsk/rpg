function screenMenu() {
  canvas.style.backgroundImage = '';

  let animationId;

  infoEl.innerText = '';

  // TODO: add logic when too many items in menu

  const mainMenu = [
    { name: 'stats' },
    { name: 'attacks' },
    { name: 'items' },
    { name: 'stuff' },
    { name: 'options' },
  ];

  let index = 0;
  let menuLinks = menuEl.getElementsByTagName('a');
  let crtMenu = 'main';

  createMenu(mainMenu, 'main');

  function keyMenuHandler(event) {
    const key = event.key;
    if (key === 'ArrowLeft' || key === 'Backspace') {
      if (crtMenu === 'main') {
        stop();
      } else {
        infoEl.innerText = '';
        crtMenu = 'main';
        createMenu(mainMenu, 'main');
      }
    } else if (key === 'ArrowUp') {
      infoEl.innerText = '';
      index = index !== 0 ? index - 1 : menuLinks.length - 1;
      menuLinks[index].focus();
    } else if (key === 'ArrowDown') {
      infoEl.innerText = '';
      index = index !== menuLinks.length - 1 ? index + 1 : 0;
      menuLinks[index].focus();
    } else if (key === 'Escape') {
      stop();
    }
  }

  function start() {
    document.addEventListener('keydown', keyMenuHandler);

    const frame = () => {
      clearCanvas();
      ctx.font = '12px monospace';

      animationId = requestAnimationFrame(frame);
    };
    frame();
  }

  function stop() {
    infoEl.innerText = '';
    cancelAnimationFrame(animationId);
    document.removeEventListener('keydown', keyMenuHandler);
    deleteMenu();
    clearCanvas();
    screenWorld(true);
  }

  start();

  function deleteMenu() {
    menuEl.innerHTML = '';
  }

  function createMenu(menuList, menuName) {
    crtMenu = menuName;
    menuEl.innerHTML = '';
    if (menuList?.length > 0) {
      menuList.map((x, i) => {
        const linkEl = document.createElement('a');
        linkEl.href = '';
        if (menuName === 'attacks') {
          linkEl.innerText = `${x.name}: ${x.desc}`;
        } else if (menuName === 'items') {
          linkEl.innerText = `${x.name}: ${x.desc} (x${x.qtt})`;
        } else if (menuName === 'stuff') {
          linkEl.innerText = x.equiped
            ? `|${x.equiped.charAt(0).toUpperCase()}| ${
                x.name
              } ${JSON.stringify(x.effect)}`
            : `    ${x.name} ${JSON.stringify(x.effect)}`;
        } else {
          linkEl.innerText = x.name;
        }
        linkEl.dataset.menu = menuName;
        linkEl.dataset.value = x.name;
        menuEl.appendChild(linkEl);
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
      if (crt.dataset.value === 'stats') {
        createMenu(
          [
            { name: `lvl: ${player.lvl}` },
            { name: `xp: ${player.xp}` },
            { name: `map: ${currentMap.lvl}` },
            { name: `gold: ${player.gold}` },
            { name: `str: ${player.str}` },
            { name: `hp: ${player.hp}/${player.hpmax}` },
          ],
          crt.dataset.value
        );
      } else if (crt.dataset.value === 'options') {
        createMenu(
          [{ name: `sound` }, { name: `save` }, { name: `load` }],
          crt.dataset.value
        );
      } else {
        createMenu(player[crt.dataset.value], crt.dataset.value);
      }
    } else if (crtMenu === 'attacks') {
      // TODO: re order attacks option?
    } else if (crtMenu === 'items') {
      itemUse(crt.dataset.value, true);
      createMenu(player[crtMenu], crtMenu);
    } else if (crtMenu === 'stuff') {
      stuffEquip(stuff.filter((x) => x.name === crt.dataset.value));
      createMenu(player[crtMenu], crtMenu);
    } else if (crtMenu === 'options') {
      // TODO: add options: sound, save, load
    }
  }
}
