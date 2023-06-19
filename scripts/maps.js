const maps = [
  // GD: map list the player is going through; each map is accessible at a lvl === index
  // => maps[0] is null, map[1] is starting map and map[2] is accessible at lvl 2
  { name: null },
  {
    lvl: 1,
    name: 'Eibwen',
    deadSpots: [[0, 21]],
    // TODO: add map bonus
  },
  {
    lvl: 2,
    name: 'Owten',
    deadSpots: [[0, 21]],
  },
];

let currentMap = { ...maps[1] };

function changeMap() {
  // TODO: add map bonus: attack, stuff, item
  console.log('map changed to ' + currentMap.lvl);
}
