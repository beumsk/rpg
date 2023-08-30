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

  const manageDmg = () => {
    const lmt = calcElement(player.element, currentEnemy.element);
    const calcDmg = Math.floor(
      (c.dmg + (c.dmg * player.str) / 100 - (c.dmg * currentEnemy.def) / 100) * lmt
    );
    if (calcDmg >= currentEnemy.hp) {
      currentEnemy.hp = 0;
    } else {
      currentEnemy.hp -= calcDmg;
    }
  };

  infoQueue.push(manageDmg, enemyCheckDead);
}

function playerCheckDead() {
  if (player.hp === 0) {
    infoEl.innerText = `${player.name} is dead`;
    infoQueue.push(playerLose);
  } else {
    // new turn for player
    return 'play';
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
