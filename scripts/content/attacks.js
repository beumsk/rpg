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
    // base: true,
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
    // base: true,
  },
];

const attacksBase = attacks.filter((x) => x.base);
