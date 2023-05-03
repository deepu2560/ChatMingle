const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    isGroup: { type: Boolean, required: false, default: false },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    chatId: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("message", messageSchema);
