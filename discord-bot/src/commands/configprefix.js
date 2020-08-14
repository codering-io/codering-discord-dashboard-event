const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../utils/structures/BaseCommand');
const { guild, CreateNewGuildEntry } = require('../database/Guild');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('changeprefix', 'prefix', []);
  }

  async run(client, message, args) {
    guild.findById(message.guild.id, (error, guildTable) => {
      if (error) {
        return;
      }
      if (!guildTable) {
        CreateNewGuildEntry(message.guild.id);
        message.reply('Try again!');
        return 1;
      }
      const newPrefix = args[0];
      if (newPrefix === undefined || newPrefix === null) {
        message.delete();
        message.channel.send('Put a new prefix to use');
        return 0;
      }
      if (newPrefix.length > 5) {
        message.delete();
        message.channel.send('The new prefix cannot exceed 5 characters');
        return 0;
      }
      guildTable.prefix = newPrefix;
      guildTable
        .save()
        .then(() => {
          const embed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setDescription(`New prefix: ${newPrefix}`)
            .setColor('RANDOM')
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
          message.channel.send(embed);
        })
      message.channel.send('Error!')
    });
  }
};
