const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    full_name: { type: String, required: true },
    email_id: { type: String, required: true },
    bio: { type: String, required: false, default: "" },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("message", messageSchema);
