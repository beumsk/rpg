function screenMenu() {
  // contentEl.style.backgroundImage = '';

  infoEl.innerText = ' ';

  const mainMenu = [
    { name: 'stats' },
    { name: 'attacks' },
    { name: 'items' },
    { name: 'stuff' },
    { name: 'options' },
    { name: '← exit' },
  ];

  let index = 0;
  let menuBtns = contentEl.getElementsByTagName('button');
  let crtMenu = 'main';

  const codeStatsMenu = () => [
    { name: `lvl: ${player.lvl}` },
    { name: `xp: ${player.xp}/${lvls[player.lvl + 1]} ↗` },
    { name: `map: ${currentMap.name} ⫯` },
    { name: `gems: ${player.gems} ◈` },
    { name: `scrolls: ${player.scrolls} ⋈` },
    { name: `health: ${player.hp}/${player.hpmax} (${player.hpmaxTemp}) ♥` },
    { name: `strength: ${player.str} (${player.strTemp}) ↣` }, // ⊕
    { name: `defense: ${player.def} (${player.defTemp}) ∇` }, // ⊖
    { name: `wisdom: ${player.wis} (${player.wisTemp}) ❖` },
    { name: `critics: ${player.crit} (${player.critTemp}) %` },
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
      index = index !== 0 ? index - 1 : menuBtns.length - 1;
      menuBtns[index].focus();
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      infoEl.innerText = ' ';
      index = index !== menuBtns.length - 1 ? index + 1 : 0;
      menuBtns[index].focus();
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
    index = 0;

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
            ? `|${x.equiped.charAt(0).toUpperCase()}| ${x.name}`
            : `${x.name}`;
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
        btnEl.addEventListener('click', btnClick);
      });
      if (menuName !== 'main') {
        const backBtn = document.createElement('button');
        backBtn.innerText = '← back';
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          createMainMenu();
        });
        contentEl.querySelector('.menu').appendChild(backBtn);
      }
      menuBtns[0].focus();
    } else {
      createMainMenu();
    }
  }

  function btnClick(e) {
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
    } else if (crtMenu === 'options') {
      if (crt.dataset.value === 'audio') {
        audioToggle();
        // createMenu([{ name: `audio` }, { name: `save` }, { name: `load` }], crtMenu);
        createMenu([{ name: `audio` }, { name: `save` }], crtMenu);
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
