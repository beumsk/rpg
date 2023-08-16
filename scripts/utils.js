// create html: container + canvas
const containerEl = document.createElement('div');
containerEl.classList.add('container');
document.body.appendChild(containerEl);

const canvasEl = document.createElement('canvas');
canvasEl.classList.add('canvas');
containerEl.appendChild(canvasEl);

// general variables
const baseW = 22 * 16; // 352
const baseH = 12 * 16; // 192

const canvas = canvasEl;
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';

const menuHeight = baseH / 6;
const textOffset = baseW / 44;

const step = baseW / 22;

const elements = ['air', 'earth', 'water', 'fire'];

let infoQueue = [];

const imagesToLoad = [
  './img/player.png',
  './img/enemy.png',
  './img/door.png',
  './img/chest.png',
];
let imagesLoaded = [];

// colors
const cYellow = '#f7f06d';
const cYellowLt = '#f9f5bb';
const cGreen = '#09bc8a';
const cGreenLt = '#73d2aa';
const cBlue = '#00a2ff';
const cBlueLt = '#82c9ff';
const cRed = '#ff595e';
const cRedLt = '#ff9b9f';
const cViolet = '#a052d7';
const cVioletLt = '#d3b0e0';
const cBrown = '#bf723f';
const cWhite = '#fff';
const cWhite1 = '#eee';
const cWhite2 = '#ddd';
const cWhite3 = '#ccc';
const cWhite4 = '#bbb';
const cBlack4 = '#444';
const cBlack3 = '#333';
const cBlack2 = '#222';
const cBlack1 = '#111';
const cBlack = '#000';

let cText = cBlack3;
let cText2 = cRed;
let cBack = cWhite1;
let cBack2 = cWhite2;
let cBack3 = cWhite3;
let cBack4 = cWhite4;
let cGrad1 = cBack2;
let cGrad2 = cBack4;
let cPlayer = cBlue;
let cEnemy = cRed;
let cDoor = cBrown;
let cChest = cBrown;

const colorGrid = {
  air: cYellowLt,
  earth: cGreenLt,
  water: cBlueLt,
  fire: cRedLt,
  master: cVioletLt,
};

// story texts
const texts = {
  intro: [
    `<h1>Hello adventurer!</h1>`,
    `<p>The world is in grave peril, ruled by malevolent masters whose thirst for power knows no bounds.</p>
      <p>In the midst of chaos, a prophecy emerges. To save the realm, one should learn and master the 4 elements.</p>
      <p>Air, Earth, Water and Fire will help him facing the tyrannical masters and finally be able to find back peace and balance in the world.</p>`,
    `<p>I am convinced you can be the chosen one!</p><p>Waste no time and reach the Temple of elements!</p>`,
    `<p>Pick the order you prefer to master the different elements. For each element you will land in the dedicated territory and will face the allies of the masters. Defeating them in all the zones will give you the opportunity to face the elemental spirit.</p>
      <p>Once master of the 4 elements, you will be able to fight and let's hope defeat the masters!</p>`,
  ],
  air: [
    `<p>Congratulations! You are now an air bender!</p><p>You will be able to continue your quest by joining the temple.</p>`,
  ],
  earth: [
    `<p>Congratulations! You are now an earth bender!</p><p>You will be able to continue your quest by joining the temple.</p>`,
  ],
  water: [
    `<p>Congratulations! You are now a water bender!</p><p>You will be able to continue your quest by joining the temple.</p>`,
  ],
  fire: [
    `<p>Congratulations! You are now a fire bender!</p><p>You will be able to continue your quest by joining the temple.</p>`,
  ],
  outro: [
    `<h1>What a succes, valiant adventurer!</h1>`,
    `<p>Your journey through the elemental trials has forged you into a true master of the elements.</p>
      <p>With your newfound mastery over Air, Earth, Water, and Fire, you could bring back the peace everyone wanted.</p>`,
    `<p>Farewell and may your story echo through the ages!</p>`,
  ],
};

let scale;
scaleCanvas();

// create html : content, state, info, menu
containerEl.style.cssText = `
  width: ${baseW * scale};
  height: ${baseH * scale};
`;

const contentEl = document.createElement('div');
contentEl.classList.add('content');
contentEl.style.cssText = `
  width: ${baseW * scale};
  height: ${baseH * scale};
`;
containerEl.appendChild(contentEl);

const stateEl = document.createElement('div');
stateEl.classList.add('state');
containerEl.appendChild(stateEl);

const infoEl = document.createElement('div');
infoEl.classList.add('info');
containerEl.appendChild(infoEl);

// useful general functions
function rand(val, step = 1, not) {
  let r;
  do {
    r = Math.floor((Math.random() * val) / step) * step;
  } while (r === not);
  return r;
}

function randPos(valX, valY, step = 1, not) {
  let rX;
  let rY;
  if (not) {
    do {
      rX = Math.floor((Math.random() * valX) / step) * step;
      rY = Math.floor((Math.random() * valY) / step) * step;
    } while (not.some((spot) => spot.x === rX && spot.y === rY));
  } else {
    rX = Math.floor((Math.random() * valX) / step) * step;
    rY = Math.floor((Math.random() * valY) / step) * step;
  }
  return { x: rX, y: rY };
}

function clearCanvas() {
  ctx.clearRect(0, 0, baseW, baseH);
}

function scaleCanvas() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  let newScale = Math.min(
    Math.floor(winW / baseW),
    Math.floor(winH / (baseH + menuHeight * 2))
  );
  if (!newScale) newScale = 1;
  if (newScale !== scale) {
    canvasEl.width = baseW * newScale;
    canvasEl.height = baseH * newScale;
    ctx.setTransform(newScale, 0, 0, newScale, 0, 0);
    document.documentElement.style.fontSize = 8 * newScale;
    scale = newScale;
  }
}

function drawRect(x, y, width, height, fill, stroke, ratio) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width * ratio, height);
}

function fireQueue() {
  if (infoQueue.length > 0) {
    const next = infoQueue[0]();
    infoQueue.shift();
    return next;
  }
}

function updateState() {
  // TODO: add score ??
  stateEl.innerHTML = `
    <p>
      <span>${player.name}</span> | 
      <span>lvl ${player.lvl}</span> | 
      <span>${player.xp}/${lvls[player.lvl + 1]} ↗</span> | 
      <span>${player.hp}/${player.hpmax} ♥</span> | 
      <span>${player.gems} ⨀</span>
    </p>
    <p>${
      currentMap.deadSpots.find((x) => x.type === 'chest')?.unlocked ? '🗝 ' : ''
    }
    ${currentMap.name}</p>
    `;
}

function calcElement(element1, element2) {
  if (
    (element1 === 'earth' && element2 === 'water') ||
    (element1 === 'water' && element2 === 'fire') ||
    (element1 === 'fire' && element2 === 'air') ||
    (element1 === 'air' && element2 === 'earth')
  ) {
    return 2;
  } else if (
    (element1 === 'water' && element2 === 'earth') ||
    (element1 === 'fire' && element2 === 'water') ||
    (element1 === 'air' && element2 === 'fire') ||
    (element1 === 'earth' && element2 === 'air')
  ) {
    return 0.5;
  } else {
    return 1;
  }
}
