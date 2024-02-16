import { players, rooms, setRooms } from "../../../inMemoryDB";
import { ClientWebSocket, IMessage } from "../../../interfaces";
import updateRoom from "./updateRoom";

export default function addUserToRoom(message: IMessage, ws: ClientWebSocket) {
  const { indexRoom } = JSON.parse(message.data);

  const isCreator = indexRoom === ws.index;
  if (isCreator) return;

  const currentPlayer = players.find((player) => player.id === ws.index);
  const currentRoom = rooms.find((room) => room.roomId === indexRoom);

  if (rooms.find((room) => room.roomId === currentPlayer?.id)) {
    setRooms(rooms.filter((room) => room.roomId !== currentPlayer?.id));
  }

  if (currentPlayer && currentRoom) {
    currentRoom.roomUsers.push({ name: currentPlayer.name, index: currentPlayer.id });
  }

  const res = {
    type: "add_user_to_room",
    data: JSON.stringify({
      indexRoom,
    }),
    id: 0,
  };

  ws.send(JSON.stringify(res));
  updateRoom();
}
