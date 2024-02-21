import MessageType from "../../../enums/message.enum";
import { clients } from "../../../inMemoryDB";
import { IGameBoard } from "../../../interfaces";
import giveTurn from "./giveTurn";

export default function startGame(gameData: IGameBoard[]) {
  const firstPlayer = gameData.find((data) => data.indexPlayer === data.currentGameId);
  const secondPlayer = gameData.find((data) => data.indexPlayer !== data.currentGameId);

  if (firstPlayer && secondPlayer) {
    const firstRes = {
      type: MessageType.GameStart,
      data: JSON.stringify({ ships: firstPlayer.ships, currentPlayerIndex: firstPlayer.indexPlayer }),
      id: 0,
    };
    const secondRes = {
      type: MessageType.GameStart,
      data: JSON.stringify({ ships: secondPlayer.ships, currentPlayerIndex: secondPlayer.indexPlayer }),
      id: 0,
    };
    const firstClient = clients.find((client) => client.index === firstPlayer.indexPlayer);
    const secondClient = clients.find((client) => client.index === secondPlayer.indexPlayer);

    if (firstClient && secondClient) {
      firstClient.send(JSON.stringify(firstRes));
      secondClient.send(JSON.stringify(secondRes));

      firstPlayer.turn = true;
      giveTurn(firstClient, secondClient, firstClient.index!);
    }
  }
}
