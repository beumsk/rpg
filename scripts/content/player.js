let player = {};

const playerBase = {
  name: 'Player',
  x: 2 * step,
  y: 2 * step,
  w: step,
  h: step,
  // fill: cPlayer,
  img: './img/player.png',
  hp: 20,
  hpmax: 20,
  states: [''], // asleep, frozen, paralized, poisoned, ...
  str: 20,
  def: 10,
  crit: 20,
  lvl: 1,
  xp: 0,
  gems: 0,
  fightEnd: {},
  attacks: attacksBase,
  items: itemsBase,
  stuff: [],
  shop: shopBase,
  element: '',
  elements: [],
  // elements: [...elements],
  options: {
    audio: false,
  },
};

function playerAttack(attack) {
  const c = player.attacks.find((x) => x.name === attack);
  infoEl.innerText = `${player.name} uses ${c.name}`;

  const manageAttack = () => {
    // TODO: rethink element bonus => based on player lmt or attack lmt or both??
    const lmt = calcElement(player.element, currentEnemy.element);
    const isCrit = Math.random() < player.crit / 100; // 20%

    if (c.type === 'boost') {
      const info = attackBoostApply(c.state);
      infoEl.innerText = `Critical hit! ${info}`;
    } else {
      let calcDmg = Math.floor(
        (c.dmg + (c.dmg * player.str) / 100 - (c.dmg * currentEnemy.def) / 100) * lmt
      );

      if (isCrit) {
        if (c.type === 'neutral') {
          infoEl.innerText = `Critical hit!`;
          calcDmg = Math.floor(calcDmg * 1.2); // crit +=20%;
          console.log(calcDmg);
        } else {
          const info = attackElementCritApply(c.type);
          infoEl.innerText = `Critical hit! ${info}`;
        }
      }

      if (calcDmg >= currentEnemy.hp) {
        currentEnemy.hp = 0;
      } else {
        currentEnemy.hp -= calcDmg;
      }
    }
  };

  infoQueue.push(manageAttack, enemyCheckDead);
}

function playerCheckDead() {
  if (player.hp === 0) {
    infoEl.innerText = `${player.name} is dead`;
    infoQueue.push(playerLose);
  } else {
    const checkPeriodics = playerPeriodics();
    if (checkPeriodics === 'stop') {
      infoEl.innerText = `${player.name} is dead`;
      infoQueue.push(playerLose);
    } else {
      // new turn for player
      return 'play';
    }
  }
}

function playerPeriodics() {
  if (player.states.includes('fire-')) {
    if (player.hp > player.hp - Math.floor(player.hpmax / 20)) {
      player.hp -= Math.floor(player.hpmax / 20);
    } else {
      return 'stop';
    }
  }
  if (player.states.includes('fire+')) {
    player.hp += Math.floor(player.hpmax / 20);
  }
}

function playerWin() {
  player.xp += currentEnemy.xp;
  player.gems += currentEnemy.gems;
  const keyDropped = randomKeyDrop();
  const lvlUp = checkLvlUp(player.lvl, player.xp);
  player.fightEnd = {
    xp: currentEnemy.xp,
    gems: currentEnemy.gems,
    keyDrop: keyDropped,
    lvlUp: lvlUp,
  };
  // stops screenFight
  return 'stop';
}

function playerLose() {
  // stops screenFight
  return 'stop';
}
