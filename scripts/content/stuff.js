// TODO: add amulet, belt, boots, rune, pet?
const stuffCategories = ['ring', 'cloak', 'hat'];

const stuffFamilies = [
  { name: 'dummy', effect: { hp: 2 }, lvl: 1, src: ['base'] },
  {
    name: 'balanced',
    effect: { hp: 5, str: 5, def: 5 },
    lvl: 1,
    src: ['reward'],
  },
  { name: 'strong', effect: { str: 10 }, lvl: 2, src: ['shop'] },
  { name: 'robust', effect: { def: 5 }, lvl: 3, src: ['shop'] },
  { name: 'healthy', effect: { hp: 20 }, lvl: 4, src: ['shop'] },
];

let stuff = [];

function codeStuff() {
  stuffFamilies.forEach((fam) => {
    stuffCategories.forEach((cat, i) => {
      let stuf = {
        name: `${fam.name} ${cat}`,
        type: cat,
        effect: fam.effect,
        // desc: 'stuff desc',
        lvl: fam.src === 'base' ? fam.lvl : fam.lvl + i,
        price: fam.lvl * 5,
        src: fam.src,
      };

      stuff.push(stuf);
    });
  });
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
  });
}
