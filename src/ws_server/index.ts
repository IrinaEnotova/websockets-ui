import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT!) || 3000;

const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  ws.on("message", (data) => console.log(`Received message from client: ${data}`));

  ws.on("close", () => {
    console.log("A client disconnected");
  });
});

console.log(`WS is listening at ${port}`);
