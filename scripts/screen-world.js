function screenWorld() {
  container.style.backgroundImage = `conic-gradient(${cBack4} 0deg 90deg, ${cBack2} 90deg 180deg, ${cBack4} 180deg 270deg, ${cBack2} 270deg 360deg)`;
  container.style.backgroundSize = '32px 32px';

  const door = {
    x: 21 * 16,
    y: 0,
    w: 16,
    h: 16,
    fill: cDoor,
  };

  // TODO: add multiple enemies?
  // TOFIX: prevent enemies to respawn on show menu
  currentEnemy = {
    ...enemies[rand(enemies.length)],
    ...randPos(canW, canH, 16, currentMap.deadSpots),
    // x: 0,
    // y: 16,
  };

  const objects = [door, currentEnemy, player, ...currentMap.deadSpots];

  let animationId;

  function keyWorldHandler(event) {
    const key = event.key;
    const pos = { x: player.x, y: player.y };
    if (key === 'ArrowUp' && player.y >= 16) {
      player.y -= 16;
    } else if (key === 'ArrowDown' && player.y <= canH - 32) {
      player.y += 16;
    } else if (key === 'ArrowLeft' && player.x >= 16) {
      player.x -= 16;
    } else if (key === 'ArrowRight' && player.x <= canW - 32) {
      player.x += 16;
    } else if (key === 'Escape') {
      stop();
      document.removeEventListener('keydown', keyWorldHandler);
      screenLogic('menu');
      // } else if (event.ctrlKey && event.key === 'r') {
      //   event.preventDefault();
      //   location.reload();
    }
    checkCollision(pos);

    ctx.fillStyle = player.fill;
    ctx.fillRect(player.x, player.y, player.w, player.h);
  }

  function checkCollision(oldPos) {
    if (player.x === currentEnemy.x && player.y === currentEnemy.y) {
      stop();
      screenTransition('right', 'fight');
    } else if (
      currentMap.deadSpots.some(
        (spot) => spot.x === player.x && spot.y === player.y
      )
    ) {
      player.x = oldPos.x;
      player.y = oldPos.y;
    } else if (player.x === door.x && player.y === door.y) {
      if (player.lvl > currentMap.lvl) {
        currentMap = maps[currentMap.lvl + 1];
        stop();
        screenTransition('top', 'world');
        changeMap();
        player.x = 2 * 16;
        player.Y = 2 * 16;
      } else {
        player.x = oldPos.x;
        player.y = oldPos.y;
        console.log(
          `Up lvl ${player.lvl + 1} to reach Map ${
            maps[currentMap.lvl + 1].lvl
          }`
        );
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
