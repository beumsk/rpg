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
    name: 'test shop ring',
    type: 'ring',
    effect: { str: 5 },
    desc: 'stuff description',
    lvl: 1,
    price: 10,
  },
  {
    name: 'test shop ringg',
    type: 'ring',
    effect: { str: 5 },
    desc: 'stuff description',
    lvl: 1,
    price: 10,
  },
  {
    name: 'test shop ring 2',
    type: 'ring',
    effect: { str: 5 },
    desc: 'stuff description',
    lvl: 2,
    price: 10,
  },
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
