import { BoardCell } from "../interfaces";

export default function createRandomCoords(enemyShips: BoardCell[][]) {
  const excludedValues = ["miss", "killed", "shot"];
  const rows = 10;
  const columns = 10;

  let x, y;
  do {
    x = Math.floor(Math.random() * columns);
    y = Math.floor(Math.random() * rows);
  } while (enemyShips[y][x] !== undefined && excludedValues.includes(enemyShips[y][x]));

  return { x, y };
}
