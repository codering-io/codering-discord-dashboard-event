const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../utils/structures/BaseCommand');
const { guild, CreateNewGuildEntry } = require('../database/Guild');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('configmute', 'muteconfig', []);
  }

  async run(client, message, args) {
    guild.findById(message.guild.id, 'config', (error, guildTable) => {
      if (error) {
        console.log(error);
        return 1;
      }
      if (!guildTable) {
        CreateNewGuildEntry(message.guild.id);
        message.reply('Try again!');
        return 1;
      }
      const role = message.mentions.roles.first();
      if (!role) {
        message.reply('Ops, this is not a role!');
        return 0;
      }
      if (!message.guild.me.hasPermission('MANAGE_CHANNELS', false, true)) {
        message.reply('I do not have permissions to manage channels');
        return 0;
      }
      message.guild.channels.cache.forEach(async (channel) => {
        await channel
          .createOverwrite(role, {
            SEND_MESSAGES: false,
          })
          .catch(() => { });
      });
      guildTable.config.mutedRole = role.id;
      guildTable
        .save()
        .then(() => {
          const embed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setDescription(`New role: ${role}`)
            .setColor('RANDOM')
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
          message.channel.send(embed);
        })
        .catch(console.error);
    });
  }
};