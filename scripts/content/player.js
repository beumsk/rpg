let player = {};

const playerBase = {
  name: 'Player',
  x: 2 * step,
  y: 2 * step,
  w: step,
  h: step,
  // fill: cPlayer,
  img: './img/player.png',
  hp: 100,
  hpmax: 100,
  state: 'asleep',
  str: 20,
  def: 10,
  lvl: 1,
  xp: 0,
  gems: 0,
  attacks: attacksBase,
  items: itemsBase,
  stuff: [],
  shop: shopBase,
  mapLvl: 1,
  element: '',
  // elements: [],
  elements: [...elements],
};

function playerAttack(attack) {
  const c = player.attacks.find((x) => x.name === attack);
  infoEl.innerText = `${player.name} uses ${c.name}`;

  const manageDmg = () => {
    const lmt = calcElement(player.element, currentEnemy.element);
    const calcDmg = Math.floor(
      (c.dmg + (c.dmg * player.str) / 100 - (c.dmg * currentEnemy.def) / 100) *
        lmt
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
  randomKeyDrop();
  checkLvlUp(player.lvl, player.xp);
  screenTransition('left', () => screenWorld());
  // stops screenFight
  return 'stop';
}

function playerLose() {
  screenTransition('bottom', () => screenEnd());
  // stops screenFight
  return 'stop';
}
