let player = {};

const playerBase = {
  name: 'Player',
  x: 2 * 16,
  y: 2 * 16,
  w: 16,
  h: 16,
  fill: cPlayer,
  hp: 30,
  hpmax: 100,
  state: 'asleep',
  str: 20,
  lvl: 1,
  xp: 0,
  gold: 0,
  attacks: attacks.filter((x) => x.base),
  items: items.filter((x) => x.base).map((x) => ({ ...x, qtt: 1 })),
  stuff: stuff.filter((x) => x.base),
  useAttack: (attack) => {
    const c = player.attacks.find((x) => x.name === attack);
    subText = 'oui';
    if (c.dmg >= currentEnemy.hp) {
      currentEnemy.hp = 0;
    } else {
      currentEnemy.hp -= c.dmg;
    }
  },
  useItem: (item) => {
    const c = player.items.find((x) => x.name === item);
    if (c.qtt > 0) {
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
  },
  endFight: () => {
    player.xp += currentEnemy.xp;
    player.gold += currentEnemy.gold;
    checkLvlUp(player.lvl, player.xp);
  },
};
