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
