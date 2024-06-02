const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const connect = require("./src/Configs/db");
const AuthController = require("./src/Controllers/authControllers");
const {
  new_message_sent,
  chat_messages,
  find_user_chats,
} = require("./src/utils/messageUtils");
const { getting_all_user_details } = require("./src/utils/userUtils");

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

  socket.on("message", async (senderId, receiverId, content) => {
    try {
      let data = { senderId, receiverId, content };
      let newMessage = await new_message_sent(data);

      socket.emit("received", newMessage);
    } catch (error) {
      console.log("error at message endpoint in socket", error.message);
      socket.emit("error", "message couldn't sent try again");
    }
  });

  socket.on("chat", async (userId1, userId2) => {
    try {
      let chatMessages = await chat_messages(userId1, userId2);

      socket.emit("chatMessages", chatMessages);
    } catch (error) {
      console.log("error at message endpoint in socket", error.message);
      socket.emit("error", "message couldn't sent try again");
    }
  });

  socket.on("findChats", async (userID) => {
    try {
      let allChatsUserIDs = await find_user_chats(userID);
      let allChatsUsers = await getting_all_user_details(allChatsUserIDs);

      socket.emit("allChats", allChatsUsers);
    } catch (error) {
      console.log("error at message endpoint in socket", error.message);
      socket.emit("error", "message couldn't sent try again");
    }
  });

  socket.on("disconnect", (socket) => {
    console.log("disconnected");
  });
});
