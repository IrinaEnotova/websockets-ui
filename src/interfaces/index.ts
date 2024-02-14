export interface IMessage {
  type: string;
  data: string;
  id: number;
}

export interface IPlayer {
  name: string;
  password: string;
  id?: number;
}
