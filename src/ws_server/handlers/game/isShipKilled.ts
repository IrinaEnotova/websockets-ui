import { BoardCell } from "../../../interfaces/index";
import markMissed from "./markMissed";

export default function isShipKilled(board: BoardCell[][], x: number, y: number, shipSize: number) {
  const updatedBoard = board.map((rows) => [...rows]);

  const rowCount = 10;
  const columnCount = 10;
  let countLeft = 0;
  let countRight = 0;
  let countTop = 0;
  let countBottom = 0;

  for (let i = x - 1; i >= 0; i--) {
    if (board[y][i] === "shot") {
      countLeft++;
    } else if (board[y][i] === "empty" || board[y][i] === "miss") {
      break;
    } else {
      continue;
    }
  }

  for (let i = x + 1; i < columnCount; i++) {
    if (board[y][i] === "shot") {
      countRight++;
    } else if (board[y][i] === "empty" || board[y][i] === "miss") {
      break;
    } else {
      continue;
    }
  }

  for (let i = y - 1; i >= 0; i--) {
    if (board[i][x] === "shot") {
      countTop++;
    } else if (board[i][x] === "empty" || board[i][x] === "miss") {
      break;
    } else {
      continue;
    }
  }

  for (let i = y + 1; i < rowCount; i++) {
    if (board[i][x] === "shot") {
      countBottom++;
    } else if (board[i][x] === "empty" || board[i][x] === "miss") {
      break;
    } else {
      continue;
    }
  }

  if (countLeft + countRight >= shipSize || countTop + countBottom >= shipSize) {
    if (board[y][x] === "large" || board[y][x] === "huge" || board[y][x] === "medium") {
      updatedBoard[y][x] = "killed";
      for (let i = x - countLeft; i <= x + countRight; i++) {
        updatedBoard[y][i] = "killed";

        markMissed(updatedBoard, x - countLeft, y);
        markMissed(updatedBoard, x + countRight, y);
      }

      for (let i = y - countTop; i <= y + countBottom; i++) {
        updatedBoard[i][x] = "killed";

        markMissed(updatedBoard, x, y - countTop);
        markMissed(updatedBoard, x, y + countBottom);
      }

      return { isKilled: true, updatedBoard };
    } else {
      updatedBoard[y][x] = "shot";
      return { isKilled: false, updatedBoard };
    }
  }

  return { isKilled: false, updatedBoard };
}
