// Step 1 completed
// Step 2 changed var to let/const, look into using arrow functions, destructuring, sets/maps, rest/spread, object enhancements
// Step 3 completed
// Step 4 completed
// Step 5 completed
// Step 6 completed
// Step 7 completed
// Step 8 Congratulations. Have a relaxing day.

// Optional
// Step 9 completed
// Step 10 copmleted


/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

function makeBoard() { // creates in-memory board to track board movements
  for(let y = 0; y < HEIGHT; y++){
    board.push([])
    for(let x = 0; x < WIDTH; x++){
      board[y].push(null)
    }
  }
}

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  const top = document.createElement("tr"); // create top row of board 
  top.setAttribute("id", "column-top"); // add attributes to top row
  top.addEventListener("click", handleClick); // add 'click' listener to top row of board
  for (var x = 0; x < WIDTH; x++) { // loop creates a row of cells for the top row of game controls
    const headCell = document.createElement("td"); //creates individual game control cell
    headCell.setAttribute("id", x); // add attributes to each game control cell
    top.append(headCell); // add the game control cell to the game control row
  }
  htmlBoard.append(top); // add the game control row to the gameboard
  for (var y = 0; y < HEIGHT; y++) { //loop creates as many rows as needed to complete the gameboard
    const row = document.createElement("tr"); // create gameplay row
    for (var x = 0; x < WIDTH; x++) { // loop creates gameplay cells for gameplay row
      const cell = document.createElement("td"); // creates individual gameplay cell
      cell.setAttribute("id", `${y}-${x}`); // add attributes for gameplay cell
      row.append(cell); // add gameplay cell to gameplay row
    }
    htmlBoard.append(row); // add gameplay row to board
  }
}

function placeInTable(y, x) {
  const piece = document.createElement("div")
  if(currPlayer === 1){
    piece.classList.add('piece', 'p1')
  } else {
    piece.classList.add('piece', 'p2')
  }
  const place = document.getElementById(`${y}-${x}`);
  place.append(piece)
}

/** endGame: announce game end */
function endGame(msg) {
  alert(msg);
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for(let y = HEIGHT-1; y >= 0; y--){
    if(board[y][x] === null){
      return y;
    }
  }
  return null;
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if(board.every(arr => arr.every(cell => cell === typeof Array))){
    return endGame(`This game is a tie.`);
  }

  // switch players
  (currPlayer === 1) ? currPlayer = 2 : currPlayer = 1; // switch players
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  for (let y = 0; y < HEIGHT; y++) { // loops through columns
    for (let x = 0; x < WIDTH; x++) { // loops through rows
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // coordinates assigned to this constant will check for a horizontal win
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // coordinates assigned to this constant will check for a vertical win
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // coordinates assigned to this constant will check for a diagonal win moving to the right
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // coordinates assigned to this constant will check for a diagonal win moving to the left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if any of the coordinates pass _win(), then the game is over.
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
