import { ClientWebSocket, IGameBoard, IPlayer, IRoom, IWinner } from "../interfaces";

export let players: IPlayer[] = [];
export const clients: ClientWebSocket[] = [];
export let rooms: IRoom[] = [];
export let gameBoards: IGameBoard[] = [];
export let winners: IWinner[] = [];

export function setRooms(newRooms: IRoom[]) {
  rooms = newRooms;
}

export function setGameBoards(newGameBoards: IGameBoard[]) {
  gameBoards = newGameBoards;
}

export function setPlayers(newPlayers: IPlayer[]) {
  players = newPlayers;
}

export function setWinners(newWinners: IWinner[]) {
  winners = newWinners;
}
