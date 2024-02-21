import { gameBoards } from "../../../inMemoryDB";
import { BoardCell, IGameBoard, IMessage, IShip } from "../../../interfaces";
import startGame from "./startGame";

export default function addShips(message: IMessage) {
  const boardData = JSON.parse(message.data);
  const ships: IShip[] = boardData.ships;

  const board: BoardCell[][] = Array.from({ length: 10 }, () => Array(10).fill("empty"));

  ships.forEach((ship) => {
    const { direction, length } = ship;
    const { x, y } = ship.position;

    for (let i = 0; i < length; i += 1) {
      const cellX = direction ? x : x + i;
      const cellY = direction ? y + i : y;

      board[cellY][cellX] = ship.type;
    }
  });

  const currentGameBoard: IGameBoard = {
    currentGameId: boardData.gameId,
    ships: board,
    indexPlayer: boardData.indexPlayer,
    turn: false,
  };

  gameBoards.push(currentGameBoard);

  const currentGameData = gameBoards.filter((gameBoard) => gameBoard.currentGameId === currentGameBoard.currentGameId);

  if (gameBoards.length === 2) {
    startGame(currentGameData);
  }
}
