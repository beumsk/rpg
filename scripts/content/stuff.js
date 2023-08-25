// TODO: add belt, rune, pet?
const stuffCategories = ['ring', 'amulet', 'boots', 'cloak', 'hat'];

const stuffFamilies = [
  { name: 'dummy', effect: { hp: 2 }, lvl: 1, src: ['base'] },
  {
    name: 'balanced',
    effect: { hp: 4, str: 4, def: 4 },
    lvl: 1,
    src: ['reward'],
  },
  {
    name: 'energized',
    effect: { hp: 7, str: 7 },
    lvl: 1,
    src: ['reward'],
  },
  {
    name: 'fortified',
    effect: { hp: 7, def: 7 },
    lvl: 1,
    src: ['reward'],
  },
  { name: 'strong', effect: { str: 10 }, lvl: 1, src: ['shop'] },
  { name: 'robust', effect: { def: 5 }, lvl: 1, src: ['shop'] },
  { name: 'healthy', effect: { hp: 20 }, lvl: 1, src: ['shop'] },
];

const stuffAges = ['I', 'II', 'III', 'IV', 'V'];

let stuff = [];
let stuffRewarded = [];

function codeStuff() {
  let i = 0;
  stuffAges.forEach((age, ageIndex) => {
    stuffCategories.forEach((cat, catIndex) => {
      i++;
      stuffFamilies.forEach((fam, famIndex) => {
        let stuf = {
          name: fam.src.includes('base') ? `${fam.name} ${cat}` : `${fam.name} ${cat} ${age}`,
          type: cat,
          effect: calcEffects(fam.effect, ageIndex + 1, catIndex),
          // desc: 'stuff desc',
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
      resEffects[key] = effects[key] * mult + bonus;
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
      stuffModifyEffects(s.effect);
    }
    // replace stuff type because already something equiped
    else if (newStuff?.equiped) return;
    else {
      oldStuff.equiped = '';
      stuffModifyEffects(oldStuff.effect, false);
      newStuff.equiped = s.type;
      stuffModifyEffects(newStuff.effect);
    }
  });
  player.stuff.sort((a, b) => b.equiped.localeCompare(a.equiped));
}

function stuffModifyEffects(obj, add = true) {
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
