// general variables
let scale = 1;

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
  './img/door.png',
  './img/chest.png',
  './img/player.png',
  './img/air.png',
  './img/earth.png',
  './img/water.png',
  './img/fire.png',
  './img/enemy-air.png',
  './img/enemy-earth.png',
  './img/enemy-water.png',
  './img/enemy-fire.png',
  './img/enemy-master.png',
];
let imagesLoaded = [];

// colors
// TODO: adapt based on background img?
const cYellow = 'rgb(247, 240, 109)';
const cYellowLt = 'rgb(249, 245, 187)';
const cYellowTr = 'rgba(247, 240, 109, 0.5)';
const cGreen = 'rgb(9, 188, 138)';
const cGreenLt = 'rgb(115, 210, 170)';
const cGreenTr = 'rgba(9, 188, 138, 0.5)';
const cBlue = 'rgb(0, 162, 255)';
const cBlueLt = 'rgb(130, 201, 255)';
const cBlueTr = 'rgba(0, 162, 255, 0.5)';
const cRed = 'rgb(255, 89, 94)';
const cRedLt = 'rgb(255, 155, 159)';
const cRedTr = 'rgba(255, 89, 94, 0.5)';
const cViolet = 'rgb(160, 82, 215)';
const cVioletLt = 'rgb(211, 176, 224)';
const cVioletTr = 'rgba(160, 82, 215, 0.5)';
const cBrown = 'rgb(191, 114, 63)';
const cWhite = 'rgb(255, 255, 255)';
const cWhite1 = 'rgb(238, 238, 238)';
const cWhite2 = 'rgb(221, 221, 221)';
const cWhite3 = 'rgb(204, 204, 204)';
const cWhite4 = 'rgb(187, 187, 187)';
const cBlack4 = 'rgb(68, 68, 68)';
const cBlack3 = 'rgb(51, 51, 51)';
const cBlack2 = 'rgb(34, 34, 34)';
const cBlack1 = 'rgb(17, 17, 17)';
const cBlack = 'rgb(0, 0, 0)';

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

const colorTrGrid = {
  air: cYellowTr,
  earth: cGreenTr,
  water: cBlueTr,
  fire: cRedTr,
  master: cVioletTr,
};

const colorLtGrid = {
  air: cYellowLt,
  earth: cGreenLt,
  water: cBlueLt,
  fire: cRedLt,
  master: cVioletLt,
};

// backgrounds
let bgImg = 'temple';
