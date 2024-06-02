const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: { type: String, required: true },
    read: { type: Boolean, required: false, default: false },
    receiver_status: { type: Boolean, required: false, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("message", messageSchema);
