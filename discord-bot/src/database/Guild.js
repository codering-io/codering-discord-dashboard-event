const mongoose = require("mongoose");
const prefix = process.env.DISCORD_BOT_PREFIX;
const mongoURL = process.env.mongo_URI;

mongoose.connect(
  mongoURL,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  (error) => {
    if (error) {
      console.log(`Erro: ${error}`);
      process.exit(1);
      return 1;
    }
    console.log("Conected to the database");
    return 0;
  }
);
var Schema = mongoose.Schema;
var ConfigSchema = new Schema({
  mutedRole: String,
  autoRole: String,
  prefix: String,
});
var GuildSchema = new Schema({
  _id: String,
  prefix: String,
  config: ConfigSchema,
});

var guild = mongoose.model("guildsCodering", GuildSchema);

var createNewGuildEntry = (guildID) => {
  let newGuild = new guild({
    _id: guildID,
    prefix,
    config: {
      mutedRole: "",
      autoRole: "",
    },
  });
  newGuild.save().catch(console.error);
};

module.exports = {
  guild,
  createNewGuildEntry,
};
