let player = {};

const playerBase = {
  name: 'Player',
  x: 0,
  y: 0,
  w: step,
  h: step,
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
  scrolls: 0,
  element: '',
  elements: [],
  // elements: [...elements],
  fightEnd: {},
  attacks: [],
  items: [],
  stuff: [],
  shop: deepCopy([...items, ...stuff]),
  dojo: deepCopy(attacks),
  options: {
    audio: !ISDEV.mute,
  },
};

function playerAttack(attack) {
  const c = player.attacks.find((x) => x.name === attack);
  infoEl.innerText = `${player.name} uses ${c.name}`;

  const manageAttack = () => {
    const elementFactor = calcElement(c.element, player.element, currentEnemy.element);
    const isCrit = Math.random() < (player.crit + player.critTemp) / 100;
    const isMaster = player.elements.includes(c.element);

    if (c.type === 'bonus') {
      const info = attackElementApply(c, player, false, isCrit);
      infoEl.innerText = `${info}`;
    } else if (c.type === 'malus') {
      const info = attackElementApply(c, currentEnemy, false, isCrit);
      infoEl.innerText = `${info}`;
    } else {
      let calcDmg = Math.floor(
        (c.dmg +
          (c.dmg * (player.str + player.strTemp)) / 100 -
          (c.dmg * (currentEnemy.def + currentEnemy.defTemp)) / 100) *
          elementFactor
      );

      if (isMaster) calcDmg = Math.floor(calcDmg * 1.5);

      if (isCrit) {
        if (c.element === 'neutral') {
          infoQueue.push(() => (infoEl.innerText = `Critical hit!`));
          calcDmg = Math.floor(calcDmg * 1.25);
        } else {
          const info = attackElementApply(c, player, true, false);
          infoQueue.push(() => (infoEl.innerText = `Critical hit! ${info}`));
        }
      } else {
        infoEl.innerText = '...';
      }

      if (elementFactor !== 1) {
        infoQueue.push(
          () => (infoEl.innerText = elementFactor > 1 ? 'Superb move!' : 'Poor move.')
        );
      }

      // GD: using an attack, gives the player that element
      player.element = c.element !== 'neutral' ? c.element : '';

      if (calcDmg >= currentEnemy.hp) {
        currentEnemy.hp = 0;
      } else {
        currentEnemy.hp -= calcDmg;
      }
    }

    infoQueue.push(enemyCheckDead);
  };

  infoQueue.push(manageAttack);
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
  currentEnemies = currentEnemies.filter((x) => x.name !== currentEnemy.name);
  // stops screenFight
  return 'stop';
}

function playerLose() {
  // stops screenFight
  return 'stop';
}

function playerResetTemp() {
  player.element = '';
  player.hpmaxTemp = 0;
  player.strTemp = 0;
  player.defTemp = 0;
  player.critTemp = 0;
  player.wisTemp = 0;
  player.states = [];
}
