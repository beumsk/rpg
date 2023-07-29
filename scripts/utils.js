// create html: canvas
const baseW = 352;
const baseH = 192;
let scale;

const canvasEl = document.createElement('canvas');
canvasEl.classList.add('canvas');

document.body.appendChild(canvasEl);

// general variables
const canvas = canvasEl;
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';

scaleCanvas();

const menuHeight = baseH / 6;
const textOffset = baseW / 44;

const step = baseW / 22;

let subText = ``;

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
  let newScale = Math.min(Math.floor(winW / baseW), Math.floor(winH / baseH));
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

function drawInfoBox() {
  drawRect(0, baseH - menuHeight + 1, baseW, menuHeight - 1, cWhite, cBlack, 1);
  ctx.font = `12px monospace`;
  ctx.fillStyle = cText;
}
