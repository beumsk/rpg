const shop = [
  {
    name: 'potion',
    type: 'heal',
    effect: 20,
    desc: 'item description',
    lvl: 1,
    price: 2,
  },
  {
    name: 'potion +',
    type: 'heal',
    effect: 50,
    desc: 'item description',
    lvl: 5,
    price: 10,
  },
  {
    name: 'strong ring',
    type: 'ring',
    effect: { str: 10 },
    desc: 'stuff description',
    lvl: 1,
    price: 10,
  },
  {
    name: 'strong hat',
    type: 'hat',
    effect: { str: 10 },
    desc: 'stuff description',
    lvl: 1,
    price: 10,
  },
  {
    name: 'strong cloak',
    type: 'cloak',
    effect: { str: 10 },
    desc: 'stuff description',
    lvl: 1,
    price: 10,
  },
  {
    name: 'stronger ring',
    type: 'ring',
    effect: { str: 40 },
    desc: 'stuff description',
    lvl: 5,
    price: 40,
  },
  {
    name: 'stronger hat',
    type: 'hat',
    effect: { str: 40 },
    desc: 'stuff description',
    lvl: 5,
    price: 40,
  },
  {
    name: 'stronger cloak',
    type: 'cloak',
    effect: { str: 40 },
    desc: 'stuff description',
    lvl: 5,
    price: 40,
  },
  {
    name: 'strongest ring',
    type: 'ring',
    effect: { str: 100 },
    desc: 'stuff description',
    lvl: 10,
    price: 100,
  },
  // (strong, healthy, solid) x (ring, hat, cloak) x (1, 5, 10...)
];

const shopBase = shop.filter((x) => x);

// TODO: add resell option?

function shopBuy(name) {
  // TODO: add equip/use option when buying?
  const c = player.shop.find((x) => x.name === name);
  if (player.gems >= c.price) {
    player.gems -= c.price;
    if (stuffCategories.includes(c.type)) {
      stuffFind([c]);
      player.shop = player.shop.filter((x) => x.name !== name);
    } else {
      itemFind([c]);
    }
  } else {
    infoEl.innerText = `You don't have enough gems...`;
  }
}
