function screenFight() {
  canvas.style.background = cGrad2;
  fightEl.style.backgroundImage = `linear-gradient(45deg, ${cGrad1} 60%, ${cGrad2} 60%)`;
  fightEl.style.backgroundSize = 'unset';

  audioPlay('fight');

  // TODO: save last used action?

  const mainMenu = [{ name: 'attacks' }, { name: 'items' }];

  let index = 0;
  let menuBtns = infoEl.getElementsByTagName('button');
  let crtMenu = 'main';

  createMenu(mainMenu, 'main');
  updateFighters(true);

  function keyFightHandler(e) {
    const key = e.key;
    if (key === 'Backspace' || key === 'Escape') {
      backToMain();
    } else if (key === 'ArrowRight') {
      e.preventDefault();
      index = index !== menuBtns.length - 1 ? index + 1 : 0;
      menuBtns[index].focus();
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      index = index !== 0 ? index - 1 : menuBtns.length - 1;
      menuBtns[index].focus();
    } else if (key === 'Enter' || key === ' ') {
      queueRun();
    }
  }

  function queueRun() {
    updateFighters();
    const next = fireQueue();
    if (next === 'stop') {
      actionQueueEl.innerText = '';
      actionQueueEl.removeEventListener('click', queueRun);
      infoEl.removeEventListener('click', queueRun);
      stop();
      playerResetTemp();
      screenTransition('left', () => screenFightEnd(), '', cGrad1);
    } else if (next === 'play') {
      actionQueueEl.innerText = '';
      actionQueueEl.removeEventListener('click', queueRun);
      infoEl.removeEventListener('click', queueRun);
      createMenu(mainMenu, 'main');
    }
  }

  function updateFighters(animation) {
    const enemyElement = currentEnemy.element
      ? `<img src="./img/${currentEnemy.element}.png" alt="${currentEnemy.element}" />`
      : '<span style="width:0.875rem;display:inline-block;"></span>';
    const enemyStats = `lvl:${currentEnemy.lvl} ${enemyElement} ${
      currentEnemy.str + currentEnemy.strTemp
    }↣ ${currentEnemy.def + currentEnemy.defTemp}∇`;
    const enemyHP = `${currentEnemy.hp}/${currentEnemy.hpmax + currentEnemy.hpmaxTemp}`;
    const enemyLife = (currentEnemy.hp / (currentEnemy.hpmax + currentEnemy.hpmaxTemp)) * 100;

    const playerElement = player.element
      ? `<img src="./img/${player.element}.png" alt="${player.element}" />`
      : '<span style="width:0.875rem;display:inline-block;"></span>';
    const playerStats = `lvl:${player.lvl} ${playerElement} ${player.str + player.strTemp}↣ ${
      player.def + player.defTemp
    }∇`;
    const playerHP = `${player.hp}/${player.hpmax + player.hpmaxTemp}`;
    const playerLife = (player.hp / (player.hpmax + player.hpmaxTemp)) * 100;

    if (animation) {
      fightEl.innerHTML = `
        <div class="enemy">
          <img src="${currentEnemy.img}" />
          <div class="box">
            <h2>${currentEnemy.name}</h2>
            <p>${enemyStats}</p>
            <div class="life" data-life="${enemyHP}"><div style="width: ${enemyLife}%"></div></div>
          </div>
        </div>

        <div class="player">
          <img src="${player.img}" />
          <div class="box">
            <h2>${player.name}</h2>
            <p>${playerStats}</p> 
            <div class="life" data-life="${playerHP}"><div style="width: ${playerLife}%"></div></div>
          </div>
        </div>
      `;
    } else {
      document.querySelector('.fight .enemy p').innerHTML = enemyStats;
      document.querySelector('.fight .player p').innerHTML = playerStats;
      document.querySelector('.fight .enemy .life').dataset.life = enemyHP;
      document.querySelector('.fight .player .life').dataset.life = playerHP;
      document.querySelector('.fight .enemy .life div').style.width = enemyLife + '%';
      document.querySelector('.fight .player .life div').style.width = playerLife + '%';
    }
  }

  document.addEventListener('keydown', keyFightHandler);

  function stop() {
    document.removeEventListener('keydown', keyFightHandler);
  }

  function createMenu(menuList, menuName) {
    // TODO: add info on focus!
    crtMenu = menuName;
    infoEl.innerHTML = '';
    if (menuList?.length > 0) {
      menuList.map((x, i) => {
        const btnEl = document.createElement('button');
        btnEl.innerText = x.name;
        btnEl.dataset.menu = menuName;
        btnEl.dataset.value = x.name;
        infoEl.appendChild(btnEl);
        index = 0;
        if (i === index) btnEl.focus();
        btnEl.addEventListener('click', btnClick);
      });
      if (menuName !== 'main') {
        actionBackEl.innerText = '← back';
        actionBackEl.addEventListener('click', backToMain);
      } else {
        actionBackEl.innerText = '';
      }
    } else {
      backToMain();
    }
  }

  function backToMain() {
    createMenu(mainMenu, 'main');
  }

  function btnClick(e) {
    e.preventDefault();
    let crt = e.target;
    if (crtMenu === 'main') {
      if (crt.dataset.value === 'attacks' || crt.dataset.value === 'items') {
        createMenu(player[crt.dataset.value], crt.dataset.value);
      }
    } else if (crtMenu === 'attacks') {
      playerAttack(crt.innerText);
      actionQueueEl.innerText = '→';
      actionQueueEl.addEventListener('click', queueRun);
      actionBackEl.innerText = '';
      infoEl.addEventListener('click', queueRun);
    } else if (crtMenu === 'items') {
      itemUse(crt.innerText, false);
      actionQueueEl.innerText = '→';
      actionQueueEl.addEventListener('click', queueRun);
      actionBackEl.innerText = '';
      infoEl.addEventListener('click', queueRun);
    }
  }
}
