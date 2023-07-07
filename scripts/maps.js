const defaultSpot = { x: 0, y: 0, w: 16, h: 16, fill: cBlack };

const maps = [
  // GD: map list the player is going through; each map is accessible at a lvl === index
  // => maps[0] is null, map[1] is starting map and map[2] is accessible at lvl 2
  { name: null },
  {
    lvl: 1,
    name: 'Eibwen',
    deadSpots: [
      { ...defaultSpot, x: 0, y: 0 },
      { ...defaultSpot, x: 11 * 16, y: 0 },
    ],
    // TODO: add map bonus
  },
  {
    lvl: 2,
    name: 'Owten',
    deadSpots: [
      { ...defaultSpot, x: 0, y: 11 * 16 },
      { ...defaultSpot, x: 21 * 16, y: 11 * 16 },
    ],
  },
  {
    lvl: 3,
    name: 'eerhten',
    deadSpots: [
      { ...defaultSpot, x: 9 * 16, y: 6 * 16 },
      { ...defaultSpot, x: 6 * 16, y: 17 * 16 },
    ],
  },
];

let currentMap = { ...maps[1] };

function changeMap() {
  // TODO: add map bonus: attack, stuff, item
  console.log('map changed to ' + currentMap.lvl);
}
