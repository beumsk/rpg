const itemsState = [
  { name: 'remedy', effect: { state: '' } },
  // { name: 'waker', effect: { state: 'asleep' } },
  // { name: 'antidote', effect: { state: 'poisoned' } },
  // { name: 'stimulant', effect: { state: 'paralyzed' } },
  // { name: 'defrost', effect: { state: 'frozen' } },
  { name: 'coolant', effect: { state: 'burnt' } },
  { name: 'dryer', effect: { state: 'drenched' } },
  { name: 'oxygen', effect: { state: 'breathless' } },
  { name: 'detangler', effect: { state: 'entangled' } },
];

const itemsFamilies = [
  { name: 'potion', type: 'heal', effect: { hp: 40 }, src: ['shop', 'reward'] },
  { name: 'strength', type: 'temp', effect: { str: 10 }, src: ['shop'] },
  { name: 'defense', type: 'temp', effect: { def: 5 }, src: ['shop'] },
  { name: 'critical', type: 'temp', effect: { crit: 5 }, src: ['shop'] },
  { name: 'health', type: 'temp', effect: { hpmax: 20 }, src: ['shop'] },
];

const itemsAges = ['I', 'II', 'III', 'IV', 'V'];

let items = [];

function codeItems() {
  // TODO: test it out once attacks can deal such states!
  // itemsState.forEach((state) => {
  //   let item = {
  //     ...state,
  //     type: 'state',
  //     lvl: 1,
  //     price: 5,
  //     src: ['shop', 'reward'],
  //   };
  //   items.push(item);
  // });

  itemsAges.forEach((age, ageIndex) => {
    itemsFamilies.forEach((fam) => {
      let item = {
        name: `${fam.name} ${age}`,
        type: fam.type,
        effect: calcEffects(fam.effect, ageIndex),
        lvl: ageIndex * 5 + 1,
        price: fam.type === 'heal' ? ageIndex * 5 || 2 : (ageIndex + 1) * 5,
        src: ageIndex === 0 ? ['base', ...fam.src] : fam.src,
      };
      items.push(item);
    });
  });

  function calcEffects(effects, mult) {
    const resEffects = {};
    for (let key in effects) {
      resEffects[key] = effects[key] * (mult + 1);
    }
    return resEffects;
  }
}
codeItems();

const itemsBase = items.filter((x) => x.src.includes('base')).map((x) => ({ ...x, qtt: 1 }));

function itemUse(item, fromMenu) {
  const c = player.items.find((x) => x.name === item);
  if (c.qtt > 0) {
    infoEl.innerText = `${player.name} uses ${c.name}`;

    const manageItem = () => {
      itemEffectsApply(c);
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

function itemEffectsApply(item) {
  const obj = item.effect;
  for (const key in obj) {
    const value = obj[key];
    if (['hp'].includes(key) && item.type === 'heal') {
      if (player.hp > player.hpmax) return;
      player.hp + value <= player.hpmax ? (player.hp += value) : (player.hp = player.hpmax);
    } else if (['str', 'def', 'crit', 'hpmax'].includes(key)) {
      player[key + 'Temp'] += value;
      if (key === 'hpmax') player.hp += value;
    } else if (key === 'state') {
      // TODO: to test & add tempeffects
      value === '' ? (player.states = []) : player.states.filter((x) => x !== value);
    }
  }
}

function itemFind(itemList, qtt) {
  itemList.map((x) => {
    if (player.items.find((i) => i.name === x.name)) {
      player.items.find((i) => i.name === x.name).qtt += Number(qtt) || 1;
    } else {
      const foundItem = items.find((i) => i.name === x.name);
      player.items.push({ ...foundItem, qtt: Number(qtt) || 1 });
    }
  });
}
