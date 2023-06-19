// general variables
const container = document.querySelector('.container');
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';

const canW = canvas.width;
const canH = canvas.height;

const cWhite = '#fff';
const cBlack = '#000';
const cText = '#333';
const cText2 = '#d22';
const cBack = '#eee';
const cBack2 = '#ddd';
const cBack3 = '#ccc';
const cBack4 = '#bbb';
const cPlayer = '#22d';
const cEnemy = '#d22';
const cDoor = '#2d2';

// useful general functions
function rand(val, step = 1, not) {
  let r;
  do {
    r = Math.floor((Math.random() * val) / step) * step;
  } while (r === not);
  return r;
}
