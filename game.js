console.log("hello!");

var board = document.querySelector("#board");
var pieceToMove = null;

var boardState = [
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [2,0,2,0,2,0,2,0],
  [0,2,0,2,0,2,0,2],
  [2,0,2,0,2,0,2,0]
];

function drawBoard() {
  console.table(boardState);
  var res = "";
  for(var i=0; i<8; i++) {
    for(var j=0; j<8; j++) {
      var is_green = (i+j)%2 ? "green": "";
      res += `<div class='square ${is_green}'></div>`;
    }
  }
  for(var row in boardState) {
    for(var col in boardState[row]) {
      if(boardState[row][col] !== 0) {
        res += `<span 
          class="piece${boardState[row][col]}"
          style="top:${row*80+15}px;left:${col*80+15}px;"
          data-row="${row}" data-col="${col}">
          </span>`;
      }
    }
  }
  board.innerHTML = res + `<div id="ghost-div"></div>`;
  setPlayerToMove();
}

function spawnGhosts(e) {
  var ghostDiv = document.querySelector("#ghost-div");
  var moves = calculateAvailableMoves(
    parseInt(e.target.dataset.row), 
    parseInt(e.target.dataset.col)
  );
  // show me your moves
  var res = "";
  for(var move of moves) {
    var {row, col} = move;
    res += `<span 
      class="ghost"
      style="top:${row*80+15}px;left:${col*80+15}px;"
      data-row="${row}" data-col="${col}">
      </span>`;
  }
  ghostDiv.innerHTML += res;
}

function bustGhosts(e) {
  document.querySelectorAll(".ghost").forEach(p => p.remove());
}

function procedeToMove(e) {
  pieceToMove = e.target;
  var ghosts = document.querySelectorAll(".ghost");
  // TODO - fancy logic to make sure a move is possible
  var pieces = document.querySelectorAll(".piece1");
  pieces.forEach(p => p.classList.add("clickable"));
  for(var piece of pieces) {
    piece.classList.add("clickable");
    piece.removeEventListener("mouseenter", spawnGhosts);
    piece.removeEventListener("mouseleave", bustGhosts);
    piece.removeEventListener("click", procedeToMove);
  }
  for(var ghost of ghosts) {
    ghost.addEventListener("click", function(e) {
      var r1 = parseInt(e.target.dataset.row);
      var c1 = parseInt(e.target.dataset.col);
      var r2 = parseInt(pieceToMove.dataset.row);
      var c2 = parseInt(pieceToMove.dataset.col);
      boardState[r1][c1] = 1;
      boardState[r2][c2] = 0;
      drawBoard();
    });
  }
}

function setPlayerToMove(player) {
  var pieces = document.querySelectorAll(".piece1");
  pieces.forEach(p => p.classList.add("clickable"));
  for(var piece of pieces) {
    piece.classList.add("clickable");
    piece.addEventListener("mouseenter", spawnGhosts);
    piece.addEventListener("mouseleave", bustGhosts);
    piece.addEventListener("click", procedeToMove);
  }
}

function calculateAvailableMoves(row, col) {
  var possibleSquares = [];
  // 1 pieces can only move down
  var targetRow = row + 1;
  var possibleCol1 = col - 1;
  var possibleCol2 = col + 1;

  if(boardState[targetRow][possibleCol1] === 0) {
    possibleSquares.push({row: targetRow, col: possibleCol1});
  }
  if(boardState[targetRow][possibleCol2] === 0) {
    possibleSquares.push({row: targetRow, col: possibleCol2});
  }

  // 2 pieces can only move up


  return possibleSquares;
}


drawBoard();