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

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for (let i = 0; i < HEIGHT; i++) {
    let row = []
    for (let i = 0; i < WIDTH; i++) {
      row.push(null)
    }
    board.push(row)
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board")
  // TODO: add comment for this code
  let top = document.createElement("tr");
  // ^ create new table row element and set the name to top
  top.setAttribute("id", "column-top");
  // ^set the ID of the newly created "top" to be "column-top"
  top.addEventListener("click", handleClick);
  // ^ add an event listener to every newly created top and assign is the function of
  //handleClick

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    // ^ create new individual cells (where data can be inserted)
    headCell.setAttribute("id", x);
    //^ set the ID attribute to variable x
    top.append(headCell);
    // ^ append headCell to the table row "top"
  }
  htmlBoard.append(top);
  //^ once the table row with all its cells are created, append it all to the hmtl board

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    //this for loop creates 7 table row elements
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
      //^ every time a table row is create, 6 table data cells are created,
      //give an id of string literals (based of x and y axis that were
      // used in both for loops) and appended to row
    }
    htmlBoard.append(row);
    //append every newly created row with all of its td to the htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {

  for (let y = board.length - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return [y]
    }
  }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div')
  piece.setAttribute('class', 'piece')
  piece.classList.add(`player${currPlayer}`)


  const chosenPlace = document.getElementById(`${y}-${x}`)
  console.log(chosenPlace)

  chosenPlace.append(piece)


  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;


  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win


  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  for (let row of board) {
    if (row.every((value) => value == true)) {
      return endGame("It's a tie!")
    }
  }
  // TODO: check if all cells in board are filled; if so call, call endGame
  const allBoardCells = document.getElementsByClassName('allBoardCells')


  // switch players
  // TODO: switch currPlayer 1 <-> 2

  currPlayer == 1 ? currPlayer = 2 : currPlayer = 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        //for every [y,x] coordinate as defined in the 2 for loops below
        y >= 0 &&
        // make sure it doesn't go outside the board
        y < HEIGHT &&
        //make sure it doesn't go outside the board
        x >= 0 &&
        //make sure it doesn't go outside the board
        x < WIDTH &&
        //make sure it doesn't go outside the board
        board[y][x] === currPlayer
      //if all 4 piece (horiz, vert, diagDR, diagDL) are the currPlayer
    );
  }

  // Below we are creating the "cells" parameter for _win
  for (let y = 0; y < HEIGHT; y++) {
    //^from 0 to 6 on the y axis
    for (let x = 0; x < WIDTH; x++) {
      //^ from 0 to 7 on the x axis
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //horiz is 4 consecutive positions the the same y axis
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //vert is 4 consecutive positions on the same x axis
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //diagonal right      
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //diagonal left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        //if any of these return are true, return true
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
