const items = [
  {
    name: 'potion',
    type: 'heal',
    // TODO: change effect to effect: { key: value }
    effect: 20,
    desc: 'item description',
    base: true,
  },
  {
    name: 'remedy',
    type: 'state',
    effect: '',
    desc: 'item description',
  },
  {
    name: 'waker',
    type: 'state',
    effect: 'asleep',
    desc: 'item description',
  },
  // add boosts and more items
];

const itemsBase = items.filter((x) => x.base).map((x) => ({ ...x, qtt: 1 }));

function itemUse(item, fromMenu) {
  const c = player.items.find((x) => x.name === item);
  if (c.qtt > 0) {
    infoEl.innerText = `${player.name} uses ${c.name}`;

    const manageItem = () => {
      if (c.type === 'heal') {
        player.hp + c.effect <= player.hpmax
          ? (player.hp += c.effect)
          : (player.hp = player.hpmax);
      } else if (c.type === 'state') {
        c.effect === ''
          ? (player.state = c.effect)
          : player.state.replace(c.effect, '');
      }
      if (c.qtt === 1) {
        player.items = player.items.filter((x) => x.name !== item);
      }
      c.qtt -= 1;
    };

    if (fromMenu) {
      manageItem();
    } else {
      infoQueue.push(manageItem, enemyAttack);
    }
  } else {
    console.log(`No ${c.name} anymore`);
  }
}

function itemFind(itemList) {
  itemList.map((x) => {
    if (player.items.find((i) => i.name === x.name)) {
      player.items.find((i) => i.name === x.name).qtt += 1;
    } else {
      const foundItem = items.find((i) => i.name === x.name);
      player.items.push({ ...foundItem, qtt: 1 });
    }
  });
}
