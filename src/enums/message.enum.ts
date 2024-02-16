enum MessageType {
  Auth = "reg",
  GameCreation = "create_game",
  RoomCreation = "create_room",
  AddUserToRoom = "add_user_to_room",
  GameStart = "start_game",
  Turn = "turn",
  Attack = "attack",
  Finish = "finish",
  RoomUpdate = "update_room",
  WinnersUpdate = "update_winners",
}

export default MessageType;
