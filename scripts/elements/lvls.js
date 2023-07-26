const lvls = [
  0, 0, 40, 90, 160, 250, 360, 490, 640, 810, 1000, 1210, 1440, 1690, 1960,
  2250, 2560, 2890, 3240, 3610, 4000,
];

function checkLvlUp(currentLvl, currentXp) {
  // GD: only one level at a time
  const nextLvlXp = lvls[currentLvl + 1];
  if (currentXp >= nextLvlXp) {
    lvlUp();
  }
}

function lvlUp() {
  player.str += 20 * player.lvl;
  player.hpmax += 20 * player.lvl;
  player.hp = player.hpmax;
  player.lvl += 1;
  // TODO: improve logic to have this subtext displayed on screenworld
  setTimeout(
    () => (subText = `You lvl up to lvl ${player.lvl}, the door is now open!`),
    1000
  );
}
