function screenWorld(keepEnemy) {
  container.style.backgroundImage = `conic-gradient(${cBack4} 0deg 90deg, ${cBack2} 90deg 180deg, ${cBack4} 180deg 270deg, ${cBack2} 270deg 360deg)`;
  container.style.backgroundSize = '32px 32px';

  subText = `Map ${currentMap.lvl}`;

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

  const objects = [currentEnemy, player, ...currentMap.deadSpots];

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
      // } else if (event.ctrlKey && event.key === 'r') {
      //   event.preventDefault();
      //   location.reload();
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
          player.Y = 2 * 16;
        } else {
          player.x = oldPos.x;
          player.y = oldPos.y;
          subText = `Up lvl ${player.lvl + 1} to reach Map ${
            currentMap.lvl + 1
          }`;
        }
      } else if (deadSpotCollision.type === 'chest') {
        openChest(deadSpotCollision.chest);
        // make the chest disappear after use
        deadSpotCollision.x = -16;
        deadSpotCollision.y = -16;
      } else {
        player.x = oldPos.x;
        player.y = oldPos.y;
      }
    }
  }

  function start() {
    document.addEventListener('keydown', keyWorldHandler);

    const step = () => {
      ctx.clearRect(0, 0, canW, canH);
      objects.forEach((obj) => {
        ctx.fillStyle = obj.fill;
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      });

      // info text
      drawRect(
        1,
        canH - menuHeight - 1,
        canW - 2,
        menuHeight,
        cWhite,
        cBlack,
        1
      );
      ctx.font = '12px monospace';
      ctx.fillStyle = cText;
      ctx.fillText(subText, textOffset, canH - 16);

      animationId = requestAnimationFrame(step);
    };
    step();
  }

  function stop() {
    cancelAnimationFrame(animationId);
    document.removeEventListener('keydown', keyWorldHandler);
    ctx.clearRect(0, 0, canW, canH);
  }

  start();
}
