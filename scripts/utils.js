// general variables
const container = document.querySelector('.container');
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';

const canW = canvas.width;
const canH = canvas.height;

const menuHeight = 32;
const textOffset = 8;

let subText = ``;

const cWhite = '#fff';
const cBlack = '#000';
const cText = '#333';
const cText2 = '#d22';
const cBack = '#eee';
const cBack2 = '#ddd';
const cBack3 = '#ccc';
const cBack4 = '#bbb';
const cPlayer = '#00a2ff';
const cEnemy = '#ff595e';
const cDoor = '#bf723f';
const cChest = '#bf723f';

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

function drawRect(x, y, width, height, fill, stroke, ratio) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width * ratio, height);
}

function drawInfoBox() {
  drawRect(0, canH - menuHeight + 1, canW, menuHeight - 1, cWhite, cBlack, 1);
  ctx.font = '12px monospace';
  ctx.fillStyle = cText;
}
