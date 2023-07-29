const enemyBase = {
  x: 2 * step,
  y: 4 * step,
  w: step,
  h: step,
  fill: cEnemy,
  img: './img/enemy.png',
  state: '',
  attackUse: (attack) => {
    const c = attack
      ? currentEnemy.attacks.find((x) => x.name === attack)
      : currentEnemy.attacks[0];
    const calcDmg = Math.floor(c.dmg + (c.dmg * currentEnemy.str) / 100);
    if (calcDmg >= player.hp) {
      player.hp = 0;
    } else {
      player.hp -= calcDmg;
    }
  },
};

function createEnemy(name, hp, attack) {
  let enemy = {
    ...enemyBase,
    name,
    hp,
    hpmax: hp,
    str: Math.floor(hp / 10),
    lvl: Math.ceil(hp / 70),
    xp: Math.floor(hp / 5),
    gold: Math.floor(hp / 20),
    attacks: [{ name: attack, dmg: Math.floor(hp / 10) }],
  };
  enemies.push(enemy);
}

const enemies = [];

const createList = [
  // lvl 1
  { name: 'Goblin', hp: 30, attack: 'poke' },
  { name: 'Skeleton', hp: 40, attack: 'bone throw' },
  { name: 'Vampire', hp: 60, attack: 'suck' },
  // lvl 2
  { name: 'Troll', hp: 80, attack: 'snore' },
  { name: 'Witch', hp: 90, attack: 'dark magic' },
  { name: 'Werewolf', hp: 100, attack: 'bite' },
  { name: 'Dragon', hp: 120, attack: 'rush' },
  // lvl 3
  { name: 'Dragon ice', hp: 160, attack: 'frozen' },
  { name: 'Dragon fire', hp: 210, attack: 'fireball' },
];
createList.forEach((x) => createEnemy(x.name, x.hp, x.attack));

let currentEnemy = {};
