function screenMenu() {
  canvas.style.backgroundImage = '';

  infoEl.innerText = ' ';

  const mainMenu = [
    { name: 'stats' },
    { name: 'attacks' },
    { name: 'items' },
    { name: 'stuff' },
    { name: 'shop' },
    { name: 'options' },
    { name: '← exit' },
  ];

  let index = 0;
  let menuLinks = contentEl.getElementsByTagName('button');
  let crtMenu = 'main';

  const codeStatsMenu = () => [
    { name: `lvl: ${player.lvl}` },
    { name: `xp: ${player.xp}/${lvls[player.lvl + 1]} ↗` },
    { name: `map: ${currentMap.name} ⫯` },
    { name: `gems: ${player.gems} ◈` },
    { name: `hp: ${player.hp}/${player.hpmax} (${player.hpmaxTemp}) ♥` },
    { name: `str: ${player.str} (${player.strTemp}) ↣` }, // ⊕
    { name: `def: ${player.def} (${player.defTemp}) ∇` }, // ⊖
    { name: `crit: ${player.crit} (${player.critTemp}) %` },
    { name: `mastered elements: ${JSON.stringify(player.elements)}` }, // air ☴ > earth ☷ > water ☵ > fire ☲ (trigrams)
  ];
  let statsMenu;

  createMenu(mainMenu, 'main');

  function createMainMenu() {
    infoEl.innerText = ' ';
    crtMenu = 'main';
    createMenu(mainMenu, 'main');
  }

  function keyMenuHandler(e) {
    const key = e.key;
    if (key === 'ArrowLeft' || key === 'Backspace') {
      if (crtMenu === 'main') {
        stop();
      } else {
        createMainMenu();
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

  document.addEventListener('keydown', keyMenuHandler);

  function stop() {
    infoEl.innerText = '';
    document.removeEventListener('keydown', keyMenuHandler);
    contentEl.innerHTML = '';
    screenWorld();
  }

  function createMenu(menuList, menuName) {
    crtMenu = menuName;
    contentEl.innerHTML = '<div class="menu"></div>';
    if (menuList?.length > 0) {
      menuList.map((x, i) => {
        const containerEl = document.createElement('div');
        const btnEl = document.createElement('button');
        const popupEl = document.createElement('div');
        popupEl.classList.add('popup');
        if (menuName === 'attacks') {
          btnEl.innerText = `${x.name}: ${x.dmg ? x.dmg + 'dmg (' + x.element + ')' : x.state}`;
          popupEl.innerHTML = popupInfo(x);
        } else if (menuName === 'items') {
          btnEl.innerText = `${x.name}: ${JSON.stringify(x.effect)} ${
            x.type === 'temp' ? 'Ŧ' : ''
          } (x${x.qtt})`;
          popupEl.innerHTML = popupInfo(x);
        } else if (menuName === 'stuff') {
          btnEl.innerText = x.equiped
            ? `|${x.equiped.charAt(0).toUpperCase()}| ${x.name} ${JSON.stringify(x.effect)}`
            : `    ${x.name} ${JSON.stringify(x.effect)}`;
          popupEl.innerHTML = popupInfo(x);
        } else if (menuName === 'shop') {
          btnEl.innerText = stuffTypes.includes(x.type)
            ? `${x.name} |${x.type.charAt(0).toUpperCase()}|: ${JSON.stringify(x.effect)} /${
                x.lvl
              }\\ (${x.price} ◈)`
            : `${x.name}: ${JSON.stringify(x.effect)} (${x.price} ◈)`;
          popupEl.innerHTML = popupInfo(x);
        } else if (menuName === 'options') {
          btnEl.innerText =
            x.name === 'audio' ? `${x.name}: ${player.options.audio ? 'on' : 'off'}` : x.name;
        } else {
          btnEl.innerText = x.name;
        }
        btnEl.dataset.menu = menuName;
        btnEl.dataset.value = x.name;
        containerEl.appendChild(btnEl);
        containerEl.appendChild(popupEl);
        contentEl.querySelector('.menu').appendChild(containerEl);
        index = 0;
        if (i === index) btnEl.focus();
        btnEl.addEventListener('click', linkClick);
      });
      if (menuName !== 'main') {
        const backLink = document.createElement('button');
        backLink.innerText = '← back';
        backLink.addEventListener('click', (e) => {
          e.preventDefault();
          createMainMenu();
        });
        contentEl.querySelector('.menu').appendChild(backLink);
      }
    } else {
      createMainMenu();
    }
  }

  function linkClick(e) {
    e.preventDefault();
    let crt = e.target;
    if (crtMenu === 'main') {
      if (crt.dataset.value === '← exit') {
        stop();
      } else if (crt.dataset.value === 'stats') {
        statsMenu = codeStatsMenu();
        createMenu(statsMenu, crt.dataset.value);
      } else if (crt.dataset.value === 'options') {
        createMenu([{ name: `audio` }, { name: `save` }, { name: `load` }], crt.dataset.value);
      } else if (crt.dataset.value === 'shop') {
        createMenu(
          player[crt.dataset.value].filter((x) => x.lvl <= player.lvl),
          crt.dataset.value
        );
      } else {
        createMenu(player[crt.dataset.value], crt.dataset.value);
      }
    } else if (crtMenu === 'stats') {
      // do anything?
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
      // TODO: add options: save, load
      if (crt.dataset.value === 'audio') {
        audioToggle();
        createMenu([{ name: `audio` }, { name: `save` }, { name: `load` }], crtMenu);
      } else if (crt.dataset.value === 'save') {
        gameSave();
        createMenu(player[crtMenu], crtMenu);
      } else if (crt.dataset.value === 'load') {
        // gameLoad();
      }
    }
    updateState();
  }
}
