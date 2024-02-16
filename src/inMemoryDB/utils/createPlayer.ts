import crypto from "crypto";
import { clients, players } from "..";
import MessageType from "../../enums/message.enum";
import { ClientWebSocket, IPlayer } from "../../interfaces";

export default function createPlayer(name: string, password: string, ws: ClientWebSocket) {
  const newId = crypto.randomUUID();
  const newPlayer: IPlayer = {
    name,
    password,
    id: newId,
  };

  ws.index = newId;
  clients.push(ws);
  players.push(newPlayer);

  return {
    type: MessageType.Auth,
    data: JSON.stringify({
      name,
      index: newId,
      error: false,
      errorText: "",
    }),
  };
}
