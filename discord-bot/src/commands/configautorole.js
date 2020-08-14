const BaseCommand = require("../utils/structures/BaseCommand");
const { guild, CreateNewGuildEntry } = require("../database/Guild");
const { MessageEmbed } = require("discord.js");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("autorole", "configautorole", []);
  }

  async run(client, message, args) {
    guild.findById(message.guild.id, (error, guildTable) => {
      if (error) {
        console.log(error);
        return 1;
      }
      if (!guildTable) {
        CreateNewGuildEntry(message.guild.id);
        message.reply("Try again!");
        return 1;
      }
      var role = message.mentions.roles.first();
      if (!role) {
        message.reply("Ops, this isn't a role!");
        return 0;
      }
      guildTable.config.autoRole = role.id;
      guildTable
        .save()
        .then(() => {
          let embed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setDescription(`New role to Auto Role: ${role}`)
            .setColor("RANDOM")
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
          message.channel.send(embed);
        })
        .catch(console.error);
    });
  }
};
