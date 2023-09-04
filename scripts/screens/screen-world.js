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
    mapEnemies = enemies.filter((x) => x.lvl === currentMap.lvl);
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

  function keyWorldHandler(e) {
    if (infoQueue.length) return fireQueue();
    const key = e.key;
    const oldPos = { x: player.x, y: player.y };
    if (key === 'ArrowUp' && player.y >= step) {
      player.y -= step;
      infoEl.innerText = ` `;
    } else if (key === 'ArrowDown' && player.y < baseH - player.h) {
      player.y += step;
      infoEl.innerText = ` `;
    } else if (key === 'ArrowLeft' && player.x >= step) {
      player.x -= step;
      infoEl.innerText = ` `;
    } else if (key === 'ArrowRight' && player.x < baseW - player.w) {
      player.x += step;
      infoEl.innerText = ` `;
    } else if (key === 'Escape') {
      stop();
      document.removeEventListener('keydown', keyWorldHandler);
      screenMenu();
    }
    checkCollision(oldPos);

    ctx.fillStyle = player.fill;
    ctx.fillRect(player.x, player.y, player.w, player.h);
  }

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
        screenTransition('top', () => screenStory('outro'));
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
    document.removeEventListener('keydown', keyWorldHandler);
    clearCanvas();
  }

  start();
}
