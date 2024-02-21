import { BoardCell } from "../../../interfaces";

export default function isGameOver(shipBoard: BoardCell[][]): boolean {
  for (const row of shipBoard) {
    if (
      row.some(
        (boardCell) => boardCell === "small" || boardCell === "medium" || boardCell === "large" || boardCell === "huge"
      )
    ) {
      return false;
    }
  }
  return true;
}
