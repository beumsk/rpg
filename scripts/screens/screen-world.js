function screenWorld(keepEnemy) {
  canvas.style.backgroundImage = `conic-gradient(${cBack4} 0deg 90deg, ${cBack2} 90deg 180deg, ${cBack4} 180deg 270deg, ${cBack2} 270deg 360deg)`;
  canvas.style.backgroundSize = `${step * scale * 2}px ${step * scale * 2}px`;

  updateState();

  infoEl.innerText = ' ';

  fireQueue();

  // TODO: add multiple enemies?
  if (!keepEnemy) {
    mapEnemies = enemies.filter((x) => x.lvl === currentMap.lvl);
    currentEnemy = {
      ...mapEnemies[rand(mapEnemies.length)],
      ...randPos(baseW, baseH - 32, step, [
        { x: player.x, y: player.y },
        ...currentMap.deadSpots,
      ]),
    };
  }

  let objects = [currentEnemy, player, ...currentMap.deadSpots];

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
      if (deadSpotCollision.type === 'door') {
        if (player.lvl > currentMap.lvl) {
          currentMap = maps[currentMap.lvl + 1];
          stop();
          screenTransition('top', () => screenWorld());
          changeMap(currentMap.rewards);
          infoQueue.push(
            () => (infoEl.innerText = `You reached map ${currentMap.lvl}`)
          );
          player.x = 2 * step;
          player.y = 2 * step;
        } else {
          player.x = oldPos.x;
          player.y = oldPos.y;

          infoEl.innerText = `Up lvl ${player.lvl + 1} to reach Map ${
            currentMap.lvl + 1
          }`;
        }
      } else if (deadSpotCollision.type === 'chest') {
        if (deadSpotCollision.unlocked) {
          openChest(deadSpotCollision.chest);
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
    const objImg = objects.filter((x) => x.img);
    const objSq = objects.filter((x) => !x.img);

    function loadImage(obj) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = obj.img;
      });
    }

    function loadImages(obj) {
      return Promise.all(obj.map(loadImage));
    }

    loadImages(objImg).then((images) => {
      const frame = () => {
        clearCanvas();

        images.forEach((img, i) =>
          ctx.drawImage(
            img,
            0,
            0,
            step,
            step,
            objImg[i].x,
            objImg[i].y,
            step,
            step
          )
        );

        objSq.forEach((obj) => {
          ctx.fillStyle = obj.fill;
          ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        });

        animationId = requestAnimationFrame(frame);
      };
      frame();
    });
  }

  function stop() {
    cancelAnimationFrame(animationId);
    document.removeEventListener('keydown', keyWorldHandler);
    clearCanvas();
  }

  start();
}
