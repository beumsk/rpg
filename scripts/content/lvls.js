let lvls = [];

function codeLvls(maxLevel) {
  for (let lvl = 0; lvl <= maxLevel; lvl++) {
    lvls.push(lvl < 2 ? 0 : lvl * lvl * 10);
  }
}
codeLvls(50);

function checkLvlUp(currentLvl, currentXp) {
  // GD: only one level at a time
  const nextLvlXp = lvls[currentLvl + 1];
  if (currentXp >= nextLvlXp) {
    lvlUp();
    return true;
  }
  return false;
}

function lvlUp() {
  currentMap.deadSpots.find((x) => x.type.includes('door')).y = 11 * 16;
  infoQueue.push(
    () => (infoEl.innerText = `You lvl up to lvl ${player.lvl}, the door is now open!`)
  );
  player.hpmax += 20;
  player.hp = player.hpmax;
  player.str += 20;
  player.def += 10;
  player.wis += 10;
  player.crit += 1;
  player.lvl += 1;
  shopLvlUp(player.lvl);
}
