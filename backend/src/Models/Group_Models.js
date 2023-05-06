const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    isRequest: { type: Boolean, required: false, default: false },
    request: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
      title: { type: String, required: false },
      content: { type: String, require: false },
    },
    group_name: { type: Boolean, required: true },
    bio: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("group", groupSchema);
