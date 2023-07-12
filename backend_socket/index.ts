import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./src/app";
import database from "./src/config/database";
import {
  listenerNotificationByInterval,
  stoplistenerNotificationByInterval,
} from "./src/handlers/notifications.handler.ts";

dotenv.config();
const port: number = parseInt(process.env.SOCKET_PORT ?? "6002", 10);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

let isNotificationIntervalRunning = false;

io.on("connection", (socket) => {
  console.info("A user connected", socket.id);

  if (!isNotificationIntervalRunning) {
    listenerNotificationByInterval((tuple) => {
      const [boolValue, notification] = tuple;
      console.info(tuple);
      if (boolValue) {
        io.emit("foo", notification);
      }
    });
    isNotificationIntervalRunning = true;
  }

  socket.on("disconnect", () => {
    console.info("A user disconnected", socket.id);
    if (io.sockets.sockets.size === 0) {
      stoplistenerNotificationByInterval();
      isNotificationIntervalRunning = false;
    }
  });

  socket.on("create-something", (value) => {
    console.info("Received value:", value);

    io.emit("foo", value);
  });
});

httpServer.listen(port, () => {
  console.info(
    `⚡️[socket]: Socket server is running at http://localhost:${port}`
  );
});

database
  .getConnection()
  .then(() => {
    console.info(`⚡️[database]: Socket server can reach database`);
  })
  .catch((err: Error) => {
    console.error(err);
  });
