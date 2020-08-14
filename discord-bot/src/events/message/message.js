const BaseEvent = require("../../utils/structures/BaseEvent");
var { guild, createNewGuildEntry } = require("../../database/Guild");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {
    guild.findById(message.guild.id, (error, guildTable) => {
      if (error) {
        console.log(error);
        return 1;
      }
      if (!guildTable) {
        createNewGuildEntry(message.guild.id);
        message.reply("Try again!");
        return 1;
      }
      const prefix = guildTable.prefix;
      if (message.author.bot) return;
      if (message.content.startsWith(prefix)) {
        const [cmdName, ...cmdArgs] = message.content
          .slice(prefix.length)
          .trim()
          .split(/\s+/);
        const command = client.commands.get(cmdName);
        if (command) {
          command.run(client, message, cmdArgs);
        }
      }
    });
  }
};
