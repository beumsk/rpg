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

const imagesToLoad = ['./img/player.png', './img/enemy.png', './img/door.png', './img/chest.png'];
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
