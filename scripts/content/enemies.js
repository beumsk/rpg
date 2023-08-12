const enemyBase = {
  x: 2 * step,
  y: 4 * step,
  w: step,
  h: step,
  fill: cEnemy,
  img: './img/enemy.png',
  state: '',
  element: '',
};

let enemies = [];

function codeMapEnemies(element, lvl, isBoss) {
  enemies = [];
  // how to handle last map of element? (should be boss/spirit fight)
  enemyNames[element].forEach((x) => {
    let crtMove = enemyMoves[element][rand(enemyMoves[element].length - 1)];

    let enemy = {
      ...enemyBase,
      name: x,
      lvl: lvl,
      element: element,
      hp: lvl * 20,
      hpmax: lvl * 20,
      str: lvl * 20,
      def: lvl * 10,
      xp: Math.ceil((lvls[lvl + 1] - lvls[lvl]) / 5),
      // xp: lvls[lvl + 1],
      gems: lvl * 2,
      attacks: [
        {
          name: crtMove,
          dmg: 4,
        },
      ],
    };

    enemies.push(enemy);
  });
}

const enemyNames = {
  air: [
    'Whirlwind Dancer',
    'Tempest Herald',
    'Zephyr Slicer',
    'Aerial Phantom',
    'Gust Guardian',
    'Skyshrieker',
    'Cyclone Conjurer',
  ],
  earth: [
    'Mountain Behemoth',
    'Quartz Goliath',
    'Crag Guardian',
    'Terra Tyrant',
    'Stone Sentinel',
    'Rockslide Ravager',
    'Dustforged Colossus',
  ],
  water: [
    'Marine Leviathan',
    'Aqua Shifter',
    'Tsunami Bringer',
    'Mistral Mage',
    'Tidal Tempest',
    'Deepsea Devourer',
    'Aquamyst Enchanter',
  ],
  fire: [
    'Flame Wraith',
    'Infernal Juggernaut',
    'Pyrogeist',
    'Ignis Incarnate',
    'Blazing Berserker',
    'Magma Monarch',
    'Emberflare Conjurer',
  ],
  master: [
    'Elemental Overlord',
    'Primordial Titan',
    'Harmony Weaver',
    'Ethereal Sovereign',
    'Astral Archon',
    'Celestial Conductor',
    'Cosmic Nexus',
  ],
};

const enemyMoves = {
  air: ['tornado strike', 'gust', 'cyclone burst'],
  earth: ['rockslide', 'quake', 'stalwart defense'],
  water: ['aqua jet', 'tidal wave', 'mist veil'],
  fire: ['inferno blaze', 'fireball', 'flame eruption'],
  master: ['elemental surge', 'ancient wrath', 'harmony fusion'],
};

let currentEnemy = {};

function enemyAttack(attack) {
  const c = attack
    ? currentEnemy.attacks.find((x) => x.name === attack)
    : currentEnemy.attacks[0];
  infoEl.innerText = `${currentEnemy.name} uses ${c.name}`;

  const manageDmg = () => {
    const lmt = calcElement(player.element, currentEnemy.element);
    const calcDmg = Math.floor(
      (c.dmg + (c.dmg * currentEnemy.str) / 100 - (c.dmg * player.def) / 100) *
        lmt
    );
    if (calcDmg >= player.hp) {
      player.hp = 0;
    } else {
      player.hp -= calcDmg;
    }
  };

  infoQueue.push(manageDmg, playerCheckDead);
}

function enemyCheckDead() {
  if (currentEnemy.hp === 0) {
    infoEl.innerText = `${currentEnemy.name} is dead`;
    infoQueue.push(playerWin);
  } else {
    infoEl.innerText = `${currentEnemy.name} is attacking...`;
    infoQueue.push(enemyAttack);
  }
}
