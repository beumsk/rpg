// TODO: add resell option?

function dojoBuy(name) {
  const c = player.dojo.find((x) => x.name === name);
  const isNewAttack = !player.attacks.find((x) => x.name === name);
  if (player.scrolls >= c.price) {
    player.scrolls -= c.price;
    if (isNewAttack) {
      attackFind([c]);
    } else {
      attackImprove([c]);
    }
  } else {
    infoEl.innerText = `You don't have enough scrolls...`;
  }
}
