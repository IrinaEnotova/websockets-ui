import LogStatus from "../../../enums/log.enum";
import { players, rooms } from "../../../inMemoryDB";
import { ClientWebSocket } from "../../../interfaces";
import getColorizedLog from "../../../utils/getColorizedLog";
import updateRoom from "./updateRoom";

export default function createRoom(ws: ClientWebSocket) {
  if (rooms.find((room) => room.roomId === ws.index)) return;
  const roomCreator = players.find((player) => player.id === ws.index);

  if (roomCreator) {
    const room = {
      roomId: roomCreator.id,
      roomUsers: [
        {
          name: roomCreator.name,
          index: roomCreator.id,
        },
      ],
    };

    rooms.push(room);

    updateRoom();
  } else {
    const res = {
      type: "create_room",
      data: JSON.stringify({
        error: true,
        errorText: "Room creation is failed!",
      }),
      id: 0,
    };
    getColorizedLog("Room creation is failed!", LogStatus.Error);

    ws.send(JSON.stringify(res));
    return;
  }
}
