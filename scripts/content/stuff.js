// TODO: add belt, rune, pet?
const stuffTypes = ['ring', 'amulet', 'boots', 'cloak', 'hat'];

const stuffFamilies = [
  { name: 'starter', effect: { hp: 2 }, src: ['base'] },
  { name: 'balanced', effect: { hp: 4, str: 4, def: 4, wis: 4, crit: 1 }, src: ['reward'] },
  { name: 'energized', effect: { hp: 7, str: 7 }, src: ['reward'] },
  { name: 'fortified', effect: { hp: 7, def: 7 }, src: ['reward'] },
  // { name: 'sage', effect: { hp: 7, wis: 7 }, src: ['reward'] },
  { name: 'blessed', effect: { hp: 7, crit: 2 }, src: ['reward'] },
  { name: 'strong', effect: { str: 10 }, src: ['shop'] },
  { name: 'robust', effect: { def: 10 }, src: ['shop'] },
  { name: 'healthy', effect: { hp: 20 }, src: ['shop'] },
  { name: 'lucky', effect: { crit: 4 }, src: ['shop'] },
  { name: 'wise', effect: { wis: 10 }, src: ['shop'] },
];

const stuffAges = ['I', 'II', 'III', 'IV', 'V'];

let stuff = [];
let stuffRewarded = [];

function codeStuff() {
  let i = 0;
  stuffAges.forEach((age, ageIndex) => {
    stuffTypes.forEach((type, typeIndex) => {
      i++;
      stuffFamilies.forEach((fam, famIndex) => {
        let stuf = {
          name: fam.src.includes('base') ? `${fam.name} ${type}` : `${fam.name} ${type} ${age}`,
          type: type,
          effect: calcEffects(fam.effect, ageIndex + 1, typeIndex),
          lvl: fam.src.includes('base') ? 1 : i,
          price: i * 5,
          src: fam.src,
        };

        !(fam.src.includes('base') && age !== 'I') && stuff.push(stuf);
      });
    });
  });

  function calcEffects(effects, mult, bonus) {
    const resEffects = {};
    for (let key in effects) {
      if (key !== 'crit') {
        resEffects[key] = effects[key] * mult + bonus;
      } else {
        resEffects[key] = Math.floor((effects[key] * mult + bonus) / 2);
      }
    }
    return resEffects;
  }
}
codeStuff();

const stuffBase = stuff.filter((x) => x.src.includes('base'));

function stuffEquip(stuffList) {
  stuffList.map((s) => {
    const newStuff = player.stuff.find((x) => x.name === s.name);
    const oldStuff = player.stuff.find((x) => x.equiped && x.type === s.type);
    // stuff type is empty (game start)
    if (!player.stuff.find((x) => x.type === s.type)) {
      player.stuff = [...player.stuff, { ...s, equiped: s.type }];
      stuffApplyEffects(s.effect);
    }
    // replace stuff type because already something equiped
    else if (newStuff?.equiped) return;
    else {
      oldStuff.equiped = '';
      stuffApplyEffects(oldStuff.effect, false);
      newStuff.equiped = s.type;
      stuffApplyEffects(newStuff.effect);
    }
  });
  player.stuff.sort((a, b) => b.equiped.localeCompare(a.equiped));
}

function stuffApplyEffects(obj, add = true) {
  for (const key in obj) {
    const value = obj[key];
    if (add) {
      player[key] += value;
      if (key === 'hp') player.hpmax += value;
    } else {
      player[key] -= value;
      if (key === 'hp') player.hpmax -= value;
    }
  }
}

function stuffFind(stuffList) {
  stuffList.map((s) => {
    player.stuff = [...player.stuff, { ...s, equiped: '' }];
    if (s.src.includes('reward')) stuffRewarded.push(s);
  });
}
