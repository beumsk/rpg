function screenFightEnd() {
  canvas.style.background = cGrad2;

  if (currentEnemy.hp === 0) {
    contentEl.innerHTML = `
      <div class="fight-end">
        <h1>You win!</h1>
        <div class="fighters">
          <p class="player winner">
            ${player.name} 
            lvl:${player.fightEnd.lvlUp ? `${player.lvl - 1}+1` : `${player.lvl}`}
          </p>
          <p class="enemy loser">
            ${currentEnemy.name} lvl:${currentEnemy.lvl}
          </p>
        </div>

        <div class="rewards">
          <p>xp: +${player.fightEnd.xp} ↗</p>
          <p>gems: +${player.fightEnd.gems} ◈</p>
          ${player.fightEnd.keyDrop ? '<p>chest key: 🗝</p>' : ''}
        </div>
      </div>
    `;
  } else {
    contentEl.innerHTML = `
      <div class="fight-end">
        <h1>You lose!</h1>
        <div class="fighters">
          <p class="player loser">${player.name} lvl:${player.lvl}</p>
          <p class="enemy winner">${currentEnemy.name} lvl:${currentEnemy.lvl}</p>
        </div>
      </div>
    `;
  }

  updateState();

  document.addEventListener('keydown', keyFightEndHandler);

  function keyFightEndHandler() {
    document.removeEventListener('keydown', keyFightEndHandler);
    contentEl.innerHTML = '';
    if (currentEnemy.hp === 0) {
      // if (player.fightEnd.lvlUp) {
      if (player.fightEnd.lvlUp && player.lvl % 3 === 0) {
        // TODO: ensure this is often enough
        screenTransition('right', () => screenReward('lvl'));
      } else {
        screenTransition('left', () => screenWorld());
      }
    } else {
      screenTransition('bottom', () => screenEnd());
    }
  }
}
