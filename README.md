# T🔥r💧v🍃

Tarava is an old school rpg inspired by my young years playing pokemon red. The story is based on the 4 elements: air, earth, water, fire. They are the base of everything on earth and our quest is to bring back freedom of the people by mastering the 4 elements and beat the evil masters.

## Game Theme

- inspired from avatar -> fight your way to peace in a world of 4 elements
  - air > earth > water > fire
    - 💨 erodes 🍃 > 🍃 absorbs 💧 > 💧 extinguishes 🔥 > 🔥 consumes 💨
  - pick 1 element and master 4 elements through game
    - quests OR maps to master new element
    - defeat master at the end
- Logo from 4 elements? && text logo T🔥r💧v🍃

## Game Design (GD)

- pokemon-rpg like, walking around and fighting enemies
- central map: doors to different element worlds
  - => go on the element of choice > finish the different maps (n, w, e, s) and final spirit to master x4 (elements)
    - you learn element of world OR element beating world (water > fire etc)
    - each map has monsters to beat (+ quests?)
  - => master door opens > beat 4 masters + high master and win (OR spirit world??)
- Dmg = (dmg+str-def) x elmt(0.5|1|2)
  - => power up player/enemy with str and def
- Player lvlUp => dmg+20% & def+10% (& up attack | new attack?)
- Enemy lvlUp => dmg+20% & def+10%
- Items are in shop and rewards
- Stuff are in shop or rewards
- Attacks are in rewards only??

## Todo

- how to get new attacks? via rewards, lvlup, in fight (catch an attack?), via quest?
- make enemy attacks better too
  - how to assign attacks to enemies?
- rethink element multiplier => based on?
  - player lmt && enemy lmt ||
  - attack lmt && world lmt ||
  - attack lmt && player lmt && enemy lmt ||
  - using lmt attack gives player/enemy that lmt || <= seems best option

> first release

1. items review: states >< attacks
2. attacks review: crits, elemental, bonus and malus
3. story review: new world texts, new element mastered
4. graphics: colors, animations, transitions
5. sprites: items, stuff, maps, more players?
6. sounds: attacks, clicks, movements

- review fight screen without canvas? => easier to write, add image etc

- to defeat a world (earth) you should master air => air attacks in rewards && best air attack in end world??

- get stronger faster? (enemies gain 20hp per map, player gain dmg+20%...)
  - panoplie boost??
  - introduce new attacks? world finished & lvlup?
    - how to balance with new player attacks?

> randomize

- randomScreen => select random reward (items, stuff, attacks?, boost?)
  - offer option to pick between average reward (5) or random (1-10) ??
- random dmg => attack have range of dmg (+ crits + fail?)

> other

- handle how is the game saved, loaded
- new > ask name > intro (dialog screen??) > world

- focus button show more info (items, attacks, stuff, rewards)
- tutorial map??
- fight system: state icons
- add AI logic (not only first attack)
- add time of play (+ paused when unfocus page?)

- add visuals: player, enemies, maps, => use sprites from online? (avatar, ff)
- add sounds effects? => rewards, attacks, walk...
- how to play on mobile?? => add move controls + clicks

- add randomnes => dmg
- world: game design? puzzle on some map?
- quests / achievements

## Ideas

- first fight intro+tuto against master that we lose as we only have basic attacks?
- quests in menu?
  - npc as deadSpots => when hitting => dialog screen? and start quest
- map enigmas?
- review map to move outside of screen?
- each learned element would give a new monster to play? (pokemon like with switching monsters)

## Useful

- 16px icons creation at: https://www.pixilart.com/draw
- ascii: https://www.ee.ucl.ac.uk/~mflanaga/java/HTMLandASCIItableC1.html
  - ↗ ⫯ ◈ ↣ ∇ ♥ ☴ ☷ ☵ ☲ Ŧ // ▣ ⨀ ♪ ♀ ♂ ✠ ⋈
- 8 bit soundtracks: https://www.youtube.com/watch?v=5bn3Jmvep1k
- sprites characters: http://www.videogamesprites.net/FinalFantasy5/
- sprites: https://ccrgeek.wordpress.com/rpg-maker-ace/graphics/

## Dev

- 5.08.2023 => (20+10+4+8+1+2+6+6+4+2+4+8+4+4+2+4+4+4+4+4+4+4+4+3)=120?? hours total dev
