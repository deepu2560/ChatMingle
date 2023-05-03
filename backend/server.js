const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const connect = require("./src/Configs/db");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

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

  socket.on("newMessage", (data) => {
    console.log(data);
  });
});

io.on("disconnect", (socket) => {
  console.log("disconnected");
});

app.get("/", async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    console.log("==>> Home route server error.");
  }
});
