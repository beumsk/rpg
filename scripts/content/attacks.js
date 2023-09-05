// GD: attacks are for the player; they can deal dmg/steal, state, bonus/malus, poison
// GD: attacks are influenced by strength, defense
// GD: attacks are also influenced by player & enemy elements (air > earth > water > fire => dmg * 0.5 || 2 || 1)
// GD: the player & enemy element are defined before combat
// GD: breathless><flying +- crit (air)
// GD: entangled><grounded +- def (earth)
// GD: drenched><hydrated +- str (water)
// GD: burnt><firedup +-hp each turn (fire)

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
  { name: 'wind', type: 'air' },
  { name: 'storm', type: 'air' },
  { name: 'tornado', type: 'air' },
  { name: 'mud', type: 'earth' },
  { name: 'landslide', type: 'earth' },
  { name: 'earthquake', type: 'earth' },
  { name: 'rain', type: 'water' },
  { name: 'flood', type: 'water' },
  { name: 'tsunami', type: 'water' },
  { name: 'flame', type: 'fire' },
  { name: 'wildfire', type: 'fire' },
  { name: 'eruption', type: 'fire' },
];

const attacksBoost = [
  // boost attacks => boost player
  { name: 'air boost', state: 'air+' },
  { name: 'earth boost', state: 'earth+' },
  { name: 'water boost', state: 'water+' },
  { name: 'fire boost', state: 'fire+' },
];

let attacks = [];

function codeAttacks() {
  attacksNeutral.forEach((neu) => {
    let attack = {
      name: neu.name,
      type: 'neutral',
      dmg: neu.dmg,
      src: neu.src,
    };
    attacks.push(attack);
  });
  attacksElement.forEach((ele, i) => {
    let age = i % (attacksElement.length / 4); // 0,1,2
    let attack = {
      name: ele.name,
      age: age + 1,
      dmg: 6,
      src: ['reward'],
    };
    attacks.push(attack);
  });
  attacksBoost.forEach((boo) => {
    let attack = {
      name: boo.name,
      type: 'boost',
      state: boo.state,
      src: ['reward'],
    };
    attacks.push(attack);
  });
}
codeAttacks();

const attacksBase = attacks.filter((x) => x.src.includes('base'));

let attackBoost = {};

// TODO: make bonus/malus dynamic?
function attackElementCritApply(lmt) {
  if (lmt === 'air') {
    currentEnemy.crit -= 10;
    return 'Enemy % critical decreased';
  } else if (lmt === 'earth') {
    currentEnemy.def -= 5;
    return 'Enemy defense decreased';
  } else if (lmt === 'water') {
    currentEnemy.str -= 10;
    return 'Enemy strength decreased';
  } else if (lmt === 'fire') {
    currentEnemy.states.includes('fire-') ? null : currentEnemy.states.push('fire-');
    return 'Enemy will lose hp periodically';
  }
}

function attackBoostApply(state) {
  if (state === 'air+') {
    player.crit += 10;
    attackBoost.crit ? (attackBoost.crit += value) : (attackBoost.crit = value);
    return 'Player % critical increased';
  } else if (state === 'earth+') {
    player.def += 5;
    attackBoost.def ? (attackBoost.def += value) : (attackBoost.def = value);
    return 'Player defense increased';
  } else if (state === 'water+') {
    player.str += 10;
    attackBoost.str ? (attackBoost.str += value) : (attackBoost.str = value);
    return 'Player strength increased';
  } else if (state === 'fire+') {
    player.states.includes('fire+') ? null : player.states.push('fire+');
    return 'Player will win hp periodically';
  }
}

function attackBoostUndo() {
  for (const key in attackBoost) {
    const value = attackBoost[key];
    player[key] -= value;
  }
  attackBoost = {};
  player.states = [];
}
