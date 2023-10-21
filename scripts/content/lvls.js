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
  player.hpmax += 20;
  player.hp = player.hpmax;
  player.str += 20;
  player.def += 10;
  player.wis += 10;
  player.crit += 1;
  player.lvl += 1;
  player.scrolls += 1;
}
