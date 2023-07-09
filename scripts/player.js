let player = {};

const playerBase = {
  name: 'Player',
  x: 2 * 16,
  y: 2 * 16,
  w: 16,
  h: 16,
  fill: cPlayer,
  hp: 30,
  hpmax: 100,
  state: 'asleep',
  str: 20,
  lvl: 1,
  xp: 0,
  gold: 0,
  attacks: attacksBase,
  items: itemsBase,
  stuff: [],
};
