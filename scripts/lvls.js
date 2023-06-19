const lvls = [
  0, 0, 4, 900, 1600, 2500, 3600, 4900, 6400, 8100, 10000, 12100, 14400, 16900,
  19600, 22500, 25600, 28900, 32400, 36100, 40000,
];

function checkLvlUp(currentLvl, currentXp) {
  // GD: only one level at a time
  const nextLvlXp = lvls[currentLvl + 1];
  if (currentXp >= nextLvlXp) {
    lvlUp();
  }
}

function lvlUp() {
  player.lvl += 1;
  // decide what to give
}
