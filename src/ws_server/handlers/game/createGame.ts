import { clients, rooms } from "../../../inMemoryDB";
import { GameData, IMessage } from "../../../interfaces";

export default function createGame(message: IMessage) {
  const { indexRoom } = JSON.parse(message.data);
  const currentRoom = rooms.find((room) => room.roomId === indexRoom);
  const firstPlayer = currentRoom?.roomUsers.find((player) => player.index === indexRoom);
  const secondPlayer = currentRoom?.roomUsers.find((player) => player.index !== indexRoom);

  if (firstPlayer && secondPlayer) {
    const firstGameData: GameData = { idGame: indexRoom, idPlayer: firstPlayer.index };
    const secondGameData: GameData = { idGame: indexRoom, idPlayer: secondPlayer.index };

    const firstRes = {
      type: "create_game",
      data: JSON.stringify(firstGameData),
      id: 0,
    };
    const secondRes = {
      type: "create_game",
      data: JSON.stringify(secondGameData),
      id: 0,
    };

    const firstClient = clients.find((wsClient) => wsClient.index === firstPlayer.index);
    const secondClient = clients.find((wsClient) => wsClient.index === secondPlayer.index);

    firstClient?.send(JSON.stringify(firstRes));
    secondClient?.send(JSON.stringify(secondRes));
  }
}
