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
      <span>${player.gems} ◈</span>
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
      ${withPrice ? `<p>price: ${info.price} ◈</p>` : null}
    `;
  } else if ([...stuffTypes].includes(info.type)) {
    return `
      <h3>${info.name}</h3>
      <p>${info.type}: ${JSON.stringify(info.effect)}</p>
      ${withPrice ? `<p>price: ${info.price} ◈</p>` : null}
      `;
    // <p>equiped: ${!!info.equiped}</p>
  } else if ([...attacksTypes].includes(info.type)) {
    return `
      <h3>${info.name}</h3>
      <p>${info.type}: ${info.dmg ? info.dmg + 'dmg' : ''} (${info.element})</p>
      <p>age: ${info.age}</p>
      ${withPrice ? `<p>price: ${info.price} ◈</p>` : null}
    `;
  }
}

function calcElement(elementOfAttack, elementAttacking, elementDefending) {
  // GD: lmt attack gives player/enemy that lmt => if used again lmt attack === lmt of player/enemy => check factor
  // TODO: rework with element+ (using twice same element give extra bonusor opposite)
  // => +on- = 1.5, ++on- = 2, -on+ = 0.75, --on+ = 0.5

  if (elementOfAttack !== elementAttacking) return 1;

  if (
    (elementAttacking === 'earth' && elementDefending === 'water') ||
    (elementAttacking === 'water' && elementDefending === 'fire') ||
    (elementAttacking === 'fire' && elementDefending === 'air') ||
    (elementAttacking === 'air' && elementDefending === 'earth')
  ) {
    return 1.5;
  } else if (
    (elementAttacking === 'water' && elementDefending === 'earth') ||
    (elementAttacking === 'fire' && elementDefending === 'water') ||
    (elementAttacking === 'air' && elementDefending === 'fire') ||
    (elementAttacking === 'earth' && elementDefending === 'air')
  ) {
    return 0.75;
  } else {
    return 1;
  }
}
