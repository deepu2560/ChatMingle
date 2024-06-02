const MessageModel = require("../Models/Message_Models");

async function new_message_sent(data) {
  try {
    const newMessage = await MessageModel.create(data);

    return newMessage;
  } catch (error) {
    console.log("Error at new_message_sent func:", error.message);
  }
}

async function chat_messages(userId1, userId2) {
  try {
    const chatMessages = await MessageModel.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(10);

    return chatMessages;
  } catch (error) {
    console.log("Error at chat_messages func:", error.message);
  }
}

async function find_user_chats(userID) {
  try {
    const userChatsReceived = await MessageModel.distinct("senderId", {
      receiverId: userID,
    });
    const userChatsSent = await MessageModel.distinct("receiverId", {
      senderId: userID,
    });

    const userAllChats = [
      ...new Set([
        ...userChatsReceived.map((elem) => elem.toString()),
        ...userChatsSent.map((elem) => elem.toString()),
      ]),
    ];

    return userAllChats;
  } catch (error) {
    console.log("Error at find_user_chats func:", error.message);
  }
}

module.exports = { new_message_sent, chat_messages, find_user_chats };
