const items = [
  {
    name: 'potion',
    type: 'heal',
    // TODO: change effect to effect: { key: value }
    effect: 20,
    desc: 'potion: item description',
    base: true,
  },
  {
    name: 'remedy',
    type: 'state',
    effect: '',
    desc: 'remedy: item description',
  },
  {
    name: 'waker',
    type: 'state',
    effect: 'asleep',
    desc: 'waker: item description',
  },
  // add boosts and more items
  // items out of fight?
];

const itemsBase = items.filter((x) => x.base).map((x) => ({ ...x, qtt: 1 }));

function itemUse(item) {
  const c = player.items.find((x) => x.name === item);
  if (c.qtt > 0) {
    subText = `${player.name} uses ${item}`;
    c.qtt -= 1;
    if (c.type === 'heal') {
      player.hp + c.effect <= player.hpmax
        ? (player.hp += c.effect)
        : (player.hp = player.hpmax);
    } else if (c.type === 'state') {
      c.effect === ''
        ? (player.state = c.effect)
        : player.state.replace(c.effect, '');
    }
  } else {
    console.log(`No ${c.name} anymore`);
  }
}
