const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const connect = require("./src/Configs/db");
const AuthController = require("./src/Controllers/authControllers");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/auth", AuthController);

const server = app.listen(port, async () => {
  try {
    connect();
    console.log("===>>> Server started successfully on port:", port);
  } catch (error) {
    console.log("===>>> Server Starting error:", error.message);
  }
});
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Connected");
  socket.custom_id = "abc";

  socket.on("message", (data) => {
    console.log({ id: socket.custom_id, message: data });
    let message = data;

    socket.emit("received", message);
  });

  socket.on("disconnect", (socket) => {
    console.log("disconnected");
  });
});
