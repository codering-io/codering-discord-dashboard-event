const BaseCommand = require("../utils/structures/BaseCommand");
var { guild, createNewGuildEntry } = require("../database/Guild");
const { MessageEmbed } = require("discord.js");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("changeprefix", "prefix", []);
  }

  async run(client, message, args) {
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
      var newPrefix = args[0];
      if (newPrefix == undefined || newPrefix == null) {
        message.delete();
        message.channel.send("Put a new prefix to use");
        return 0;
      } else if (newPrefix.length > 5) {
        message.delete();
        message.channel.send("The new prefix cannot exceed 5 characters");
        return 0;
      }
      guildTable.prefix = newPrefix;
      guildTable
        .save()
        .then(() => {
          let embed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setDescription(`New prefix: ${newPrefix}`)
            .setColor("RANDOM")
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
          message.channel.send(embed);
        })
        .catch(console.error);
    });
  }
};
