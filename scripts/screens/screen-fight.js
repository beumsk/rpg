function screenFight() {
  canvas.style.backgroundImage = `linear-gradient(45deg, ${cGrad1} 60%, ${cGrad2} 60%)`;
  canvas.style.backgroundSize = 'unset';

  audioPlay('fight');

  // TODO: save last used action?

  const mainMenu = [{ name: 'attacks' }, { name: 'items' }];

  let index = 0;
  let menuLinks = infoEl.getElementsByTagName('button');
  let crtMenu = 'main';

  createMenu(mainMenu, 'main');
  updateFighters(true);

  function keyFightHandler(e) {
    const key = e.key;
    if (key === 'Backspace' || key === 'Escape') {
      backToMain();
    } else if (key === 'ArrowRight') {
      e.preventDefault();
      index = index !== menuLinks.length - 1 ? index + 1 : 0;
      menuLinks[index].focus();
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      index = index !== 0 ? index - 1 : menuLinks.length - 1;
      menuLinks[index].focus();
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
      screenTransition('left', () => screenFightEnd());
    } else if (next === 'play') {
      actionQueueEl.innerText = '';
      actionQueueEl.removeEventListener('click', queueRun);
      infoEl.removeEventListener('click', queueRun);
      createMenu(mainMenu, 'main');
    }
  }

  function updateFighters(animation) {
    const enemyStats = `lvl:${currentEnemy.lvl} ${currentEnemy.hp}/${
      currentEnemy.hpmax + currentEnemy.hpmaxTemp
    }♥ ${currentEnemy.str + currentEnemy.strTemp}↣ ${currentEnemy.def + currentEnemy.defTemp}∇`;
    const enemyLife = (currentEnemy.hp / (currentEnemy.hpmax + currentEnemy.hpmaxTemp)) * 100;

    const playerStats = `lvl:${player.lvl} ${player.hp}/${player.hpmax + player.hpmaxTemp}♥ ${
      player.str + player.strTemp
    }↣ ${player.def + player.defTemp}∇`;
    const playerLife = (player.hp / (player.hpmax + player.hpmaxTemp)) * 100;

    if (animation) {
      fightEl.innerHTML = `
        <div class="enemy">
          <div class="box">
            <h2>${currentEnemy.name}</h2>
            <p>${enemyStats}</p>
            <div class="life"><div style="width: ${enemyLife}%"></div></div>
          </div>
        </div>

        <div class="player">
          <div class="box">
            <h2>${player.name}</h2>
            <p>${playerStats}</p> 
            <div class="life"><div style="width: ${playerLife}%"></div></div>
          </div>
        </div>
      `;
    } else {
      document.querySelector('.fight .enemy p').innerHTML = enemyStats;
      document.querySelector('.fight .player p').innerHTML = playerStats;
      document.querySelector('.fight .enemy .life div').style.width = enemyLife + '%';
      document.querySelector('.fight .player .life div').style.width = playerLife + '%';
    }
  }

  document.addEventListener('keydown', keyFightHandler);

  function stop() {
    document.removeEventListener('keydown', keyFightHandler);
    fightEl.innerHTML = '';
  }

  function createMenu(menuList, menuName) {
    crtMenu = menuName;
    infoEl.innerHTML = '';
    if (menuList?.length > 0) {
      menuList.map((x, i) => {
        const linkEl = document.createElement('button');
        linkEl.innerText = x.name;
        linkEl.dataset.menu = menuName;
        linkEl.dataset.value = x.name;
        infoEl.appendChild(linkEl);
        index = 0;
        if (i === index) linkEl.focus();
        linkEl.addEventListener('click', linkClick);
      });
      if (menuName !== 'main') {
        actionBackEl.innerText = 'back';
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

  function linkClick(e) {
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
