import { players } from "..";
import { IMessage, IPlayer } from "../../interfaces";

export default function isPlayerExist(message: IMessage) {
  const { name }: IPlayer = JSON.parse(message.data);
  return players.some((player: IPlayer) => player.name === name);
}
