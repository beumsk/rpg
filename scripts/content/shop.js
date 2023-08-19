const shopBase = [
  ...items.filter((x) => x.lvl === 1 && x.src.includes('shop')),
  ...stuff.filter((x) => x.lvl === 1 && x.src.includes('shop')),
];

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

function shopLvlUp(lvl) {
  player.shop = [
    ...player.shop,
    ...items.filter((x) => x.lvl === lvl && x.src.includes('shop')),
    ...stuff.filter((x) => x.lvl === lvl && x.src.includes('shop')),
  ];
}
