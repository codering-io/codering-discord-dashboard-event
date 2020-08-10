const mongoose = require('mongoose');

const Guild = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, required: true },
  autoRole: { type: String, default: null },
  mutedRole: { type: String, default: null },
});
module.exports = mongoose.model('guilds', Guild);
