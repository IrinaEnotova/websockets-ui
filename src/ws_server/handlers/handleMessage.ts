import MessageType from "../../enums/message.enum";
import isPlayerExist from "../../inMemoryDB/utils/isPlayerExist";
import { IMessage, ClientWebSocket } from "../../interfaces";
import createGame from "./game/createGame";
import addUserToRoom from "./room/addUserToRoom";
import createRoom from "./room/createRoom";
import updateRoom from "./room/updateRoom";
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
      updateRoom();
      break;
    case MessageType.RoomCreation:
      createRoom(ws);
      break;
    case MessageType.AddUserToRoom:
      addUserToRoom(message, ws);
      createGame(message);
      break;
  }
};

export default handleMessage;
