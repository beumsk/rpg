let lvls = [];

function codeLvls(maxLevel) {
  for (let lvl = 0; lvl <= maxLevel; lvl++) {
    // lvls.push(lvl < 2 ? 0 : lvl * lvl * 1);
    lvls.push(lvl < 2 ? 0 : lvl * lvl * 10);
  }
}
codeLvls(50);

function checkLvlUp(currentLvl, currentXp) {
  // GD: only one level at a time
  const nextLvlXp = lvls[currentLvl + 1];
  if (currentXp >= nextLvlXp) {
    lvlUp();
  }
}

function lvlUp() {
  currentMap.deadSpots.find((x) => x.type === 'hide-door').x = -step;
  infoQueue.push(
    () =>
      (infoEl.innerText = `You lvl up to lvl ${player.lvl}, the door is now open!`)
  );
  player.str += 20;
  player.def += 10;
  player.hpmax += 20;
  player.lvl += 1;
  player.hp = player.hpmax;
  shopLvlUp(player.lvl);
}
