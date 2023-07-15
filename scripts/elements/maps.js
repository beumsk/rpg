const defaultSpot = { x: 0, y: 0, w: 16, h: 16, type: 'wall', fill: cBlack };

const maps = [
  // GD: map list the player is going through; each map is accessible at a lvl === index
  // => maps[0] is null, map[1] is starting map and map[2] is accessible at lvl 2
  // GD: chest can give gold, items or stuff
  { name: null },
  {
    lvl: 1,
    name: 'Eibwen',
    deadSpots: [
      { ...defaultSpot, x: 0, y: 0 },
      { ...defaultSpot, x: 9 * 16, y: 0 },
      {
        ...defaultSpot,
        x: 1 * 16,
        y: 8 * 16,
        type: 'chest',
        fill: cChest,
        chest: { gold: 10, items: 'potion' },
      },
      { ...defaultSpot, x: 21 * 16, y: 0, type: 'door', fill: cDoor },
    ],
  },
  {
    lvl: 2,
    name: 'Owten',
    deadSpots: [
      { ...defaultSpot, x: 0, y: 9 * 16 },
      { ...defaultSpot, x: 21 * 16, y: 0 },
      { ...defaultSpot, x: 21 * 16, y: 9 * 16, type: 'door', fill: cDoor },
    ],
    rewards: { items: 'potion' },
  },
  {
    lvl: 3,
    name: 'eerhten',
    deadSpots: [
      { ...defaultSpot, x: 9 * 16, y: 6 * 16 },
      { ...defaultSpot, x: 6 * 16, y: 9 * 16 },
      { ...defaultSpot, x: 0, y: 9 * 16, type: 'door', fill: cDoor },
    ],
    rewards: { items: 'potion' },
  },
];

let currentMap;

function changeMap(rewards) {
  objLoop(rewards);
}

function openChest(chest) {
  objLoop(chest);
}

function objLoop(obj) {
  for (const key in obj) {
    const value = obj[key];
    if (key === 'gold') {
      player.gold += value;
    } else if (key === 'items') {
      if (player.items.find((i) => i.name === value)) {
        player.items.find((i) => i.name === value).qtt += 1;
      } else {
        player.items.push(items.find((i) => i.name === value));
      }
    } else if (key === 'stuff') {
      player.stuff.push(stuff.find((s) => s.name === value));
    }
  }
}
