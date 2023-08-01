// create html: canvas
const baseW = 352;
const baseH = 192;

let scale;

const containerEl = document.createElement('div');
containerEl.classList.add('container');
document.body.appendChild(containerEl);

const canvasEl = document.createElement('canvas');
canvasEl.classList.add('canvas');
containerEl.appendChild(canvasEl);

// general variables
const canvas = canvasEl;
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';

const menuHeight = baseH / 6;
const textOffset = baseW / 44;

const step = baseW / 22;

scaleCanvas();

containerEl.style.cssText = `
  width: ${baseW * scale};
  height: ${baseH * scale};
`;

const stateEl = document.createElement('div');
stateEl.classList.add('state');
stateEl.style.cssText = `
  height: ${(menuHeight / 2) * scale};
  font-size: ${8 * scale}px;
  padding: 0 ${8 * scale}px;
`;
containerEl.appendChild(stateEl);

const infoEl = document.createElement('div');
infoEl.classList.add('info');
infoEl.style.cssText = `
  height: ${menuHeight * scale};
  font-size: ${12 * scale}px;
  padding: 0 ${8 * scale}px;
`;
containerEl.appendChild(infoEl);

const menuEl = document.createElement('div');
menuEl.classList.add('menu');
menuEl.style.cssText = `
  height: ${(baseH - menuHeight) * scale};
  font-size: ${12 * scale}px;
  padding:  ${4 * scale}px ${8 * scale}px;
`;
containerEl.appendChild(menuEl);

let infoQueue = [];

const cYellow = '#f7f06d';
const cGreen = '#09bc8a';
const cBlue = '#00a2ff';
const cRed = '#ff595e';
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

const cText = cBlack3;
const cText2 = cRed;
const cBack = cWhite1;
const cBack2 = cWhite2;
const cBack3 = cWhite3;
const cBack4 = cWhite4;
const cPlayer = cBlue;
const cEnemy = cRed;
const cDoor = cBrown;
const cChest = cBrown;

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
  stateEl.innerHTML = `
    <span>${player.name}</span>
    <span>lvl ${player.lvl} (${player.xp}/${lvls[player.lvl + 1]}xp)</span>
    <span>${
      currentMap.deadSpots.find((x) => x.type === 'chest')?.unlocked ? '🗝 ' : ''
    }
    ${currentMap.name} (${currentMap.lvl})
    `;
}
