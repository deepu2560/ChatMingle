const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    group_name: { type: Boolean, required: true },
    bio: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("group", groupSchema);
