import AttackStatus from "../../../enums/attackStatus.enum";
import { BoardCell } from "../../../interfaces";

export default function markMissed(ships: BoardCell[][], x: number, y: number) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10 && ships[ny][nx] !== AttackStatus.Killed) {
      ships[ny][nx] = AttackStatus.Miss;
    }
  }
}
