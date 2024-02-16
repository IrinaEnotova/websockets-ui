import { WebSocket } from "ws";

export interface IMessage {
  type: string;
  data: string;
  id: number;
}

export interface IPlayer {
  name: string;
  password: string;
  id: string;
}

export interface ClientWebSocket extends WebSocket {
  index?: string;
}

export interface IRoom {
  roomId: string;
  roomUsers: {
    name: string;
    index: string;
  }[];
}

export interface GameData {
  idGame: string;
  idPlayer: string;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IShip {
  position: IPosition;
  direction: boolean;
  type: "huge" | "large" | "medium" | "small";
  length: number;
}

export type BoardCell = "empty" | "huge" | "large" | "medium" | "small";

export interface IGameBoard {
  currentGameId: string;
  ships: BoardCell[][];
  indexPlayer: string;
  turn: boolean;
}
