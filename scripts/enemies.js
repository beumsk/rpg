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
    if (c.dmg >= player.hp) {
      player.hp = 0;
    } else {
      player.hp -= c.dmg;
    }
  },
};

const enemies = [
  {
    ...enemyBase,
    name: 'Dragon',
    hp: 10,
    hpmax: 100,
    state: '',
    str: 20,
    lvl: 1,
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
    name: 'Gobelin',
    hp: 10,
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
    hp: 10,
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
