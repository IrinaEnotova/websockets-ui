import { clients } from "../../../inMemoryDB";
import { IGameBoard } from "../../../interfaces";
import giveTurn from "./giveTurn";

export default function startGame(gameData: IGameBoard[]) {
  const firstPlayer = gameData.find((data) => data.indexPlayer === data.currentGameId);
  const secondPlayer = gameData.find((data) => data.indexPlayer !== data.currentGameId);

  if (firstPlayer && secondPlayer) {
    const firstRes = {
      type: "start_game",
      data: JSON.stringify({ ships: firstPlayer.ships, currentPlayerIndex: firstPlayer.indexPlayer }),
      id: 0,
    };
    const secondRes = {
      type: "start_game",
      data: JSON.stringify({ ships: secondPlayer.ships, currentPlayerIndex: secondPlayer.indexPlayer }),
      id: 0,
    };
    const firstClient = clients.find((client) => client.index === firstPlayer.indexPlayer);
    const secondClient = clients.find((client) => client.index === secondPlayer.indexPlayer);

    if (firstClient && secondClient) {
      firstClient.send(JSON.stringify(firstRes));
      secondClient.send(JSON.stringify(secondRes));

      giveTurn(firstClient, secondClient, firstClient.index!);
    }
  }
}
