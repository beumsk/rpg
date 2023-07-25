const stuff = [
  {
    name: 'dummy hat',
    type: 'hat',
    effect: { hpmax: 5 },
    desc: 'dummy hat: stuff description',
    base: true,
  },
  {
    name: 'dummy cloak',
    type: 'cloak',
    effect: { hpmax: 5 },
    desc: 'dummy cloak: stuff description',
    base: true,
  },
  {
    name: 'dummy ring',
    type: 'ring',
    effect: { hpmax: 5 },
    desc: 'dummy ring: stuff description',
    base: true,
  },
  // hat, cloak, ring, amulet, belt, boots, rune?, pet?
  {
    name: 'test ring',
    type: 'ring',
    effect: { str: 5 },
    desc: 'test ring: stuff description',
  },
];

const stuffBase = stuff.filter((x) => x.base);

function stuffEquip(stuffList) {
  stuffList.map((s) => {
    // stuff type is empty (game start)
    if (!player.stuff.find((x) => x.type === s.type)) {
      player.stuff = [...player.stuff, { ...s, equiped: s.type }];
      stuffModifyEffects(s.effect);
    }
    // replace stuff type because already something equiped
    const newStuff = player.stuff.find((x) => x.name === s.name);
    const oldStuff = player.stuff.find((x) => x.equiped && x.type === s.type);
    if (newStuff?.equiped) return;
    else {
      oldStuff.equiped = '';
      stuffModifyEffects(oldStuff.effect, false);
      newStuff.equiped = s.type;
      stuffModifyEffects(newStuff.effect);
    }
  });
  // TODO: sort by equiped !!
  // player.stuff = player.stuff.sort((a, b) => a.equiped - b.equiped);
}

function stuffModifyEffects(obj, add = true) {
  for (const key in obj) {
    const value = obj[key];
    if (add) {
      player[key] += value;
      if (key === 'hpmax') player.hp += value;
    } else {
      player[key] -= value;
      if (key === 'hpmax') player.hp -= value;
    }
  }
}

function stuffFind(stuffList) {
  player.stuff = [...player.stuff, ...stuffList];
}
