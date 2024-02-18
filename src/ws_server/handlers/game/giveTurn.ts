import { ClientWebSocket } from "../../../interfaces";

export default function giveTurn(firstClient: ClientWebSocket, secondClient: ClientWebSocket, currentPlayerId: string) {
  const res = {
    type: "turn",
    data: JSON.stringify({
      currentPlayer: currentPlayerId,
    }),
    id: 0,
  };

  firstClient.send(JSON.stringify(res));
  secondClient.send(JSON.stringify(res));
}
