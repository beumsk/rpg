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

const elementStat = { air: 'crit', earth: 'def', water: 'str', fire: 'hp' };

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
  { name: 'aerocharge', element: 'air', type: 'bonus' },
  { name: 'terraforge', element: 'earth', type: 'bonus' },
  { name: 'hydroflow', element: 'water', type: 'bonus' },
  { name: 'pyroburst', element: 'fire', type: 'bonus' },
  // malus attacks => malus enemy
  { name: 'aerochill', element: 'air', type: 'malus' },
  { name: 'terratremor', element: 'earth', type: 'malus' },
  { name: 'hydrodrain', element: 'water', type: 'malus' },
  { name: 'pyrosmother', element: 'fire', type: 'malus' },
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
      type: boo.type,
      element: boo.element,
      lvl: 1,
      age: 1,
      price: 1,
      effect: { [elementStat[boo.element]]: boo.element === 'water' ? 20 : 10 },
      src: ['dojo'],
    };
    attacks.push(attack);
  });
}
codeAttacks();

function attackElementApply(attack, obj, isSide, isCrit) {
  const critFactor = isSide ? 0.4 : isCrit ? 1.4 : 1;
  const isBonus = attack.type === 'malus' ? 'malus' : 'bonus'; // 'attack' is bonus

  function calcBM() {
    let base = attack.element === 'water' ? 20 : 10;
    let calc = Math.floor(
      base + ((base * (attack.lvl - 1)) / 2) * critFactor + (base * obj.wis) / 100
    );
    return isBonus ? calc : -calc;
  }

  if (attack.element === 'air') {
    obj.critTemp += calcBM();
    return `${obj.name} % critical ${isBonus ? 'in' : 'de'}creased`;
  } else if (attack.element === 'earth') {
    obj.defTemp += calcBM();
    return `${obj.name} defense ${isBonus ? 'in' : 'de'}creased`;
  } else if (attack.element === 'water') {
    obj.strTemp += calcBM();
    return `${obj.name} strength ${isBonus ? 'in' : 'de'}creased`;
  } else if (attack.element === 'fire') {
    obj.hp += calcBM();
    obj.hpmaxTemp += calcBM();
    return `${obj.name} hp ${isBonus ? 'in' : 'de'}creased`;
  }
}

function attackFind(attackList) {
  attackList.map((a) => {
    player.attacks = deepCopy([...player.attacks, { ...a }]);
    const d = player.dojo.find((x) => x.name === a.name);
    d.price += 1;
    d.lvl += 1;
    if (a.dmg) {
      d.dmg += 2;
    } else {
      d.effect[elementStat[d.element]] += (d.element === 'water' ? 20 : 10) / 2;
    }
  });
}

function attackImprove(attackList) {
  attackList.map((a) => {
    const c = player.attacks.find((x) => x.name === a.name);
    const d = player.dojo.find((x) => x.name === a.name);
    c.price += 1;
    d.price += 1;
    c.lvl += 1;
    d.lvl += 1;
    if (a.dmg) {
      c.dmg += 2;
      d.dmg += 2;
    } else {
      c.effect[elementStat[c.element]] += (c.element === 'water' ? 20 : 10) / 2;
      d.effect[elementStat[d.element]] += (d.element === 'water' ? 20 : 10) / 2;
    }
  });
}

// ability to add up fire+ ?
// player.states.includes('fire+') ? null : (player.states = [...player.states, 'fire+']);
// return 'Player will win hp periodically';
