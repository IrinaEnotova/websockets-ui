import MessageType from "../../enums/message.enum";
import isPlayerExist from "../../inMemoryDB/utils/isPlayerExist";
import { IMessage, ClientWebSocket } from "../../interfaces";
import createRoom from "./room/createRoom";
import signIn from "./user/signIn";
import signUp from "./user/signUp";

const handleMessage = (message: IMessage, ws: ClientWebSocket) => {
  console.log(message);

  switch (message.type) {
    case MessageType.Auth:
      if (isPlayerExist(message)) {
        signIn(message, ws);
      } else {
        signUp(message, ws);
      }
      break;
    case MessageType.RoomCreation:
      createRoom(ws);
      break;
  }
};

export default handleMessage;
