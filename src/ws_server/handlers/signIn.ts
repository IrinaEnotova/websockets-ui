import { WebSocket } from "ws";
import { IMessage } from "../../interfaces";
import { players } from "../../inMemoryDB";
import getColorizedLog from "../../utils/getColorizedLog";
import LogStatus from "../../enums/log.enum";

export default function signIn(message: IMessage, ws: WebSocket) {
  console.log("sign in");

  const { name, password, id } = JSON.parse(message.data);

  const currentPlayer = players.find((player) => {
    return player.name === name && player.password === password;
  });

  if (currentPlayer) {
    const res = {
      type: "reg",
      data: JSON.stringify({
        name: name,
        index: id,
        error: false,
        errorText: "",
      }),
      id: 0,
    };

    ws.send(JSON.stringify(res));
  } else {
    const res = {
      type: "reg",
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
