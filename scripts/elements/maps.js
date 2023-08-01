const defaultSpot = { x: 0, y: 0, w: 16, h: 16, type: 'wall', fill: cBlack };

const defaultChest = {
  ...defaultSpot,
  type: 'chest',
  fill: cChest,
  img: './img/chest.png',
  unlocked: false,
};

const defaultDoor = {
  ...defaultSpot,
  type: 'door',
  fill: cDoor,
  img: './img/door.png',
};

const maps = [
  // GD: map list the player is going through; each map is accessible at a lvl === index
  // => maps[0] is null, map[1] is starting map and map[2] is accessible at lvl 2
  // GD: chest can give gold, items x1 or stuff x1
  { name: null },
  {
    lvl: 1,
    name: 'Enoen',
    deadSpots: [
      { ...defaultSpot, x: 0, y: 0 },
      { ...defaultSpot, x: 9 * 16, y: 0 },
      {
        ...defaultChest,
        x: 1 * 16,
        y: 8 * 16,
        chest: { gold: 10, items: 'potion', stuff: 'test ring' },
      },
      { ...defaultSpot, x: 21 * 16, y: 0, type: 'hide-door' },
      { ...defaultDoor, x: 21 * 16, y: 0 },
    ],
  },
  {
    lvl: 2,
    name: 'Owten',
    deadSpots: [
      { ...defaultSpot, x: 0, y: 9 * 16 },
      { ...defaultSpot, x: 21 * 16, y: 0 },
      {
        ...defaultChest,
        x: 8 * 16,
        y: 8 * 16,
        chest: { gold: 10, stuff: 'potion' },
      },
      { ...defaultSpot, x: 21 * 16, y: 9 * 16, type: 'hide-door' },
      { ...defaultDoor, x: 21 * 16, y: 9 * 16 },
    ],
    rewards: { items: 'potion' },
  },
  {
    lvl: 3,
    name: 'Eerhten',
    deadSpots: [
      { ...defaultSpot, x: 9 * 16, y: 6 * 16 },
      { ...defaultSpot, x: 6 * 16, y: 9 * 16 },
      { ...defaultSpot, x: 0, y: 9 * 16, type: 'hide-door' },
      { ...defaultDoor, x: 0, y: 9 * 16 },
    ],
    rewards: { items: 'potion' },
  },
  {
    lvl: 4,
    name: 'Ruofen',
    deadSpots: [
      { ...defaultSpot, x: 9 * 16, y: 6 * 16 },
      { ...defaultSpot, x: 6 * 16, y: 9 * 16 },
      { ...defaultSpot, x: 6 * 16, y: 4 * 16, type: 'hide-door' },
      { ...defaultDoor, x: 6 * 16, y: 4 * 16 },
    ],
    rewards: { items: 'potion' },
  },
  { lvl: 5, name: 'Evifen' },
];

let currentMap;

function randomKeyDrop() {
  if (rand(10) === 1) {
    const mapChest = currentMap.deadSpots.find(
      (x) => x.type === 'chest' && !x.unlocked
    );
    if (!mapChest) return;
    mapChest.unlocked = true;
    infoQueue.push(
      () => (infoEl.innerText = `You found the key to open the chest`)
    );
  }
}

function changeMap(rewards) {
  objLoop(rewards);
}

function openChest(chest) {
  objLoop(chest);
  currentMap.deadSpots.find((x) => x.type === 'chest').type = '';
  infoEl.innerText = `You opened a chest and got ${
    chest.gold ? chest.gold + 'g,' : ''
  } ${chest.items + ',' || ''} ${chest.stuff || ''}`;
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
      stuffFind(stuff.filter((s) => s.name === value));
    }
  }
}
