enum MessageType {
  Auth = "reg",
  GameCreation = "create_game",
  RoomCreation = "create_room",
  AddUserToRoom = "add_user_to_room",
  AddShips = "add_ships",
  GameStart = "start_game",
  Turn = "turn",
  Attack = "attack",
  RandomAttack = "randomAttack",
  Finish = "finish",
  RoomUpdate = "update_room",
  WinnersUpdate = "update_winners",
}

export default MessageType;
