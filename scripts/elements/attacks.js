const attacks = [
  {
    name: 'cheat',
    dmg: 1000,
    desc: 'cheat: dev attack 1000',
    base: true,
  },
  {
    name: 'kick',
    dmg: 20,
    desc: 'kick: attack description',
    base: true,
  },
  {
    name: 'punch',
    dmg: 10,
    desc: 'punch: attack description',
    base: true,
  },
  {
    name: 'joke',
    dmg: 0,
    desc: 'joke: dev attack 0',
    base: true,
  },
];

const attacksBase = attacks.filter((x) => x.base);

function attackUse(attack) {
  const c = player.attacks.find((x) => x.name === attack);
  const calcDmg = Math.floor(c.dmg + (c.dmg * player.str) / 100);
  if (calcDmg >= currentEnemy.hp) {
    currentEnemy.hp = 0;
  } else {
    currentEnemy.hp -= calcDmg;
  }
}
