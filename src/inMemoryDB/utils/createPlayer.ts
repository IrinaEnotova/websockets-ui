import { players } from "..";
import MessageType from "../../enums/message.enum";
import { IPlayer } from "../../interfaces";

export default function createPlayer(name: string, password: string) {
  const newId = players.length + 1;
  const newPlayer: IPlayer = {
    name,
    password,
    id: newId,
  };

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
