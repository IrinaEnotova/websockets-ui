import { IMessage, ClientWebSocket } from "../../../interfaces";
import createPlayer from "../../../inMemoryDB/utils/createPlayer";

export default function signUp(message: IMessage, ws: ClientWebSocket) {
  console.log("sign up");

  const { name, password } = JSON.parse(message.data);

  if (name.trim().length < 5 || password.trim().length < 5) {
    const res = {
      type: "reg",
      data: JSON.stringify({
        error: true,
        errorText: "Name and password should has minimum 5 characters length",
      }),
      id: 0,
    };

    ws.send(JSON.stringify(res));
  } else {
    const res = createPlayer(name, password, ws);

    ws.send(JSON.stringify(res));
  }
}
