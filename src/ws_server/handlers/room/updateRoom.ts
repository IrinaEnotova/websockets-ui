import { clients, rooms } from "../../../inMemoryDB";

export default function updateRoom() {
  const room = rooms.filter((item) => item.roomUsers.length === 1);

  const updatedRoom = JSON.stringify(room);

  const res = {
    type: "update_room",
    data: updatedRoom,
    id: 0,
  };

  clients.forEach((clientWebSocket) => clientWebSocket.send(JSON.stringify(res)));
}
