// TODO: add resell option?

function shopBuy(name) {
  // TODO: add equip/use option when buying?
  const c = player.shop.find((x) => x.name === name);
  if (player.gems >= c.price) {
    player.gems -= c.price;
    if (stuffTypes.includes(c.type)) {
      stuffFind([c]);
      player.shop = player.shop.filter((x) => x.name !== name);
    } else {
      itemFind([c]);
    }
  } else {
    infoEl.innerText = `You don't have enough gems...`;
  }
}
