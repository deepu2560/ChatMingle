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
const {
  setOnlineStatus,
  getOnlineStatus,
  deleteOnlineStatus,
  getOnlineStatusByUserID,
} = require("./src/utils/onlineStatusUtils");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
  setOnlineStatus(socket.handshake.query.user, socket.id);

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

  socket.on("user_online_status", async () => {
    try {
      clearTimeout(onlineStatusDeletationTimmer);
      const status = await getOnlineStatus(socket.id);

      if (status) {
        var onlineStatusDeletationTimmer = setTimeout(async () => {
          try {
            await deleteOnlineStatus(socket.id);
          } catch (error) {
            console.log(
              "error at user_online_status endpoint in socket",
              error.message,
            );
          }
        }, 1000);
      }

      socket.emit("online_status", status);
    } catch (error) {
      console.log(
        "error at user_online_status endpoint in socket",
        error.message,
      );
      socket.emit("error", "message couldn't sent try again");
    }
  });

  socket.on("check_online_status", async (userId) => {
    try {
      const status = await getOnlineStatusByUserID(userId);

      socket.emit("friend_online_status", status);
    } catch (error) {
      console.log(
        "error at check_online_status endpoint in socket",
        error.message,
      );
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

  socket.on("disconnect", () => {
    console.log("disconnected", "hello world", socket.id);
  });
});
