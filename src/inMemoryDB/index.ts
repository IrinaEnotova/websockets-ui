import { ClientWebSocket, IPlayer, IRoom } from "../interfaces";

export const players: IPlayer[] = [];
export const clients: ClientWebSocket[] = [];
export let rooms: IRoom[] = [];

export function setRooms(newRooms: IRoom[]) {
  rooms = newRooms;
}
