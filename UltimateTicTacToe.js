/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: UltimateTicTacToe
@author: Grace
@tags: ['tictactoe', 'puzzle', 'two-player']
@addedOn: 2024-07-20
*/

const player = "p"
const x = "x"
const o = "o"
const wall = "w"
const sides = "s"

setLegend(
  [player, bitmap`
5555555555555555
5777777777777775
5755555555555575
5757777777777575
5757755555577575
5757575555757575
5757557557557575
5757555775557575
5757555775557575
5757557557557575
5757575555757575
5757755555577575
5757777777777575
5755555555555575
5777777777777775
5555555555555555`],
  [x, bitmap`
33............33
333..........333
.333........333.
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
..333......333..
.333........333.
333..........333
33............33`],
  [o, bitmap`
...4444444444...
..444444444444..
.44444444444444.
44444......44444
4444........4444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
4444........4444
44444......44444
.44444444444444.
..444444444444..
...4444444444...`],
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
  [sides, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`],
)

setSolids([player, wall]);

let level = 0
const levels = [
  map`
...w...w...
...w...w...
...w...w...
wwwwwwwwwww
...w...w...
...w.p.w...
...w...w...
wwwwwwwwwww
...w...w...
...w...w...
...w...w...`,
]

// const levels = [
//   map`
// .....w.....w.....
// .sss.w.sss.w.sss.
// .sss.w.sss.w.sss.
// .sss.w.sss.w.sss.
// .....w.....w.....
// wwwwwwwwwwwwwwwww
// .....w.....w.....
// .sss.w.sss.w.sss.
// .sss.w.sss.w.sss.
// .sss.w.sss.w.sss.
// .....w.....w.....
// wwwwwwwwwwwwwwwww
// .....w.....w.....
// .sss.w.sss.w.sss.
// .sss.w.sss.w.sss.
// .sss.w.sss.w.sss.
// .....w.....w.....`,
//   map`
// sss
// sss
// sss`,
// ]

setMap(levels[level])

setBackground(sides)

let gameover = false;

let bigBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let smallBoard = [
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
];

let currentBoard = 4;
let turn = true;

function gameFinished(winner) {
  gameover = true
  if (winner == "x") {
    addText(`Game over. X won!`, {
      x: 5,
      y: 5,
      color: color`3`
    })
  } else if (winner == "o") {
    addText(`Game over. O won!`, {
      x: 5,
      y: 5,
      color: color`4`
    })
  } else {
    addText(`Game over.`, {
      x: 3,
      y: 5,
      color: color`9`
    })
    addText(`It's a draw!`, {
      x: 5,
      y: 5,
      color: color`9`
    })
  }
  addText(`Press J to restart`, {
    x: 7,
    y: 5,
    color: color`D`
  })
}

function checkForSmallWinner(curBoard) {
  // return x or o if someone wins
  // if its a draw, clear the board and restart this small board
  if (smallBoard[curBoard][0][0] == smallBoard[curBoard][0][1] && smallBoard[curBoard][0][1] == smallBoard[curBoard][0][2] && smallBoard[curBoard][0][2] == "x") {
    return "x";
  } else if (smallBoard[curBoard][0][0] == smallBoard[curBoard][0][1] && smallBoard[curBoard][0][1] == smallBoard[curBoard][0][2] && smallBoard[curBoard][0][2] == "o") {
    return "o";
  }
  if (smallBoard[curBoard][1][0] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][1][2] && smallBoard[curBoard][1][2] == "x") {
    return "x";
  } else if (smallBoard[curBoard][1][0] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][1][2] && smallBoard[curBoard][1][2] == "o") {
    return "o";
  }
  if (smallBoard[curBoard][2][0] == smallBoard[curBoard][2][1] && smallBoard[curBoard][2][1] == smallBoard[curBoard][2][2] && smallBoard[curBoard][2][2] == "x") {
    return "x";
  } else if (smallBoard[curBoard][2][0] == smallBoard[curBoard][2][1] && smallBoard[curBoard][2][1] == smallBoard[curBoard][2][2] && smallBoard[curBoard][2][2] == "o") {
    return "o";
  }
  // columns
  if (smallBoard[curBoard][0][0] == smallBoard[curBoard][1][0] && smallBoard[curBoard][1][0] == smallBoard[curBoard][2][0] && smallBoard[curBoard][2][0] == "x") {
    return "x";
  } else if (smallBoard[curBoard][0][0] == smallBoard[curBoard][1][0] && smallBoard[curBoard][1][0] == smallBoard[curBoard][2][0] && smallBoard[curBoard][2][0] == "o") {
    return "o";
  }
  if (smallBoard[curBoard][0][1] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][2][1] && smallBoard[curBoard][2][1] == "x") {
    return "x";
  } else if (smallBoard[curBoard][0][1] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][2][1] && smallBoard[curBoard][2][1] == "o") {
    return "o";
  }
  if (smallBoard[curBoard][0][2] == smallBoard[curBoard][1][2] && smallBoard[curBoard][1][2] == smallBoard[curBoard][2][2] && smallBoard[curBoard][2][2] == "x") {
    return "x";
  } else if (smallBoard[curBoard][0][2] == smallBoard[curBoard][1][2] && smallBoard[curBoard][1][2] == smallBoard[curBoard][2][2] && smallBoard[curBoard][2][2] == "o") {
    return "o";
  }
  // diagonals
  if (smallBoard[curBoard][0][0] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][2][2] && smallBoard[curBoard][2][2] == "x") {
    return "x";
  } else if (smallBoard[curBoard][0][0] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][2][2] && smallBoard[curBoard][2][2] == "o") {
    return "o";
  }
  if (smallBoard[curBoard][0][2] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][2][0] && smallBoard[curBoard][2][0] == "x") {
    return "x";
  } else if (smallBoard[curBoard][0][2] == smallBoard[curBoard][1][1] && smallBoard[curBoard][1][1] == smallBoard[curBoard][2][0] && smallBoard[curBoard][2][0] == "o") {
    return "o";
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 1; j < 3; j++) {
      smallBoard[curBoard][i][j] = "";
    }
  }
  return "draw";
}

function checkForLargeWinner() {
  // rows
  if (bigBoard[0][0] == bigBoard[0][1] && bigBoard[0][1] == bigBoard[0][2] && bigBoard[0][2] == "x") {
    return "x";
  } else if (bigBoard[0][0] == bigBoard[0][1] && bigBoard[0][1] == bigBoard[0][2] && bigBoard[0][2] == "o") {
    return "o";
  }
  if (bigBoard[1][0] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[1][2] && bigBoard[1][2] == "x") {
    return "x";
  } else if (bigBoard[1][0] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[1][2] && bigBoard[1][2] == "o") {
    return "o";
  }
  if (bigBoard[2][0] == bigBoard[2][1] && bigBoard[2][1] == bigBoard[2][2] && bigBoard[2][2] == "x") {
    return "x";
  } else if (bigBoard[2][0] == bigBoard[2][1] && bigBoard[2][1] == bigBoard[2][2] && bigBoard[2][2] == "o") {
    return "o";
  }
  // columns
  if (bigBoard[0][0] == bigBoard[1][0] && bigBoard[1][0] == bigBoard[2][0] && bigBoard[2][0] == "x") {
    return "x";
  } else if (bigBoard[0][0] == bigBoard[1][0] && bigBoard[1][0] == bigBoard[2][0] && bigBoard[2][0] == "o") {
    return "o";
  }
  if (bigBoard[0][1] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[2][1] && bigBoard[2][1] == "x") {
    return "x";
  } else if (bigBoard[0][1] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[2][1] && bigBoard[2][1] == "o") {
    return "o";
  }
  if (bigBoard[0][2] == bigBoard[1][2] && bigBoard[1][2] == bigBoard[2][2] && bigBoard[2][2] == "x") {
    return "x";
  } else if (bigBoard[0][2] == bigBoard[1][2] && bigBoard[1][2] == bigBoard[2][2] && bigBoard[2][2] == "o") {
    return "o";
  }
  // diagonals
  if (bigBoard[0][0] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[2][2] && bigBoard[2][2] == "x") {
    return "x";
  } else if (bigBoard[0][0] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[2][2] && bigBoard[2][2] == "o") {
    return "o";
  }
  if (bigBoard[0][2] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[2][0] && bigBoard[2][0] == "x") {
    return "x";
  } else if (bigBoard[0][2] == bigBoard[1][1] && bigBoard[1][1] == bigBoard[2][0] && bigBoard[2][0] == "o") {
    return "o";
  }

  return "draw";
}

onInput("w", () => {
  if (!gameover) {
    getFirst(player).y -= 1;
  }
});

onInput("a", () => {
  if (!gameover) {
    getFirst(player).x -= 1;
  }
});

onInput("s", () => {
  if (!gameover) {
    getFirst(player).y += 1;
  }
});

onInput("d", () => {
  if (!gameover) {
    getFirst(player).x += 1;
  }
});

onInput("j", () => {
  if (gameover) {
    clearText();
    gameover = false;

    getAll(x).forEach((x) => {
      x.remove();
    });

    getAll(o).forEach((o) => {
      o.remove();
    });

    bigBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    smallBoard = [
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
    ];

    currentBoard = 4;
    turn = true;
  } else {
    let curPosition = [getFirst(player).x, getFirst(player).y];

    if (getTile(curPosition[0], curPosition[1]).length > 1) {
      return;
    }

    let xLocToPut = 0;
    let yLocToPut = 0;
    if (currentBoard == 0) {
      xLocToPut = curPosition[0];
      yLocToPut = curPosition[1];
    } else if (currentBoard == 1) {
      xLocToPut = curPosition[0] - 4;
      yLocToPut = curPosition[1];
    } else if (currentBoard == 2) {
      xLocToPut = curPosition[0] - 8;
      yLocToPut = curPosition[1];
    } else if (currentBoard == 3) {
      xLocToPut = curPosition[0];
      yLocToPut = curPosition[1] - 4;
    } else if (currentBoard == 4) {
      xLocToPut = curPosition[0] - 4;
      yLocToPut = curPosition[1] - 4;
    } else if (currentBoard == 5) {
      xLocToPut = curPosition[0] - 8;
      yLocToPut = curPosition[1] - 4;
    } else if (currentBoard == 6) {
      xLocToPut = curPosition[0];
      yLocToPut = curPosition[1] - 8;
    } else if (currentBoard == 7) {
      xLocToPut = curPosition[0] - 4;
      yLocToPut = curPosition[1] - 8;
    } else if (currentBoard == 8) {
      xLocToPut = curPosition[0] - 8;
      yLocToPut = curPosition[1] - 8;
    }

    if (turn) {
      addSprite(curPosition[0], curPosition[1], x);
      smallBoard[currentBoard][yLocToPut][xLocToPut] = "x";
    } else {
      addSprite(curPosition[0], curPosition[1], o);
      smallBoard[currentBoard][yLocToPut][xLocToPut] = "o";
    }

    // check for small board winner
    if (checkForSmallWinner(currentBoard) == "x") {
      if (currentBoard == 0) {
        bigBoard[0][0] = "x";
      } else if (currentBoard == 1) {
        bigBoard[0][1] = "x";
      } else if (currentBoard == 2) {
        bigBoard[0][2] = "x";
      } else if (currentBoard == 3) {
        bigBoard[1][0] = "x";
      } else if (currentBoard == 4) {
        bigBoard[1][1] = "x";
      } else if (currentBoard == 5) {
        bigBoard[1][2] = "x";
      } else if (currentBoard == 6) {
        bigBoard[2][0] = "x";
      } else if (currentBoard == 7) {
        bigBoard[2][1] = "x";
      } else if (currentBoard == 8) {
        bigBoard[2][2] = "x";
      }

      if (checkForLargeWinner == "x") {
        gameFinished("x");
      } else if (checkForLargeWinner == "o") {
        gameFinished("o");
      }
    } else if (checkForSmallWinner(currentBoard) == "o") {
      if (currentBoard == 0) {
        bigBoard[0][0] = "o";
      } else if (currentBoard == 1) {
        bigBoard[0][1] = "o";
      } else if (currentBoard == 2) {
        bigBoard[0][2] = "o";
      } else if (currentBoard == 3) {
        bigBoard[1][0] = "o";
      } else if (currentBoard == 4) {
        bigBoard[1][1] = "o";
      } else if (currentBoard == 5) {
        bigBoard[1][2] = "o";
      } else if (currentBoard == 6) {
        bigBoard[2][0] = "o";
      } else if (currentBoard == 7) {
        bigBoard[2][1] = "o";
      } else if (currentBoard == 8) {
        bigBoard[2][2] = "o";
      }

      if (checkForLargeWinner == "x") {
        gameFinished("x");
      } else if (checkForLargeWinner == "o") {
        gameFinished("o");
      }
    }

    if (turn) {
      turn = false;
    } else {
      turn = true;
    }

    if (yLocToPut == 0) {
      if (xLocToPut == 0) {
        currentBoard = 0;
        // move sprite
        getFirst(player).x = 1;
        getFirst(player).y = 1;
      } else if (xLocToPut == 1) {
        currentBoard = 1;
        getFirst(player).x = 5;
        getFirst(player).y = 1;
      } else if (xLocToPut == 2) {
        currentBoard = 2;
        getFirst(player).x = 9;
        getFirst(player).y = 1;
      }
    } else if (yLocToPut == 1) {
      if (xLocToPut == 0) {
        currentBoard = 3;
        // move sprite
        getFirst(player).x = 1;
        getFirst(player).y = 5;
      } else if (xLocToPut == 1) {
        currentBoard = 4;
        getFirst(player).x = 5;
        getFirst(player).y = 5;
      } else if (xLocToPut == 2) {
        currentBoard = 5;
        getFirst(player).x = 9;
        getFirst(player).y = 5;
      }
    } else if (yLocToPut == 2) {
      if (xLocToPut == 0) {
        currentBoard = 6;
        // move sprite
        getFirst(player).x = 1;
        getFirst(player).y = 9;
      } else if (xLocToPut == 1) {
        currentBoard = 7;
        getFirst(player).x = 5;
        getFirst(player).y = 9;
      } else if (xLocToPut == 2) {
        currentBoard = 8;
        getFirst(player).x = 9;
        getFirst(player).y = 9;
      }
    }

  }
});