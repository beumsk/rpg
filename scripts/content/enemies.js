const enemyBase = {
  x: 2 * step,
  y: 4 * step,
  w: step,
  h: step,
  fill: cEnemy,
  img: './img/enemy.png',
  state: '',
};

function codeEnemy(name, hp, attack, factor = 0, element = '') {
  let enemy = {
    ...enemyBase,
    name: name + ' ' + element,
    hp: hp + hp * factor,
    hpmax: hp + hp * factor,
    str: Math.floor((hp + hp * factor) / 10),
    lvl: Math.ceil((hp + hp * factor) / 70),
    mapLvl: Math.ceil(hp / 70),
    xp: Math.floor((hp + hp * factor) / 5),
    gems: Math.floor((hp + hp * factor) / 20),
    attacks: [{ name: attack, dmg: Math.floor((hp + hp * factor) / 10) }],
  };
  enemies.push(enemy);
}

let enemies = [];

// GD: set of neutral enemies to be adapted to elements based on world
// GD: adapt their stats to lvl of map (depends on the orther the player takes the elements)
// GD: first world will be lowest lvl and will increase with each new map/world
// GD: master world will be different with only a single fight in each map and the high master as last

const enemyList = [
  // map 1
  { name: 'Goblin', hp: 30, attack: 'poke' },
  { name: 'Skeleton', hp: 40, attack: 'bone throw' },
  { name: 'Vampire', hp: 60, attack: 'suck' },
  // map 2
  { name: 'Troll', hp: 80, attack: 'snore' },
  { name: 'Witch', hp: 90, attack: 'dark magic' },
  { name: 'Werewolf', hp: 100, attack: 'bite' },
  // map 3
  { name: 'Giant', hp: 160, attack: 'frozen' },
  { name: 'Dragon', hp: 210, attack: 'fireball' },
  // map 4
  { name: 'Satan', hp: 280, attack: 'death' },
  // map 5
  { name: 'Spirit', hp: 350, attack: 'bend' },
];

let currentEnemy = {};

function enemyAttack(attack) {
  const c = attack
    ? currentEnemy.attacks.find((x) => x.name === attack)
    : currentEnemy.attacks[0];
  infoEl.innerText = `${currentEnemy.name} uses ${c.name}`;

  const manageDmg = () => {
    const calcDmg = Math.floor(c.dmg + (c.dmg * currentEnemy.str) / 100);
    if (calcDmg >= player.hp) {
      player.hp = 0;
    } else {
      player.hp -= calcDmg;
    }
  };

  infoQueue.push(manageDmg, playerCheckDead);
}

function enemyCheckDead() {
  if (currentEnemy.hp === 0) {
    infoEl.innerText = `${currentEnemy.name} is dead`;
    infoQueue.push(playerWin);
  } else {
    infoEl.innerText = `${currentEnemy.name} is attacking...`;
    infoQueue.push(enemyAttack);
  }
}
