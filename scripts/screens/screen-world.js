function screenWorld(from) {
  canvas.style.backgroundImage = `url(./img/bg-${bgImg}.png)`;
  canvas.style.backgroundSize = `${step * scale * 2}px ${step * scale * 2}px`;
  contentEl.style.background = cGrad2;

  audioPlay('world');

  updateState();

  infoEl.innerText = ' ';

  if (from === 'map') {
    selectCurrentEnemies(enemiesPerMap);
  }

  if (currentMap.name === 'tutorial') {
    tutoStart();
  }

  if (!['tutorial', 'temple'].includes(currentMap.name) && currentEnemies.length === 0) {
    const door = currentMap.deadSpots.find((x) => x.type.includes('door'));
    if (door) door.y = 11 * 16;
    infoQueue.push(
      () => (infoEl.innerText = `You cleared ${currentMap.name}, the door is now open!`)
    );
  }

  let animationId;

  actionMenuEl.innerText = 'Menu';
  function menuClick() {
    stop();
    actionMenuEl.removeEventListener('click', menuClick);
    screenMenu();
  }
  actionMenuEl.addEventListener('click', menuClick);

  actionMoveEl.style.display = 'block';

  function movePlayer(dir) {
    return function () {
      const oldPos = { x: player.x, y: player.y };
      if (dir === 'up' && player.y >= step) {
        player.y -= step;
      } else if (dir === 'down' && player.y < baseH - player.h) {
        player.y += step;
      } else if (dir === 'left' && player.x >= step) {
        player.x -= step;
      } else if (dir === 'right' && player.x < baseW - player.w) {
        player.x += step;
      }
      player.img = player.img === './img/player.png' ? './img/player-r.png' : './img/player.png';
      infoEl.innerText = ` `;
      checkCollision(oldPos);
    };
  }
  const moveUp = movePlayer('up');
  const moveDown = movePlayer('down');
  const moveLeft = movePlayer('left');
  const moveRight = movePlayer('right');

  function keyWorldHandler(e) {
    if (infoQueue.length) return fireQueue();
    const key = e.key;
    if (key === 'ArrowUp') {
      e.preventDefault();
      moveUp();
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      moveDown();
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      moveLeft();
    } else if (key === 'ArrowRight') {
      e.preventDefault();
      moveRight();
    } else if (key === 'Escape') {
      stop();
      screenMenu();
    }
  }

  function checkCollision(oldPos) {
    const deadSpotCollision = currentMap.deadSpots.find(
      (spot) => spot.x === player.x && spot.y === player.y
    );
    if (currentEnemies.some((x) => x.x === player.x && x.y === player.y)) {
      stop();
      currentEnemy = currentEnemies.find((x) => x.x === player.x && x.y === player.y);
      screenTransition('right', () => screenFight());
    } else if (deadSpotCollision) {
      if (deadSpotCollision.type === 'end-door') {
        stop();
        screenTransition('top', () => screenStory(texts['outro'], () => screenEnd(true)));
      } else if (deadSpotCollision.type === 'tuto-door') {
        stop();
        screenReward('tuto');
      } else if (deadSpotCollision.type === 'temple-door') {
        worldCompleted(currentWorld.name);
        stop();
        screenReward('world');
      } else if (deadSpotCollision.type === 'door') {
        stop();
        screenReward('map');
      } else if (['air', 'earth', 'water', 'fire'].includes(deadSpotCollision.type)) {
        stop();
        changeMap(deadSpotCollision.type, 'first');
      } else if (deadSpotCollision.type === 'master') {
        stop();
        changeMap('master', 'first');
      } else if (deadSpotCollision.type === 'chest') {
        if (deadSpotCollision.unlocked) {
          stop();
          screenReward('chest');
          deadSpotCollision.x = -step;
          updateState();
        } else {
          infoEl.innerText = 'You need the key of this chest';
          player.x = oldPos.x;
          player.y = oldPos.y;
        }
      } else if (deadSpotCollision.type === 'shop') {
        player.x = oldPos.x;
        player.y = oldPos.y;
        stop();
        screenShop();
      } else if (deadSpotCollision.type === 'dojo') {
        player.x = oldPos.x;
        player.y = oldPos.y;
        stop();
        screenDojo();
      } else {
        player.x = oldPos.x;
        player.y = oldPos.y;
      }
    }
  }

  function start() {
    document.addEventListener('keydown', keyWorldHandler);
    actionMoveEl.querySelector('.up').addEventListener('click', moveUp);
    actionMoveEl.querySelector('.down').addEventListener('click', moveDown);
    actionMoveEl.querySelector('.left').addEventListener('click', moveLeft);
    actionMoveEl.querySelector('.right').addEventListener('click', moveRight);

    const frame = () => {
      clearCanvas();

      let objects = [player, ...currentMap.deadSpots, ...currentEnemies];
      objects.forEach((obj) => {
        if (obj.fill) {
          ctx.fillStyle = obj.fill;
          ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        }
        if (obj.img) {
          ctx.fillStyle = 'transparent';
          let img = imagesLoaded[imagesToLoad.findIndex((x) => x === obj.img)];
          ctx.drawImage(img, 0, 0, img.width, img.height, obj.x, obj.y, step, step);
        }
      });

      animationId = requestAnimationFrame(frame);
    };
    frame();
  }

  function stop() {
    cancelAnimationFrame(animationId);
    actionMenuEl.innerText = '';
    actionMoveEl.style.display = 'none';
    document.removeEventListener('keydown', keyWorldHandler);
    actionMenuEl.removeEventListener('click', menuClick);
    actionMoveEl.querySelector('.up').removeEventListener('click', moveUp);
    actionMoveEl.querySelector('.down').removeEventListener('click', moveDown);
    actionMoveEl.querySelector('.left').removeEventListener('click', moveLeft);
    actionMoveEl.querySelector('.right').removeEventListener('click', moveRight);
    clearCanvas();
  }

  start();
}
