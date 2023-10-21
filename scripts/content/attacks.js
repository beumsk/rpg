// GD: attacks are for the player; they can deal dmg/steal, state, bonus/malus, poison
// GD: attacks are influenced by strength, defense
// GD: attacks are also influenced by player & enemy elements (air > earth > water > fire => dmg * 0.5 || 2 || 1)
// GD: the player & enemy element are defined before combat
// GD: breathless><flying +- crit (air)
// GD: entangled><grounded +- def (earth)
// GD: drenched><hydrated +- str (water)
// GD: burnt><firedup +-hpmax (fire) => 60/80 -5 = 55/75 && 60/80 +5 = 65/85
// GD: ??? heal or dmg each turn (periodics)

// TODO: review attacks => must be possible for attack to handle state, to give bonus/malus, to steal life, to heal, to poison
// pass turn?

const attacksTypes = ['attack', 'bonus', 'malus'];

const attacksNeutral = [
  // base attack => crit deals more dmg
  { name: 'punch', dmg: 6, age: 1, src: ['dojo'] },
  { name: 'kick', dmg: 10, age: 2, src: [] },
  { name: 'headbutt', dmg: 14, age: 3, src: [] },
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
      lvl: 1,
      age: neu.age || 1,
      price: neu.age || 1,
      dmg: neu.dmg,
      src: neu.src,
    };
    attacks.push(attack);
  });
  attacksElement.forEach((ele, i) => {
    let age = (i % (attacksElement.length / 4)) + 1; // 1,2,3
    let attack = {
      name: ele.name,
      type: 'attack',
      element: ele.element,
      lvl: 1,
      age: age,
      price: age,
      dmg: 2 + age * 4,
      src: ['dojo'],
    };
    attacks.push(attack);
  });
  attacksBonusMalus.forEach((boo) => {
    let attack = {
      name: boo.name,
      type: boo.state.includes('+') ? 'bonus' : 'malus',
      element: boo.state.replace('+', '').replace('-', ''),
      lvl: 1,
      age: 1,
      price: 1,
      state: boo.state,
      src: ['dojo'],
    };
    attacks.push(attack);
  });
}
codeAttacks();

function attackElementApply(element, obj, isBonus, isSide, isCrit) {
  const critFactor = isSide ? 0.4 : isCrit ? 1.4 : 1;
  function calcBM(base) {
    return Math.floor(base * critFactor + (base * obj.wis) / 100);
  }

  if (element === 'air') {
    isBonus ? (obj.critTemp += calcBM(10)) : (obj.critTemp -= calcBM(10));
    return `${obj.name} % critical ${isBonus ? 'in' : 'de'}creased`;
  } else if (element === 'earth') {
    isBonus ? (obj.defTemp += calcBM(5)) : (obj.defTemp -= calcBM(5));
    return `${obj.name} defense ${isBonus ? 'in' : 'de'}creased`;
  } else if (element === 'water') {
    isBonus ? (obj.strTemp += calcBM(10)) : (obj.strTemp -= calcBM(10));
    return `${obj.name} strength ${isBonus ? 'in' : 'de'}creased`;
  } else if (element === 'fire') {
    isBonus ? (obj.hp += calcBM(10)) : (obj.hp -= calcBM(10));
    isBonus ? (obj.hpmaxTemp += calcBM(10)) : (obj.hpmaxTemp -= calcBM(10));
    return `${obj.name} hp ${isBonus ? 'in' : 'de'}creased`;
  }
}

function attackFind(attackList) {
  attackList.map((a) => {
    player.attacks = [...player.attacks, { ...a }];
    const d = player.dojo.find((x) => x.name === a.name);
    d.price += 1;
    d.lvl += 1;
    d.dmg += 2;
  });
}

function attackImprove(attackList) {
  // TODO: think of a way to improve bonus/malus attacks
  attackList.map((a) => {
    const c = player.attacks.find((x) => x.name === a.name);
    c.price += 1;
    c.lvl += 1;
    c.dmg += 2;
    const d = player.dojo.find((x) => x.name === a.name);
    d.price += 1;
    d.lvl += 1;
    d.dmg += 2;
  });
}

// ability to add up fire+ ?
// player.states.includes('fire+') ? null : (player.states = [...player.states, 'fire+']);
// return 'Player will win hp periodically';
