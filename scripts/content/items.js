const items = [
  // items boosting str, def, elements, ...
  // TODO: codeItems => more items and differents levels/ages
  // TODO: end of fight => remove tempItemEffects
  {
    name: 'potion',
    type: 'heal',
    effect: { hp: 20 },
    desc: 'item description',
    lvl: 1,
    price: 2,
    src: ['base', 'shop', 'reward'],
  },
  {
    name: 'strength',
    type: 'boost',
    effect: { str: 10 },
    desc: 'item description',
    lvl: 1,
    price: 5,
    src: ['base', 'shop', 'reward'],
  },
  {
    name: 'potion +',
    type: 'heal',
    effect: { hp: 50 },
    desc: 'item description',
    lvl: 5,
    price: 10,
    src: ['shop', 'reward'],
  },
  // {
  //   name: 'remedy',
  //   type: 'state',
  //   effect: {state: ''},
  //   desc: 'item description',
  // },
  // {
  //   name: 'waker',
  //   type: 'state',
  //   effect: {state: 'asleep'},
  //   desc: 'item description',
  // },
];

const itemsBase = items.filter((x) => x.src.includes('base')).map((x) => ({ ...x, qtt: 1 }));

let tempItemEffects = {};

function itemUse(item, fromMenu) {
  const c = player.items.find((x) => x.name === item);
  if (c.qtt > 0) {
    infoEl.innerText = `${player.name} uses ${c.name}`;

    const manageItem = () => {
      itemApplyEffects(c.effect);
      if (c.qtt === 1) {
        player.items = player.items.filter((x) => x.name !== item);
      } else {
        c.qtt -= 1;
      }
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

function itemApplyEffects(obj) {
  for (const key in obj) {
    const value = obj[key];
    if (['hp'].includes(key)) {
      player.hp + value <= player.hpmax ? (player.hp += value) : (player.hp = player.hpmax);
    } else if (['str', 'def'].includes(key)) {
      player[key] += value;
      // temp effects to be able to be removed after fight
      tempItemEffects[key] ? (tempItemEffects[key] += value) : (tempItemEffects[key] = value);
    } else if (key === 'state') {
      value === '' ? (player.states = []) : player.states.filter((x) => x !== value);
      // add tempeffects
    }
  }
}

function itemFind(itemList, qtt) {
  itemList.map((x) => {
    if (player.items.find((i) => i.name === x.name)) {
      player.items.find((i) => i.name === x.name).qtt += Number(qtt) || 1;
    } else {
      const foundItem = items.find((i) => i.name === x.name);
      player.items.push({ ...foundItem, qtt: 1 });
    }
  });
}
