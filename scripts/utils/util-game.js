function gameReset() {
  // reset colors
  canvas.style.background = cWhite2;
  bgImg = 'temple';
  cGrad1 = cBack2;
  cGrad2 = cBack4;
  stateEl.style.background = cBack2;
  contentEl.style.background = 'transparent';

  // reset game
  player = { ...playerBase };
  currentEnemies = [];
  mapEnemies = [];
  maps = [...mapsBase];
  currentMap = { ...maps[0] };
  stuffEquip(stuffBase);
  stuffRewarded = [];
}

function gameLoad() {
  const load = JSON.parse(localStorage.getItem('game'));

  // load colors
  canvas.style.background = load.canvasBg;
  bgImg = load.bgImg;
  cGrad1 = load.cGrad1;
  cGrad2 = load.cGrad2;
  stateEl.style.background = load.stateBg;
  contentEl.style.background = load.contentBg;

  // load game
  player = { ...load.player };
  currentEnemies = load.currentEnemies;
  mapEnemies = load.mapEnemies;
  maps = load.maps;
  currentMap = load.currentMap;
  stuffEquip(load.player.stuff.filter((x) => x.equiped !== ''));
  stuffRewarded = load.stuffRewarded;
}

function gameSave() {
  const save = {
    canvasBg: canvas.style.background,
    bgImg: bgImg,
    cGrad1: cGrad1,
    cGrad2: cGrad2,
    stateBg: stateEl.style.background,
    contentBg: contentEl.style.background,

    player: { ...player },
    currentEnemies: { ...currentEnemies },
    mapEnemies: [...mapEnemies],
    maps: [...maps],
    currentMap: { ...currentMap },
    stuffRewarded: [...stuffRewarded],
  };
  localStorage.setItem('game', JSON.stringify(save));
}

// TODO: handle download and upload of file for saving/loading

function gameDownload() {}

function gameUpload() {}
