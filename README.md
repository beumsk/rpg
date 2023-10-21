# T🔥r💧v🍃

Tarava is an old school rpg inspired by my young years playing pokemon red. The story is based on the 4 elements: air, earth, water, fire. They are the base of everything on earth and our quest is to bring back freedom of the people by mastering the 4 elements and beat the evil masters.

## How to play

<p>Fight your way through enemies leading to new maps leading to new worlds to finally beat the masters and bring peace.</p>
<p>You can use touch/clicks or keyboard.</p>
<p><kbd>Esc</kbd>: open/close menu when walking in the world</p>
<p><kbd>◂▴▾▸</kbd>: navigate menus and select buttons</p>
<p><kbd>Enter | Spacebar</kbd>: validate selection</p>
<p><kbd>Return</kbd>: go back</p>

## Game Theme

- inspired from avatar -> fight your way to peace in a world of 4 elements
  - air > earth > water > fire
    - 💨 erodes 🍃 > 🍃 absorbs 💧 > 💧 extinguishes 🔥 > 🔥 consumes 💨
  - master the 4 elements through game
    - lvl up and finish maps to get elemental attacks
    - finish a world to master its element
    - defeat master at the end

## Game Design (GD)

- pokemon-rpg like, walking around and fighting enemies
- central map: doors to different element worlds
  - => go on the element of choice > finish the different maps (n, w, e, s) and center map to master x4 (elements)
    - you learn elemental attacks of world in rewards and get a thing showing we finished world
    - each map has monsters of any type to beat (+ quests?)
  - => master door opens > beat 4 masters + high master and win
- Dmg = (dmg+str-def) x elmt(0.75|1|1.5)
  - => power up player/enemy with str and def
- Player lvlUp => dmg+20% & def+10% (& every 3 lvls up attack or new attack)
- Enemy lvlUp => dmg+20% & def+10%
- Items are in shop and rewards
- Stuff are in shop or rewards
- Attacks are in dojo: learn or improve with scrolls

## Todo

- ensure reset resets everything => attention to shallow copy vs deep copy!

- work on attack improve !!
- simplify codes: map change, dry as much as possible (enemy/player attack, btnCreation, ...?)
- info in fight menu hover + review btn designs
- confirmation modal => buy any, use item, equip stuf
- review lvlup => give points to distribute on stats ?
- max of 4 attacks, select the ones to have in fight
- improve fights: better ai, attack range, elemental str&def?,
- improve maps: add things on those: npc, quests,
- more fights? add element on map to add new enemies or trainingMap?

- Tuto => get attack => fight enemy => buy potion and use it => door to temple

- => create paths on map? at least some decoration.

- test difficulty of game & add difficulty option?
- graphics: colors, animations, transitions, backgrounds

  - visuals on transitions (new world)
  - attacks: in fights and menus ?
  - items & stuff in menus ?

- ask player name?
- tutorial map??
- first fight intro+tuto against master that we lose as we only have basic attacks?

- show player/enemy character in fight?

> randomize

- rewardScreen => add boost? && option to pick average (5) or random (1-10) ?
- random dmg => attack have range of dmg

> other

- give enemies more attacks => should they have the same ones as player attacks?
- handle items curing malus

- other player sprites to pick when starting?
- add AI logic (not only first attack)
- add time of play (+ paused when unfocus page?)
- panoplie boost??

- add visuals of items, stuff, attacks, fights...
- decorate the maps
- add sounds effects? => rewards, attacks, movements, clicks

- world: game design? puzzle on some map?
- quests / achievements

## Ideas

- save/load via download/upload file? (encrypt data to avoid cheat?)
- quests in menu?
  - npc as deadSpots => when hitting => dialog screen? and start quest
- achievements in menu?
  - kill all kind of monsters, get all chest, stuff, attacks, elements
- add a lottery?
- flee a fight?
- map enigmas?
- review map to move outside of screen?
- each learned element would give a new monster to play? (pokemon like with switching monsters)
- text logo T🔥r💧v🍃 ?

## Useful

- pixelart 8bit creation at: https://www.pixilart.com/draw
- ascii: https://www.ee.ucl.ac.uk/~mflanaga/java/HTMLandASCIItableC1.html
- ↗ ⫯ ◈ ⋈ ↣ ∇ ♥ ❖ ☴ ☷ ☵ ☲ Ŧ ← → ↑ ↓ ▴ ▾ ◂ ▸ // ▣ ⨀ ♪ ♀ ♂ ✠ ∾
- 8 bit soundtracks: https://www.youtube.com/watch?v=5bn3Jmvep1k
- sprites characters: http://www.videogamesprites.net/FinalFantasy5/
- sprites: https://ccrgeek.wordpress.com/rpg-maker-ace/graphics/

## Dev

- 21.10.2023 => (20+10+4+8+1+2+6+6+4+2+4+8+4+4+2+4+4+4+4+4+4+4+4+3+4+4+2+4+2+4+6)=146?? hours total dev
