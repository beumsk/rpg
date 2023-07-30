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
  lvl: 1,
  xp: 0,
  gold: 0,
  keys: [],
  attacks: attacksBase,
  items: itemsBase,
  stuff: [],
};

function playerAttack(attack) {
  const c = player.attacks.find((x) => x.name === attack);
  infoEl.innerText = `${player.name} uses ${c.name}`;

  const manageDmg = () => {
    const calcDmg = Math.floor(c.dmg + (c.dmg * player.str) / 100);
    if (calcDmg >= currentEnemy.hp) {
      currentEnemy.hp = 0;
    } else {
      currentEnemy.hp -= calcDmg;
    }
  };

  fightQueue.push(manageDmg, enemyCheckDead);
}

function playerCheckDead() {
  if (player.hp === 0) {
    infoEl.innerText = `${player.name} is dead`;
    fightQueue.push(playerLose);
  } else {
    infoEl.innerText = '';
    // new turn for player
    return 'play';
  }
}

function playerWin() {
  player.xp += currentEnemy.xp;
  player.gold += currentEnemy.gold;
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
