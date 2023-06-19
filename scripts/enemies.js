const enemyBase = {
  x: 2 * 16,
  y: 4 * 16,
  w: 16,
  h: 16,
  fill: cEnemy,
  useAttack: (attack) => {
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
    hp: 20,
    hpmax: 100,
    state: '',
    str: 20,
    lvl: 1,
    xp: 10,
    gold: 1,
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
    hp: 30,
    hpmax: 30,
    state: '',
    str: 4,
    lvl: 1,
    xp: 4,
    gold: 0.2,
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
    gold: 0.4,
    attacks: [
      {
        name: 'suck',
        dmg: 6,
      },
    ],
  },
];

let currentEnemy = {};
