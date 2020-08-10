const mongoose = require('mongoose');

const User = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  guilds: { type: Array, required: true },
  discordTag: { type: String, required: true },
});
module.exports = mongoose.model('users', User);
