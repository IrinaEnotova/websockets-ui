import MessageType from "../../enums/message.enum";
import isPlayerExist from "../../inMemoryDB/utils/isPlayerExist";
import { IMessage } from "../../interfaces";
import signIn from "./signIn";
import signUp from "./signUp";
import { WebSocket } from "ws";

const handleMessage = (message: IMessage, ws: WebSocket) => {
  console.log(message);

  switch (message.type) {
    case MessageType.Auth:
      if (isPlayerExist(message)) {
        signIn(message, ws);
      } else {
        signUp(message, ws);
      }
      break;
  }
};

export default handleMessage;
