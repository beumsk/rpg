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
];

// TODO: limit stuff to one per item type
// => reorganize by type OR filter by type and add equiped prop

const stuffBase = stuff.filter((x) => x.base);

function stuffEquip(stuffList) {
  stuffList.map((s) => {
    player.stuff.push(s);
    for (const key in s.effect) {
      const value = s.effect[key];
      player[key] += value;
    }
  });
}
