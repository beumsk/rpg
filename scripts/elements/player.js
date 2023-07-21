let player = {};

const playerBase = {
  name: 'Player',
  x: 2 * 16,
  y: 2 * 16,
  w: 16,
  h: 16,
  // fill: cPlayer,
  img: './img/player.png',
  hp: 100,
  hpmax: 100,
  state: 'asleep',
  str: 20,
  lvl: 1,
  xp: 0,
  gold: 0,
  keys: [],
  attacks: attacksBase,
  items: itemsBase,
  stuff: [],
};
