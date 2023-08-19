// GD: attacks are for the player; they can deal dmg/steal, state, bonus/malus, poison
// GD: attacks are influenced by strength, defense
// GD: attacks are also influenced by player & enemy elements (air > earth > water > fire => dmg * 0.5 || 2 || 1)
// GD: the player & enemy element are defined before combat

// TODO: review attacks => must be possible for attack to handle state, to give bonus/malus, to steal life, to poison

const attacks = [
  {
    name: 'cheat',
    dmg: 1000,
    desc: 'dev attack 1000',
    src: ['base'],
  },
  {
    name: 'kick',
    dmg: 8,
    desc: 'attack description',
    src: [],
  },
  {
    name: 'punch',
    dmg: 6,
    desc: 'attack description',
    src: ['base'],
  },
  {
    name: 'joke',
    dmg: 0,
    desc: 'dev attack 0',
    src: [],
  },
];

const attacksBase = attacks.filter((x) => x.src.includes('base'));
