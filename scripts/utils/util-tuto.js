function tutoStart() {
  // TOTHINK: first fight intro+tuto against master that we lose as we only have basic attacks?

  if (tutoStep === 'done') return;

  if (tutoStep === 'intro') {
    infoQueue.push(
      () => {
        infoEl.innerText = 'Welcome to the tutorial map!';
        tutoStep = 'dojo';
      },
      () => {
        infoEl.innerText = 'Learn your first attack in the dojo';
        player.scrolls = 1;
        updateState();
        currentMap.deadSpots.push(dojoBaseSpot);
      }
    );
  } else if (tutoStep === 'fight') {
    currentMap.deadSpots = [];
    infoQueue.push(() => {
      infoEl.innerText = 'Defeat your first enemy!';
      currentEnemies = [tutoEnemy];
    });
  } else if (tutoStep === 'shop') {
    currentEnemies = [];
    infoQueue.push(() => {
      infoEl.innerText = 'Buy your first item in the shop';
      player.gems = 2;
      updateState();
      currentMap.deadSpots.push(shopBaseSpot);
    });
    // TODO: add chest
    // TODO: add stuff
  } else if (tutoStep === 'potion') {
    currentMap.deadSpots = [];
    infoQueue.push(() => {
      infoEl.innerText = 'Open the menu, then items and use your option';
      document.querySelector('.action-menu').focus();
    });
  } else if (tutoStep === 'door') {
    infoQueue.push(() => {
      infoEl.innerText = 'Reach the door when you are ready!';
      currentMap.deadSpots.push({ ...doorBase, y: 11 * 16, type: 'tuto-door' });
      tutoStep = 'done';
    });
  }
}

let tutoStep = 'intro';
