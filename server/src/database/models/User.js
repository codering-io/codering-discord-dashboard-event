const mongoose = require("mongoose");

const User = new mongoose.Schema({
  guilds: { type: Array, required: true },
  userId: { type: String, required: true },
  discordTag: { type: String, required: true }
});
module.exports = mongoose.model("users", User);
