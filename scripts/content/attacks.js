// GD: attacks are for the player; they can deal dmg/steal, state, bonus/malus, poison
// GD: attacks are influenced by strength, defense
// GD: attacks are also influenced by player & enemy elements (air > earth > water > fire => dmg * 0.5 || 2 || 1)
// GD: the player & enemy element are defined before combat
// GD: breathless><flying +- crit (air)
// GD: entangled><grounded +- def (earth)
// GD: drenched><hydrated +- str (water)
// GD: burnt><firedup +-hpmax (fire) => 60/80 -5 = 55/75 && 60/80 +5 = 65/85
// GD: ??? heal or dmg each turn

// TODO: review attacks => must be possible for attack to handle state, to give bonus/malus, to steal life, to heal, to poison
// pass turn?

const attacksNeutral = [
  // base attack => crit deals more dmg
  { name: 'punch', dmg: 6, src: ['base'] },
  { name: 'kick', dmg: 8, src: [] },
  { name: 'cheat', dmg: 1000, src: [] },
  { name: 'joke', dmg: 0, src: [] },
];

const attacksElement = [
  // elemental attacks => crit gives extra effect based on element
  { name: 'wind', element: 'air' },
  { name: 'storm', element: 'air' },
  { name: 'tornado', element: 'air' },
  { name: 'mud', element: 'earth' },
  { name: 'landslide', element: 'earth' },
  { name: 'earthquake', element: 'earth' },
  { name: 'rain', element: 'water' },
  { name: 'flood', element: 'water' },
  { name: 'tsunami', element: 'water' },
  { name: 'flame', element: 'fire' },
  { name: 'wildfire', element: 'fire' },
  { name: 'eruption', element: 'fire' },
];

const attacksBonusMalus = [
  // bonus attacks => bonus player
  { name: 'aerocharge', state: 'air+' },
  { name: 'terraforge', state: 'earth+' },
  { name: 'hydroflow', state: 'water+' },
  { name: 'pyroburst', state: 'fire+' },
  // malus attacks => malus enemy
  { name: 'aerochill', state: 'air-' },
  { name: 'terratremor', state: 'earth-' },
  { name: 'hydrodrain', state: 'water-' },
  { name: 'pyrosmother', state: 'fire-' },
];

let attacks = [];

function codeAttacks() {
  attacksNeutral.forEach((neu) => {
    let attack = {
      name: neu.name,
      type: 'attack',
      element: 'neutral',
      dmg: neu.dmg,
      src: neu.src,
      desc: `${neu.dmg}dmg (neutral)`,
    };
    attacks.push(attack);
  });
  attacksElement.forEach((ele, i) => {
    let age = i % (attacksElement.length / 4); // 0,1,2
    let attack = {
      name: ele.name,
      type: 'attack',
      element: ele.element,
      age: age + 1,
      dmg: 6 + age * 4,
      // src: age === 0 ? ['reward', 'base'] : ['reward'],
      src: ['reward'],
      desc: `6dmg (${ele.element})`,
    };
    attacks.push(attack);
  });
  attacksBonusMalus.forEach((boo) => {
    let attack = {
      name: boo.name,
      type: boo.state.includes('+') ? 'bonus' : 'malus',
      element: boo.state.replace('+', '').replace('-', ''),
      state: boo.state,
      src: ['reward'],
      desc: `${boo.state}`,
    };
    attacks.push(attack);
  });
}
codeAttacks();

const attacksBase = attacks.filter((x) => x.src.includes('base'));

let attackBonus = {};
let attackMalus = {};

// TODO: make bonus/malus dynamic?
function attackElementApply(lmt, obj, isBonus, isCrit) {
  // TODO: isCrit to /2 bonus/malus?
  if (lmt === 'air') {
    isBonus ? (obj.critTemp += 10) : (obj.critTemp -= 10);
    return `${obj.name} % critical ${isBonus ? 'in' : 'de'}creased`;
  } else if (lmt === 'earth') {
    isBonus ? (obj.defTemp += 5) : (obj.defTemp -= 5);
    return `${obj.name} defense ${isBonus ? 'in' : 'de'}creased`;
  } else if (lmt === 'water') {
    isBonus ? (obj.strTemp += 10) : (obj.strTemp -= 10);
    return `${obj.name} strength ${isBonus ? 'in' : 'de'}creased`;
  } else if (lmt === 'fire') {
    // crit fire is way too powerful
    isBonus ? (obj.hp += 5) : (obj.hp -= 5);
    isBonus ? (obj.hpmaxTemp += 5) : (obj.hpmaxTemp -= 5);
    return `${obj.name} hp ${isBonus ? 'in' : 'de'}creased`;
  }
}

function attackElementCritApply(lmt) {
  if (lmt === 'air') {
    currentEnemy.critTemp -= 10;
    return 'Enemy % critical decreased';
  } else if (lmt === 'earth') {
    currentEnemy.defTemp -= 5;
    return 'Enemy defense decreased';
  } else if (lmt === 'water') {
    currentEnemy.strTemp -= 10;
    return 'Enemy strength decreased';
  } else if (lmt === 'fire') {
    currentEnemy.hp -= 5;
    currentEnemy.hpmaxTemp -= 5;
    return 'Enemy hp decreased';
    // currentEnemy.states.includes('fire-')
    //   ? null
    //   : (currentEnemy.states = [...currentEnemy.states, 'fire-']);
    // return 'Enemy will lose hp periodically';
  }
}

function attackBonusApply(state) {
  if (state === 'air+') {
    player.critTemp += 10;
    return 'Player % critical increased';
  } else if (state === 'earth+') {
    player.defTemp += 5;
    return 'Player defense increased';
  } else if (state === 'water+') {
    player.strTemp += 10;
    return 'Player strength increased';
  } else if (state === 'fire+') {
    player.hp += 5;
    player.hpmaxTemp += 5;
    return 'Enemy hp increased';
    // // TODO: ability to add up fire+ ?
    // player.states.includes('fire+') ? null : (player.states = [...player.states, 'fire+']);
    // return 'Player will win hp periodically';
  }
}

function attackMalusApply(state) {
  if (state === 'air-') {
    currentEnemy.critTemp -= 10;
    return 'Enemy % critical decreased';
  } else if (state === 'earth-') {
    currentEnemy.defTemp -= 5;
    return 'Enemy defense decreased';
  } else if (state === 'water-') {
    currentEnemy.strTemp -= 10;
    return 'Enemy strength decreased';
  } else if (state === 'fire-') {
    currentEnemy.hp -= 5;
    currentEnemy.hpmaxTemp -= 5;
    return 'Enemy hp decreased';
    // TODO: make this one better than crit fire one??
    // currentEnemy.states.includes('fire-')
    //   ? null
    //   : (currentEnemy.states = [...currentEnemy.states, 'fire-']);
    // return 'Enemy will lose hp periodically';
  }
}
