function screenMenu() {
  // contentEl.style.backgroundImage = '';

  infoEl.innerText = ' ';

  const mainMenu = [
    { name: 'stats', popup: `<p>Check your stats</p>` },
    { name: 'attacks', popup: `<p>Check your attacks</p>` },
    { name: 'items', popup: `<p>Check and use your items</p>` },
    { name: 'stuff', popup: `<p>Check and equip your stuff</p>` },
    { name: 'options', popup: `<p>Manage audio and save</p>` },
    { name: '← exit' },
  ];

  let index = 0;
  let menuBtns = contentEl.getElementsByTagName('button');
  let crtMenu = 'main';

  const codeStatsMenu = () => [
    {
      name: `lvl: ${player.lvl}`,
      popup: `<h3>lvl: ${player.lvl}</h3><p>Level up with experience and get access to more attacks, items and stuff</p>`,
    },
    {
      name: `xp: ${player.xp}/${lvls[player.lvl + 1]} ↗`,
      popup: `<h3>xp: ${player.xp}/${
        lvls[player.lvl + 1]
      } ↗</h3><p>Gain experience defeating enemies leading to level up</p>`,
    },
    { name: `map: ${currentMap.name} ⫯` },
    {
      name: `gems: ${player.gems} ◈`,
      popup: `<h3>gems: ${player.gems} ◈</h3><p>Use gems to buy items and stuff in the shop</p>`,
    },
    {
      name: `scrolls: ${player.scrolls} ⋈`,
      popup: `<h3>scrolls: ${player.scrolls} ⋈</h3><p>Use scrolls to learn and improve attacks in the dojo</p>`,
    },
    {
      name: `health: ${player.hp}/${player.hpmax} (${player.hpmaxTemp}) ♥`,
      popup: `<h3>health: ${player.hp}/${player.hpmax} (${player.hpmaxTemp}) ♥</h3><p>Heal using potions or by getting a new level</p>`,
    },
    {
      name: `strength: ${player.str} (${player.strTemp}) ↣`,
      popup: `<h3>strength: ${player.str} (${player.strTemp}) ↣</h3><p>Increases your attack damages</p>`,
    }, // ⊕
    {
      name: `defense: ${player.def} (${player.defTemp}) ∇`,
      popup: `<h3>defense: ${player.def} (${player.defTemp}) ∇</h3><p>Decreases enemies' attack damages</p>`,
    }, // ⊖
    {
      name: `critics: ${player.crit} (${player.critTemp}) %`,
      popup: `<h3>critics: ${player.crit} (${player.critTemp}) %</h3><p>Rate of critical attack that improve attacks</p>`,
    },
    {
      name: `wisdom: ${player.wis} (${player.wisTemp}) ❖`,
      popup: `<h3>wisdom: ${player.wis} (${player.wisTemp}) ❖</h3><p>Increases bonus and malus effects</p>`,
    },
    {
      name: `mastered elements: ${JSON.stringify(player.elements)}`,
      popup: `<h3>mastered elements: ${JSON.stringify(
        player.elements
      )}</h3><p>Mastered elements give boost to corresponding attacks</p>`,
    }, // air ☴ > earth ☷ > water ☵ > fire ☲ (trigrams)
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
          btnEl.innerText = x.name === 'audio' ? `${x.name}: ${player.options.audio}/5` : x.name;
        } else {
          btnEl.innerText = x.name;
          popupEl.innerHTML = x.popup || '';
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
        // createMenu([{ name: `audio` }, { name: `save` }, { name: `load` }], crt.dataset.value);
        createMenu([{ name: `audio` }, { name: `save` }], crt.dataset.value);
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
        audioVolumeClick();
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
