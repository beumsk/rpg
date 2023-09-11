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
  str: 20,
  def: 10,
  crit: 10,
  wis: 10,
  hpmaxTemp: 0,
  strTemp: 0,
  defTemp: 0,
  critTemp: 0,
  wisTemp: 0,
  states: [], // asleep, frozen, paralized, poisoned, ...
  lvl: 1,
  xp: 0,
  gems: 0,
  element: '',
  elements: [],
  // elements: [...elements],
  fightEnd: {},
  attacks: attacksBase,
  items: itemsBase,
  stuff: [],
  shop: shopBase,
  options: {
    audio: false,
  },
};

function playerAttack(attack) {
  const c = player.attacks.find((x) => x.name === attack);
  infoEl.innerText = `${player.name} uses ${c.name}`;

  const manageAttack = () => {
    const elementFactor = calcElement(player.element, currentEnemy.element);
    const isCrit = Math.random() < (player.crit + player.critTemp) / 100;

    if (c.type === 'bonus') {
      const info = attackElementApply(c.element, player, true, false);
      infoEl.innerText = `${info}`;
    } else if (c.type === 'malus') {
      const info = attackElementApply(c.element, currentEnemy, false, false);
      infoEl.innerText = `${info}`;
    } else {
      let calcDmg = Math.floor(
        (c.dmg +
          (c.dmg * (player.str + player.strTemp)) / 100 -
          (c.dmg * (currentEnemy.def + currentEnemy.defTemp)) / 100) *
          elementFactor
      );

      if (isCrit) {
        if (c.element === 'neutral') {
          infoEl.innerText = `Critical hit!`;
          calcDmg = Math.floor(calcDmg * 1.25);
        } else {
          const info = attackElementApply(c.element, player, true, true);
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

function playerResetTemp() {
  player.hpmaxTemp = 0;
  player.strTemp = 0;
  player.defTemp = 0;
  player.critTemp = 0;
  player.wisTemp = 0;
  player.states = [];
}
