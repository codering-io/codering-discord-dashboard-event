const mongoose = require("mongoose");
module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    guilds: Array,
    userId: mongoose.SchemaTypes.Number,
    discordTag: String
  }),
);