const BaseCommand = require("../utils/structures/BaseCommand");
var { guild, createNewGuildEntry } = require("../database/Guild");
const { MessageEmbed } = require("discord.js");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("configmute", "muteconfig", []);
  }

  async run(client, message, args) {
    guild.findById(message.guild.id, "config", (error, guildTable) => {
      if (error) {
        console.log(error);
        return 1;
      }
      if (!guildTable) {
        createNewGuildEntry(message.guild.id);
        message.reply("Try again!");
        return 1;
      }
      var role = message.mentions.roles.first();
      if (!role) {
        message.reply("Ops, this isn't a role!");
        return 0;
      }
      if (!message.guild.me.hasPermission("MANAGE_CHANNELS", false, true)) {
        message.reply("I don't have permissions to manage channels");
        return 0;
      } else {
        message.guild.channels.cache.forEach(async (channel) => {
          await channel
            .createOverwrite(role, {
              SEND_MESSAGES: false,
            })
            .catch(() => {});
        });
        guildTable.config.mutedRole = role.id;
        guildTable
          .save()
          .then(() => {
            let embed = new MessageEmbed()
              .setTitle(message.guild.name)
              .setDescription(`New role: ${role}`)
              .setColor("RANDOM")
              .setFooter(message.guild.name, message.guild.iconURL)
              .setTimestamp();
            message.channel.send(embed);
          })
          .catch(console.error);
      }
    });
  }
};
