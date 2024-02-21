import { IMessage, ClientWebSocket } from "../../../interfaces";
import { clients, players } from "../../../inMemoryDB";
import getColorizedLog from "../../../utils/getColorizedLog";
import LogStatus from "../../../enums/log.enum";
import MessageType from "../../../enums/message.enum";

export default function signIn(message: IMessage, ws: ClientWebSocket) {
  console.log("sign in");

  const { name, password } = JSON.parse(message.data);

  const currentPlayer = players.find((player) => {
    return player.name === name && player.password === password;
  });

  if (currentPlayer) {
    const id = currentPlayer.id;
    const res = {
      type: MessageType.Auth,
      data: JSON.stringify({
        name: name,
        index: id,
        error: false,
        errorText: "",
      }),
      id: 0,
    };

    ws.index = currentPlayer.id;
    clients.push(ws);

    ws.send(JSON.stringify(res));
  } else {
    const res = {
      type: MessageType.Auth,
      data: JSON.stringify({
        error: true,
        errorText: "Invalid password",
      }),
      id: 0,
    };
    getColorizedLog("Invalid password", LogStatus.Error);

    ws.send(JSON.stringify(res));
    return;
  }
}
