import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import getColorizedLog from "../utils/getColorizedLog";
import LogStatus from "../enums/log.enum";
import handleMessage from "./handlers/handleMessage";

dotenv.config();

const port = parseInt(process.env.PORT!) || 3000;

const wss = new WebSocketServer({ port });

wss.on("connection", (ws: WebSocket) => {
  getColorizedLog(`WebSocket server is listening on the ${port} port!`, LogStatus.Info);

  ws.on("message", (message: string) => {
    const data = JSON.parse(message);
    handleMessage(data, ws);
  });

  ws.on("close", () => {
    getColorizedLog("Client disconnected", "warn");
  });
});
