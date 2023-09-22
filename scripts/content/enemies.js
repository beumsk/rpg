const enemyBase = {
  x: 2 * step,
  y: 4 * step,
  w: step,
  h: step,
  // fill: cEnemy,
};

let mapEnemies = [];

function codeMapEnemies(lvl, world) {
  mapEnemies = [];
  // how to handle last map of element? (should it be different?)

  if (world === 'master') {
    codeElementEnemies('master');
  } else {
    elements.forEach((element) => codeElementEnemies(element));
  }

  function codeElementEnemies(element) {
    enemyNames[element].forEach((x) => {
      // let lmt = element === 'master' ? elements[rand(elements.length)] : element;

      // GD: master have 4 elements attacks
      // TODO: increase base dmg??
      let crtMoves =
        element === 'master'
          ? elements.map((x) => ({
              name: enemyMoves[x][rand(enemyMoves[x].length)],
              dmg: 4,
              element: x,
            }))
          : [
              {
                name: enemyMoves[element][rand(enemyMoves[element].length)],
                dmg: 4,
                element: element,
              },
            ];

      let enemy = {
        ...enemyBase,
        name: x,
        img: `./img/enemy-${element}.png`,
        hp: lvl * 20,
        hpmax: lvl * 20,
        str: lvl * 20,
        def: lvl * 10,
        crit: 10 + lvl,
        wis: lvl * 10,
        hpmaxTemp: 0,
        strTemp: 0,
        defTemp: 0,
        critTemp: 0,
        wisTemp: 0,
        states: [],
        lvl: lvl,
        xp: Math.ceil((lvls[lvl + 1] - lvls[lvl]) / 5),
        // DEV: xp = 1lvl
        // xp: lvls[lvl + 1],
        gems: lvl * 2,
        element: '',
        attacks: [...crtMoves],
      };

      mapEnemies.push(enemy);
    });
  }
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
    : currentEnemy.attacks[rand(currentEnemy.attacks.length)];

  infoEl.innerText = `${currentEnemy.name} uses ${c.name}`;

  const manageAttack = () => {
    const elementFactor = calcElement(c.element, currentEnemy.element, player.element);
    const isCrit = Math.random() < (currentEnemy.crit + currentEnemy.critTemp) / 100;

    if (c.type === 'bonus') {
      const info = attackElementApply(c.element, currentEnemy, true, false, isCrit);
      infoEl.innerText = `${info}`;
    } else if (c.type === 'malus') {
      const info = attackElementApply(c.element, player, false, false, isCrit);
      infoEl.innerText = `${info}`;
    } else {
      let calcDmg = Math.floor(
        (c.dmg +
          (c.dmg * (currentEnemy.str + currentEnemy.strTemp)) / 100 -
          (c.dmg * (player.def + player.defTemp)) / 100) *
          elementFactor
      );

      if (isCrit) {
        if (c.element === 'neutral') {
          infoEl.innerText = `Critical hit!`;
          calcDmg = Math.floor(calcDmg * 1.25);
        } else {
          const info = attackElementApply(c.element, currentEnemy, true, true, false);
          infoEl.innerText = `Critical hit! ${info}`;
        }
      }

      // GD: using an attack, gives the enemy that element
      currentEnemy.element = c.element !== 'neutral' ? c.element : '';

      if (calcDmg >= player.hp) {
        player.hp = 0;
      } else {
        player.hp -= calcDmg;
      }
    }
  };

  infoQueue.push(manageAttack, playerCheckDead);
}

function enemyCheckDead() {
  if (currentEnemy.hp === 0) {
    infoEl.innerText = `${currentEnemy.name} is dead`;
    infoQueue.push(playerWin);
  } else {
    const checkPeriodics = enemyPeriodics();
    if (checkPeriodics === 'stop') {
      infoEl.innerText = `${currentEnemy.name} is dead`;
      infoQueue.push(playerWin);
    } else {
      infoEl.innerText = `${currentEnemy.name} is attacking...`;
      infoQueue.push(enemyAttack);
    }
  }
}

function enemyPeriodics() {
  if (currentEnemy.states.includes('fire-')) {
    if (currentEnemy.hp > currentEnemy.hp - Math.floor(currentEnemy.hpmax / 20)) {
      currentEnemy.hp -= Math.floor(currentEnemy.hpmax / 20);
    } else {
      return 'stop';
    }
  }
  if (currentEnemy.states.includes('fire+')) {
    currentEnemy.hp += Math.floor(currentEnemy.hpmax / 20);
  }
}
