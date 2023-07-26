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
  {
    name: 'test ring',
    type: 'ring',
    effect: { str: 5 },
    desc: 'test ring: stuff description',
  },
  // {
  //   name: 'test ringg',
  //   type: 'ring',
  //   effect: { str: 5 },
  //   desc: 'test ring: stuff description',
  // },
  // {
  //   name: 'test ringgg',
  //   type: 'ring',
  //   effect: { str: 5 },
  //   desc: 'test ring: stuff description',
  // },
  // {
  //   name: 'test ringggg',
  //   type: 'ring',
  //   effect: { str: 5 },
  //   desc: 'test ring: stuff description',
  // },
  // {
  //   name: 'test ringgggg',
  //   type: 'ring',
  //   effect: { str: 5 },
  //   desc: 'test ring: stuff description',
  // },
  // {
  //   name: 'test ringggggg',
  //   type: 'ring',
  //   effect: { str: 5 },
  //   desc: 'test ring: stuff description',
  // },
  // add amulet, belt, boots, rune, pet?
];

const stuffBase = stuff.filter((x) => x.base);

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
      if (key === 'hpmax') player.hp += value;
    } else {
      player[key] -= value;
      if (key === 'hpmax') player.hp -= value;
    }
  }
}

function stuffFind(stuffList) {
  stuffList.map((s) => {
    player.stuff = [...player.stuff, { ...s, equiped: '' }];
  });
}
