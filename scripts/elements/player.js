let player = {};

const playerBase = {
  name: 'Player',
  x: 2 * step,
  y: 2 * step,
  w: step,
  h: step,
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
