function screenWorld(keepEnemy) {
  container.style.backgroundImage = `conic-gradient(${cBack4} 0deg 90deg, ${cBack2} 90deg 180deg, ${cBack4} 180deg 270deg, ${cBack2} 270deg 360deg)`;
  container.style.backgroundSize = '32px 32px';

  // subText = `Map ${currentMap.lvl}`;

  // TODO: add multiple enemies?
  if (!keepEnemy) {
    mapEnemies = enemies.filter((x) => x.lvl === currentMap.lvl);
    currentEnemy = {
      ...mapEnemies[rand(mapEnemies.length)],
      ...randPos(canW, canH - 32, 16, [
        { x: player.x, y: player.y },
        ...currentMap.deadSpots,
      ]),
    };
  }

  let objects = [currentEnemy, player, ...currentMap.deadSpots];

  let animationId;

  function keyWorldHandler(event) {
    const key = event.key;
    const pos = { x: player.x, y: player.y };
    if (key === 'ArrowUp' && player.y >= 16) {
      player.y -= 16;
      subText = `Map ${currentMap.lvl}`;
    } else if (key === 'ArrowDown' && player.y <= canH - 64) {
      player.y += 16;
      subText = `Map ${currentMap.lvl}`;
    } else if (key === 'ArrowLeft' && player.x >= 16) {
      player.x -= 16;
      subText = `Map ${currentMap.lvl}`;
    } else if (key === 'ArrowRight' && player.x <= canW - 32) {
      player.x += 16;
      subText = `Map ${currentMap.lvl}`;
    } else if (key === 'Escape') {
      stop();
      document.removeEventListener('keydown', keyWorldHandler);
      screenMenu();
    }
    checkCollision(pos);

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
          player.x = 2 * 16;
          player.y = 2 * 16;
        } else {
          player.x = oldPos.x;
          player.y = oldPos.y;
          subText = `Up lvl ${player.lvl + 1} to reach Map ${
            currentMap.lvl + 1
          }`;
        }
      } else if (deadSpotCollision.type === 'chest') {
        if (player.keys.includes(deadSpotCollision.name)) {
          openChest(deadSpotCollision.chest);
          player.keys = player.keys.filter((x) => x !== deadSpotCollision.name);
          // make the chest disappear after use
          // currentMap.deadSpots = currentMap.deadSpots.filter(
          //   (x) => x.type !== 'chest' && x.name !== deadSpotCollision.name
          // );
          // objects = [currentEnemy, player, ...currentMap.deadSpots];
          // move chest because of remove bug
          deadSpotCollision.x = -16;
          deadSpotCollision.y = -16;
        } else {
          subText = 'You need the key of this chest.';
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
      const step = () => {
        ctx.clearRect(0, 0, canW, canH);

        images.forEach((img, i) =>
          ctx.drawImage(img, 0, 0, 16, 16, objImg[i].x, objImg[i].y, 16, 16)
        );

        objSq.forEach((obj) => {
          ctx.fillStyle = obj.fill;
          ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        });

        drawInfoBox();
        ctx.fillText(subText, textOffset, canH - 16);

        animationId = requestAnimationFrame(step);
      };
      step();
    });
  }

  function stop() {
    cancelAnimationFrame(animationId);
    document.removeEventListener('keydown', keyWorldHandler);
    ctx.clearRect(0, 0, canW, canH);
  }

  start();
}
