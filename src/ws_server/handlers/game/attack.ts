import AttackStatus from "../../../enums/attackStatus.enum";
import MessageType from "../../../enums/message.enum";
import { clients, gameBoards, rooms, setGameBoards, setRooms } from "../../../inMemoryDB";
import createRandomCoords from "../../../utils/createRandomCoords";
import { BoardCell, Coords, IMessage } from "./../../../interfaces/index";
import isShipKilled from "./isShipKilled";
import giveTurn from "./giveTurn";
import isGameOver from "./isGameOver";
import markMissed from "./markMissed";
import updateWinnerTable from "../winners/updateWinnerTable";

export default function attack(message: IMessage, isRandom: boolean) {
  const attackData = JSON.parse(message.data);
  const currentGameBoards = gameBoards.filter((board) => board.currentGameId === attackData.gameId);
  const enemyBoard = currentGameBoards.find((board) => board.indexPlayer !== attackData.indexPlayer);

  if (enemyBoard?.turn) return;

  if (enemyBoard) {
    const enemyShips = enemyBoard?.ships.map((rows) => [...rows]);
    const coords = !isRandom ? { x: attackData.x, y: attackData.y } : createRandomCoords(enemyShips);
    const { status, currentShips } = checkAttack(enemyShips, coords);

    setGameBoards(
      gameBoards.map((item) =>
        item.indexPlayer === enemyBoard.indexPlayer ? { ...item, ships: currentShips as BoardCell[][] } : item
      )
    );

    const firstClient = clients.find((item) => item.index === attackData.indexPlayer);
    const secondClient = clients.find((item) => item.index === enemyBoard.indexPlayer);

    switch (status) {
      case AttackStatus.TryAgain:
        const cell = currentShips[attackData.y][attackData.x];

        const resRerty: IMessage = {
          type: MessageType.Attack,
          data: JSON.stringify({
            position: coords,
            currentPlayer: attackData.indexPlayer,
            status: cell,
          }),
          id: 0,
        };

        firstClient?.send(JSON.stringify(resRerty));
        secondClient?.send(JSON.stringify(resRerty));
        giveTurn(firstClient!, secondClient!, attackData.indexPlayer);
        break;
      case AttackStatus.Shot:
        const resShot: IMessage = {
          type: MessageType.Attack,
          data: JSON.stringify({
            position: coords,
            currentPlayer: attackData.indexPlayer,
            status: status,
          }),
          id: 0,
        };

        firstClient?.send(JSON.stringify(resShot));
        secondClient?.send(JSON.stringify(resShot));
        giveTurn(firstClient!, secondClient!, attackData.indexPlayer);
        break;
      case AttackStatus.Killed:
        const updatedCoordinates: { x: number; y: number; status: BoardCell }[] = [];
        currentShips.forEach((_, idx) => {
          for (let x = 0; x < currentShips[idx].length; x += 1) {
            if (enemyShips[idx][x] !== currentShips[idx][x]) {
              updatedCoordinates.push({ x, y: idx, status: currentShips[idx][x] });
            }
          }
        });

        for (let i = 0; i < updatedCoordinates.length; i++) {
          const coord = updatedCoordinates[i];
          const resKilled: IMessage = {
            type: MessageType.Attack,
            data: JSON.stringify({
              position: {
                x: coord.x,
                y: coord.y,
              },
              currentPlayer: attackData.indexPlayer,
              status: coord.status,
            }),
            id: 0,
          };

          firstClient?.send(JSON.stringify(resKilled));
          secondClient?.send(JSON.stringify(resKilled));
        }

        const gameOver = isGameOver(currentShips);
        if (gameOver) {
          const resGameOver = {
            type: MessageType.Finish,
            data: JSON.stringify({
              winPlayer: attackData.indexPlayer,
            }),
            id: 0,
          };

          firstClient?.send(JSON.stringify(resGameOver));
          secondClient?.send(JSON.stringify(resGameOver));

          updateWinnerTable(attackData.indexPlayer);
          setGameBoards(gameBoards.filter((game) => game.currentGameId !== attackData.gameId));
          setRooms(rooms.filter((room) => room.roomId !== attackData.gameId));

          return;
        } else {
          giveTurn(firstClient!, secondClient!, attackData.indexPlayer);
        }
        break;
      default:
        setGameBoards(
          gameBoards.map((game) => {
            if (game.indexPlayer === attackData.indexPlayer) {
              return { ...game, turn: false };
            } else if (game.indexPlayer === enemyBoard.indexPlayer) {
              return { ...game, turn: true };
            }

            return game;
          })
        );

        const res = {
          type: MessageType.Attack,
          data: JSON.stringify({
            position: coords,
            currentPlayer: attackData.indexPlayer,
            status: status,
          }),
          id: 0,
        };

        firstClient?.send(JSON.stringify(res));
        secondClient?.send(JSON.stringify(res));
        giveTurn(firstClient!, secondClient!, enemyBoard.indexPlayer);
        break;
    }
  }
}

function checkAttack(enemyShips: BoardCell[][], coords: Coords) {
  const { x, y } = coords;

  const currentShips = enemyShips.map((rows) => [...rows]);

  if (currentShips[y][x] === "miss" || currentShips[y][x] === "shot" || currentShips[y][x] === "killed") {
    return { status: AttackStatus.TryAgain, currentShips };
  } else if (currentShips[y][x] === "small") {
    currentShips[y][x] = "killed";
    markMissed(currentShips, x, y);
    return { status: AttackStatus.Killed, currentShips };
  } else if (currentShips[y][x] === "medium") {
    const { isKilled, updatedBoard } = isShipKilled(currentShips, x, y, 1);

    if (isKilled) {
      return { status: AttackStatus.Killed, currentShips: updatedBoard };
    } else {
      currentShips[y][x] = "shot";

      return { status: AttackStatus.Shot, currentShips };
    }
  } else if (currentShips[y][x] === "large") {
    const { isKilled, updatedBoard } = isShipKilled(currentShips, x, y, 2);

    if (isKilled) {
      return { status: AttackStatus.Killed, currentShips: updatedBoard };
    } else {
      currentShips[y][x] = "shot";

      return { status: AttackStatus.Shot, currentShips };
    }
  } else if (currentShips[y][x] === "huge") {
    const { isKilled, updatedBoard } = isShipKilled(currentShips, x, y, 3);

    if (isKilled) {
      return { status: AttackStatus.Killed, currentShips: updatedBoard };
    } else {
      currentShips[y][x] = "shot";

      return { status: AttackStatus.Shot, currentShips };
    }
  } else {
    currentShips[y][x] = "miss";

    return { status: AttackStatus.Miss, currentShips };
  }
}
