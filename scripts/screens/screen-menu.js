function screenMenu() {
  canvas.style.backgroundImage = '';

  let animationId;

  infoEl.innerText = ' ';

  const mainMenu = [
    { name: 'stats' },
    { name: 'attacks' },
    { name: 'items' },
    { name: 'stuff' },
    { name: 'shop' },
    { name: 'options' },
  ];

  let index = 0;
  let menuLinks = contentEl.getElementsByTagName('button');
  let crtMenu = 'main';

  const codeStatsMenu = () => [
    { name: `lvl: ${player.lvl}` },
    { name: `xp: ${player.xp}/${lvls[player.lvl + 1]} ↗` },
    { name: `map: ${currentMap.name} ⫯` },
    { name: `gems: ${player.gems} ⨀` },
    { name: `str: ${player.str} ↣` }, // ⊕
    { name: `def: ${player.def} ∇` }, // ⊖
    { name: `hp: ${player.hp}/${player.hpmax} ♥` },
    { name: `element: ${player.element}` }, // air ☴ > earth ☷ > water ☵ > fire ☲ (trigrams)
  ];
  let statsMenu;

  createMenu(mainMenu, 'main');

  function keyMenuHandler(e) {
    const key = e.key;
    if (key === 'ArrowLeft' || key === 'Backspace') {
      if (crtMenu === 'main') {
        stop();
      } else {
        infoEl.innerText = ' ';
        crtMenu = 'main';
        createMenu(mainMenu, 'main');
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      infoEl.innerText = ' ';
      index = index !== 0 ? index - 1 : menuLinks.length - 1;
      menuLinks[index].focus();
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      infoEl.innerText = ' ';
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
    contentEl.innerHTML = '';
    clearCanvas();
    screenWorld(true);
  }

  start();

  function createMenu(menuList, menuName) {
    crtMenu = menuName;
    contentEl.innerHTML = '<div class="menu"></div>';
    if (menuList?.length > 0) {
      menuList.map((x, i) => {
        const linkEl = document.createElement('button');
        linkEl.href = '';
        if (menuName === 'attacks') {
          linkEl.innerText = `${x.name}: ${x.desc}`;
        } else if (menuName === 'items') {
          linkEl.innerText = `${x.name}: ${x.desc} (x${x.qtt})`;
        } else if (menuName === 'stuff') {
          linkEl.innerText = x.equiped
            ? `|${x.equiped.charAt(0).toUpperCase()}| ${x.name} ${JSON.stringify(x.effect)}`
            : `    ${x.name} ${JSON.stringify(x.effect)}`;
        } else if (menuName === 'shop') {
          linkEl.innerText = stuffCategories.includes(x.type)
            ? `${x.name} |${x.type.charAt(0).toUpperCase()}|: ${JSON.stringify(x.effect)} /${
                x.lvl
              }\\ (${x.price}⨀)`
            : `${x.name} (${x.price}⨀)`;
        } else {
          linkEl.innerText = x.name;
        }
        linkEl.dataset.menu = menuName;
        linkEl.dataset.value = x.name;
        contentEl.querySelector('.menu').appendChild(linkEl);
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
        statsMenu = codeStatsMenu();
        createMenu(statsMenu, crt.dataset.value);
      } else if (crt.dataset.value === 'options') {
        createMenu([{ name: `sound` }, { name: `save` }, { name: `load` }], crt.dataset.value);
      } else if (crt.dataset.value === 'shop') {
        createMenu(
          player[crt.dataset.value].filter((x) => x.lvl <= player.lvl),
          crt.dataset.value
        );
      } else {
        createMenu(player[crt.dataset.value], crt.dataset.value);
      }
    } else if (crtMenu === 'stats') {
      if (crt.dataset.value.includes('element:')) {
        if (player.elements.length === 0) {
          return;
        } else if (player.element === '') {
          player.element = player.elements[0];
        } else {
          player.element = player.elements[player.elements.indexOf(player.element) + 1] || '';
        }
        statsMenu = codeStatsMenu();
        createMenu(statsMenu, crtMenu);
      }
    } else if (crtMenu === 'attacks') {
      // TODO: re order attacks option?
    } else if (crtMenu === 'items') {
      itemUse(crt.dataset.value, true);
      createMenu(player[crtMenu], crtMenu);
    } else if (crtMenu === 'stuff') {
      stuffEquip(player.stuff.filter((x) => x.name === crt.dataset.value));
      createMenu(player[crtMenu], crtMenu);
    } else if (crtMenu === 'shop') {
      shopBuy(crt.dataset.value);
      createMenu(
        player[crtMenu].filter((x) => x.lvl <= player.lvl),
        crtMenu
      );
    } else if (crtMenu === 'options') {
      // TODO: add options: sound, save, load
    }
    updateState();
  }
}
