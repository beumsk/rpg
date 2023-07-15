const enemyBase = {
  x: 2 * 16,
  y: 4 * 16,
  w: 16,
  h: 16,
  fill: cEnemy,
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

const enemies = [
  {
    ...enemyBase,
    name: 'Dragon',
    hp: 100,
    hpmax: 100,
    state: '',
    str: 20,
    lvl: 2,
    xp: 10,
    gold: 5,
    attacks: [
      {
        name: 'fireball',
        dmg: 20,
      },
      {
        name: 'rush',
        dmg: 10,
      },
    ],
    // items: [],
  },
  {
    ...enemyBase,
    name: 'Troll',
    hp: 80,
    hpmax: 80,
    state: '',
    str: 12,
    lvl: 2,
    xp: 8,
    gold: 4,
    attacks: [
      {
        name: 'Snore',
        dmg: 12,
      },
    ],
  },
  {
    ...enemyBase,
    name: 'Gobelin',
    hp: 30,
    hpmax: 30,
    state: '',
    str: 4,
    lvl: 1,
    xp: 4,
    gold: 1,
    attacks: [
      {
        name: 'poke',
        dmg: 4,
      },
    ],
  },
  {
    ...enemyBase,
    name: 'Vampire',
    hp: 40,
    hpmax: 40,
    state: '',
    str: 6,
    lvl: 1,
    xp: 6,
    gold: 2,
    attacks: [
      {
        name: 'suck',
        dmg: 6,
      },
    ],
  },
];

let currentEnemy = {};
