const BaseCommand = require("../utils/structures/BaseCommand");
var { guild, createNewGuildEntry } = require("../database/Guild");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("mute", "silenciar", []);
  }

  async run(client, message, args) {
    guild.findById(message.guild.id, "prefix config", (error, guildTable) => {
      if (error) {
        console.log(error);
        return 1;
      }
      if (!guildTable) {
        createNewGuildEntry(message.guild.id);
        message.reply("Try again!");
        return 1;
      }

      const mention =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

      const mutedRole = guildTable.config.mutedRole;
      const prefix = guildTable.prefix;

      if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
        message.reply("You don't have permissions!");
        return 0;
      }
      if (!message.guild.me.hasPermission("MANAGE_ROLES", false, true)) {
        message.reply("I don't have permissions to do this");
        return 0;
      }
      if (!mention == client.user) {
        message.reply("I don't have permissions to do this");
        return 0;
      }
      if (!mutedRole) {
        message.channel.send(
          "Set up a role for silenced members by typing:\n\n" +
            prefix +
            "configmute `@role`"
        );
        return 0;
      }
      if (!mention) {
        message.channel.send("Ops, mention a user to silence");
        return 0;
      }
      if (!message.guild.roles.cache.get(mutedRole)) {
        message.channel
          .send("I think the role has been deleted, configure it again!")
          .then(() => {
            guildTable.config.mutedRole = "";
            guildTable.save();
          });
        return 0;
      }
      if (mention.roles.cache.has(mutedRole)) {
        message.channel.send("The user is already muted");
        return 0;
      } else {
        mention.roles.add(mutedRole);
        message.channel.send(
          `The user ${mention} has been successfully silenced!`
        );
      }
    });
  }
};
