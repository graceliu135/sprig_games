/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze Game
@author: Grace
@tags: [maze, puzzle]
@addedOn: 2024-07-19
*/

// the sprites
const original = "o"
const player = "p"
const wall = "w"
const goal = "g"
const trap = "t"
const key = "k"
const portal = "q"

setLegend(
  [original, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [player, bitmap`
................
.....00000......
.....04440......
.....04840......
.....04440......
.....00000......
.......0........
.......0........
....0000000.....
.......0........
.......0........
......000.......
......0.0.......
......0.0.......
......0.0.......
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [goal, bitmap`
................
................
..444444444444..
..4DDDDDDDDDD4..
..4D44444444D4..
..4D4DDDDDD4D4..
..4D4D4444D4D4..
..4D4D4DD4D4D4..
..4D4D4DD4D4D4..
..4D4D4444D4D4..
..4D4DDDDDD4D4..
..4D44444444D4..
..4DDDDDDDDDD4..
..444444444444..
................
................`],
  [trap, bitmap`
3222222222222223
2322222222222232
2232222222222322
2223222222223222
2222322222232222
2222232222322222
2222223223222222
2222222332222222
2222222332222222
2222223223222222
2222232222322222
2222322222232222
2223222222223222
2232222222222322
2322222222222232
3222222222222223`],
  [key, bitmap`
................
................
...6F...........
..666F..........
...666F.........
...6666F........
..666666F.......
.666..666F......
..6..666666666..
....666.6666666.
.....6...66..66.
.........66..66.
.........666666.
..........6666..
................
................`],
  [portal, bitmap`
HHHHHHHHHHHHHHHH
H88888888888888H
H88HHHHHHHHHH88H
H8H8HHHHHHHH8H8H
H8HH8HHHHHH8HH8H
H8HHH8HHHH8HHH8H
H8HHHH8HH8HHHH8H
H8HHHHH22HHHHH8H
H8HHHHH22HHHHH8H
H8HHHH8HH8HHHH8H
H8HHH8HHHH8HHH8H
H8HH8HHHHHH8HH8H
H8H8HHHHHHHH8H8H
H88HHHHHHHHHH88H
H88888888888888H
HHHHHHHHHHHHHHHH`],
)

let level = 0
// const levels = [
//   map`
// wwwwwwwwwwwwwww
// wpwtttttttt...w
// w.wkwkwkwkwkw.w
// w.w.w.w.w.w.w.w
// w.w.w.w.w.w.w.w
// w.w.w.w.w.w.w.w
// w.....w.w.w.w.w
// w.wwwww.w.w.w.w
// w.......w.w.w.w
// w.wwwwwww.w.w.w
// w.........w.w.w
// w.wwwwwwwww.w.w
// w...........wgw
// wwwwwwwwwwwwwww`,
//   map`
// wwwwwwwwwwwwwww
// wpwgwt........w
// w.wqwt.wwwwww.w
// w.wwwt.....qw.w
// w.wttt.wwwwww.w
// w.w.w...w...w.w
// w.w.w.w.w.w.w.w
// w.w.w.w.w.w.w.w
// w.w.w.wkw.w...w
// w.w.w.www.www.w
// w.w........kw.w
// w.wwwwwwwwwww.w
// w.............w
// wwwwwwwwwwwwwww`,
// ]

const levels = [
  map`
wwwwwwwwwwwwwww
wp............w
w.............w
w...q...q.....w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w............gw
wwwwwwwwwwwwwww`,
]

const currentLevel = levels[level]
setMap(currentLevel)

setSolids([player, wall]);

setPushables({
  [player]: []
})

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y += -1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});

let curKeys = 0;
let keysToPass = tilesWith(key);

const tileHasType = (x, y, type) => {
  return getTile(x, y).some(sprite => sprite.type === type);
}

addText("Keys Collected: " + curKeys, {
  x: 0,
  y: 0,
})

afterInput(() => {
  const xLoc = getFirst(player).x;
  const yLoc = getFirst(player).y;

  const tileHasGoal = tileHasType(xLoc, yLoc, goal);
  const tileHasTrap = tileHasType(xLoc, yLoc, trap);
  const tileHasKey = tileHasType(xLoc, yLoc, key);
  const tileHasPortal = tileHasType(xLoc, yLoc, portal);

  if (tileHasKey) {
    curKeys = curKeys + 1;
    addText("Keys Collected: " + curKeys, {
      x: 0,
      y: 0,
    })
    clearTile(xLoc, yLoc);
    addSprite(xLoc, yLoc, player);
  }

  if (tileHasGoal) {
    if (curKeys == keysToPass.length) {
      level = level + 1;
      curKeys = 0;

      const currentLevel = levels[level];

      if (currentLevel !== undefined) {
        setMap(currentLevel);
        keysToPass = tilesWith(key);
      } else {
        addText("Congrats! You win!", { y: 4, color: color`3` });
      }
    }
  }

  if (tileHasTrap) {
    curKeys = 0;
    const currentLevel = levels[level]; // get the original map of the level

    // make sure the level exists before we load it
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
    }
  }

  if (tileHasPortal) {
    const portalTiles = tilesWith(portal);
    const otherPortal = portalTiles.find(tile => tile.x !== xLoc || tile.y !== yLoc);
    addText(otherPortal.x)

    getFirst(player).x = otherPortal.x;
    getFirst(player).y = otherPortal.y;

  }
})