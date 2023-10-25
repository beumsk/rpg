// useful general functions
function scaleCanvas() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  let newScale = Math.min(Math.floor(winW / baseW), Math.floor(winH / (baseH + menuHeight * 2)));
  if (!newScale) newScale = 1;
  canvasEl.width = baseW * newScale;
  canvasEl.height = baseH * newScale;
  ctx.setTransform(newScale, 0, 0, newScale, 0, 0);
  document.documentElement.style.fontSize = 8 * newScale + 'px';
  scale = newScale;
}
scaleCanvas();

function deepCopy(any) {
  return JSON.parse(JSON.stringify(any));
}

function rand(val, step = 1, not = []) {
  let r;
  do {
    r = Math.floor((Math.random() * val) / step) * step;
  } while (not.includes(r));
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

function uniqueRandoms(count, maxNumber) {
  const numbers = [];
  while (numbers.length < count) {
    numbers.push(rand(maxNumber, 1, numbers));
  }
  return numbers;
}

function clearCanvas() {
  ctx.clearRect(0, 0, baseW, baseH);
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
      <span>${player.hp}/${player.hpmax + player.hpmaxTemp} ♥</span> | 
      <span>${player.gems} ◈</span> | 
      <span>${player.scrolls} ⋈</span>
    </p>
    <p>${currentMap.deadSpots.find((x) => x.type === 'chest')?.unlocked ? '🗝 ' : ''}
    ${currentMap.name}</p>
    `;
}

function popupInfo(info, withPrice) {
  if ([...itemsTypes].includes(info.type)) {
    return `
      <h3>${info.name}</h3>
      <p>${info.type}: ${JSON.stringify(info.effect)}</p>
      ${withPrice ? `<p>price: ${info.price} ◈</p>` : ''}
    `;
  } else if ([...stuffTypes].includes(info.type)) {
    return `
      <h3>${info.name}</h3>
      <p>${info.type}: ${JSON.stringify(info.effect)}</p>
      ${withPrice ? `<p>price: ${info.price} ◈</p>` : ''}
      `;
    // <p>equiped: ${!!info.equiped}</p>
  } else if ([...attacksTypes].includes(info.type)) {
    return `
      <h3>${info.name}</h3>
      ${
        info.type === 'attack'
          ? `<p>${info.type}: ${info.dmg}dmg (${info.element})</p>`
          : `<p>${info.type}: ${info.type === 'bonus' ? '+' : '-'}${JSON.stringify(info.effect)} (${
              info.element
            })</p>`
      }      
      <p>lvl: ${info.lvl}</p>
      ${withPrice ? `<p>price: ${info.price} ⋈</p>` : ''}
    `;
  }
}

function calcElement(elementOfAttack, elementOfDefender) {
  // GD: lmt attack gives player/enemy that lmt => if lmt attack is used on defender with lmt => check factor
  // TOTHINK: rework with element+ (using twice same element give extra bonus or opposite)
  // => +on- = 1.5, ++on- = 2, -on+ = 0.75, --on+ = 0.5

  if (
    (elementOfAttack === 'earth' && elementOfDefender === 'water') ||
    (elementOfAttack === 'water' && elementOfDefender === 'fire') ||
    (elementOfAttack === 'fire' && elementOfDefender === 'air') ||
    (elementOfAttack === 'air' && elementOfDefender === 'earth')
  ) {
    return 1.5;
  } else if (
    (elementOfAttack === 'water' && elementOfDefender === 'earth') ||
    (elementOfAttack === 'fire' && elementOfDefender === 'water') ||
    (elementOfAttack === 'air' && elementOfDefender === 'fire') ||
    (elementOfAttack === 'earth' && elementOfDefender === 'air')
  ) {
    return 0.75;
  } else {
    return 1;
  }
}
