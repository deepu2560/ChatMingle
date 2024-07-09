const mongoose = require("mongoose");

const onlineStatus = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    socketID: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("onlinestatus", onlineStatus);
