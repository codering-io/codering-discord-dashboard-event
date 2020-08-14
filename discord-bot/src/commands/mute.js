const BaseCommand = require('../utils/structures/BaseCommand');
const { guild, CreateNewGuildEntry } = require('../database/Guild');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('mute', 'silenciar', []);
  }

  async run(client, message, args) {
    guild.findById(message.guild.id, 'prefix config', (error, guildTable) => {
      if (error) {
        return 0;
      }
      if (!guildTable) {
        CreateNewGuildEntry(message.guild.id);
        message.reply('Try again!');
        return 1;
      }

      const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      const rolemute = guildTable.config.mutedRole;

      if (!message.member.hasPermission('MANAGE_ROLES', false, true, true)) {
        message.reply('You do not have permissions!');
        return 0;
      }
      if (!message.guild.me.hasPermission('MANAGE_ROLES', false, true)) {
        message.reply('I do not have permissions to do this');
        return 0;
      }
      if (!mention === client.user) {
        message.reply('I do not have permissions to do this');
        return 0;
      }
      if (!rolemute) {
        message.channel.send(`Set up a role for silenced members by typing:\n\n${guildTable.prefix}configmute @role`);
        return 0;
      }
      if (!mention) {
        message.channel.send('Ops, mention a user to silence');
        return 0;
      }
      if (!message.guild.roles.cache.get(rolemute)) {
        message.channel
          .send('I think the role has been deleted, configure it again!');
        guildTable.config.mutedRole = '';
        guildTable.save();
        return 0;
      }
      if (mention.roles.cache.has(rolemute)) {
        message.channel.send('The user is already muted');
        return 0;
      }
      if (!mention.roles.cache.has(rolemute)) {
        mention.roles.add(rolemute);
        message.channel.send(`The user ${mention} has been successfully silenced!`);
      }
    });
  }
};
