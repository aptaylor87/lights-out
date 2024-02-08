import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++){
      let innerArray = [];
      for (let j = 0; j < ncols; j++) {
        innerArray.push(Math.random() < chanceLightStartsOn ? true : false);
      }
      initialBoard.push(innerArray)
    }
    console.log(initialBoard)
    return initialBoard;
  }


  function hasWon(array) {
    for (let i = 0; i < array.length; i++) {
      const subArray = array[i];
      for (let j = 0; j < subArray.length; j++) {
        if (subArray[j] === true) {
          return false; // If 'true' is found, return false
        }
      }
    }
    return true; // If no 'true' is found in any nested arrays, return true
  }

  function flipCellsAroundMe(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = JSON.parse(JSON.stringify(board))
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        const neighbors = [
          [y, x],       // current cell
          [y - 1, x],   // cell above
          [y + 1, x],   // cell below
          [y, x - 1],   // cell to the left
          [y, x + 1],   // cell to the right
        ];
        neighbors.forEach(([ny, nx]) => {
          if (nx >= 0 && nx < ncols && ny >= 0 && ny < nrows) {
            boardCopy[ny][nx] = !boardCopy[ny][nx];
          }
        });
      };

      flipCell(y,x, boardCopy)

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
      return boardCopy
    });
  }
  
  if (hasWon(board)) {
    return <div className="Board">
      <h1>You have won!</h1>
    </div>
  } else {
    return (
    <table className="Board">
    <tbody>
    {board.map((row, y) => (
      <tr key={y}>
        {row.map((c, x) => (
          <Cell key={`${y}-${x}`} flipCellsAroundMe={flipCellsAroundMe} coord={`${y}-${x}`} isLit={c} />
        ))}
      </tr>
    ))}
    </tbody>
  </table>
    )
  }
    // if the game is won, just show a winning msg & render nothing else
  
  // TODO

  // make table board

  // TODO
  <table className="Board">
    <tbody>
    {board.map((row, y) => (
      <tr key={y}>
        {row.map((c, x) => (
          <Cell key={`${y}-${x}`} flipCellsAroundMe={flipCellsAroundMe} coord={`${y}-${x}`} isLit={c} />
        ))}
      </tr>
    ))}
    </tbody>
  </table>
  
  
}

Board.defaultProps = {
  nrows: 5,
  ncols: 5,
  chanceLightStartsOn: .25
}

export default Board;
