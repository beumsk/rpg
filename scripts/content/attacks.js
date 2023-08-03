const attacks = [
  {
    name: 'cheat',
    dmg: 1000,
    desc: 'dev attack 1000',
    base: true,
  },
  {
    name: 'kick',
    dmg: 20,
    desc: 'attack description',
    base: true,
  },
  {
    name: 'punch',
    dmg: 10,
    desc: 'attack description',
    base: true,
  },
  {
    name: 'joke',
    dmg: 0,
    desc: 'dev attack 0',
    base: true,
  },
];

const attacksBase = attacks.filter((x) => x.base);
