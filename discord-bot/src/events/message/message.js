const BaseEvent = require('../../utils/structures/BaseEvent');
const { guild, CreateNewGuildEntry } = require('../../database/Guild');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {
    guild.findById(message.guild.id, (error, guildTable) => {
      if (error) {
        return 0;
      }
      if (!guildTable) {
        CreateNewGuildEntry(message.guild.id);
        message.reply('Try again!');
        return 1;
      }
      const prefixx = guildTable.prefix;
      if (message.author.bot) return;
      if (message.content.startsWith(prefixx)) {
        const [cmdName, ...cmdArgs] = message.content
          .slice(prefixx.length)
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
