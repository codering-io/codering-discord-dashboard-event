const Mongoose = require('mongoose');

const prefix = process.env.DISCORD_BOT_PREFIX;
const mongoURL = process.env.mongo_URI;

Mongoose.connect(
  mongoURL,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  (error) => {
    if (error) {
      console.log(`Erro: ${error}`);
      process.exit(1);
    }
    console.log('Conected to the database');
    return 0;
  },
);
const { Schema } = Mongoose;
const ConfigSchema = new Schema({
  mutedRole: String,
  autoRole: String,
  prefix: String,
});
const GuildSchema = new Schema({
  _id: String,
  prefix: String,
  config: ConfigSchema,
});

const guild = Mongoose.model('guildsCodering', GuildSchema);

const CreateNewGuildEntry = (guildID) => {
  const newGuild = new guild({
    _id: guildID,
    prefix,
    config: {
      mutedRole: '',
      autoRole: '',
    },
  });
  newGuild.save();
};

module.exports = {
  guild,
  CreateNewGuildEntry,
};
