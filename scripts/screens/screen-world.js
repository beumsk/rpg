function screenWorld(keepEnemy) {
  canvas.style.backgroundImage = `url(./img/bg-${bgImg}.png)`;
  canvas.style.backgroundSize = `${step * scale * 2}px ${step * scale * 2}px`;
  contentEl.style.background = cGrad2;

  audioPlay('world');

  updateState();

  infoEl.innerText = ' ';

  fireQueue();

  let objects;

  // TODO: add multiple enemies?
  if (!keepEnemy) {
    if (mapEnemies.length) {
      currentEnemy = {
        ...mapEnemies[rand(mapEnemies.length)],
        ...randPos(baseW, baseH - 32, step, [
          { x: player.x, y: player.y },
          ...currentMap.deadSpots,
        ]),
      };
    }
  }

  if (mapEnemies.length) {
    objects = [currentEnemy, player, ...currentMap.deadSpots];
  } else {
    objects = [player, ...currentMap.deadSpots];
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
      moveUp();
    } else if (key === 'ArrowDown') {
      moveDown();
    } else if (key === 'ArrowLeft') {
      moveLeft();
    } else if (key === 'ArrowRight') {
      moveRight();
    } else if (key === 'Escape') {
      stop();
      document.removeEventListener('keydown', keyWorldHandler);
      screenMenu();
    }
  }

  actionMoveEl.querySelector('.up').addEventListener('click', moveUp);
  actionMoveEl.querySelector('.down').addEventListener('click', moveDown);
  actionMoveEl.querySelector('.left').addEventListener('click', moveLeft);
  actionMoveEl.querySelector('.right').addEventListener('click', moveRight);

  function checkCollision(oldPos) {
    const deadSpotCollision = currentMap.deadSpots.find(
      (spot) => spot.x === player.x && spot.y === player.y
    );
    if (player.x === currentEnemy.x && player.y === currentEnemy.y) {
      stop();
      screenTransition('right', () => screenFight());
    } else if (deadSpotCollision) {
      if (deadSpotCollision.type === 'end-door') {
        stop();
        screenTransition('top', () => screenStory(texts['outro'], () => screenEnd(true)));
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
      } else {
        player.x = oldPos.x;
        player.y = oldPos.y;
      }
    }
  }

  function start() {
    document.addEventListener('keydown', keyWorldHandler);

    const frame = () => {
      clearCanvas();

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
    clearCanvas();
    actionMoveEl.querySelector('.up').removeEventListener('click', moveUp);
    actionMoveEl.querySelector('.down').removeEventListener('click', moveDown);
    actionMoveEl.querySelector('.left').removeEventListener('click', moveLeft);
    actionMoveEl.querySelector('.right').removeEventListener('click', moveRight);
  }

  start();
}
