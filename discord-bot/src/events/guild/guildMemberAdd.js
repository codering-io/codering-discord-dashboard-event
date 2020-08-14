const BaseEvent = require('../../utils/structures/BaseEvent');
const { guild, CreateNewGuildEntry } = require('../../database/Guild');

module.exports = class guildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client, guildMember) {
    guild.findById(guildMember.guild.id, 'config', (error, guildTable) => {
      if (error) return 1;
      if (!guildTable) {
        CreateNewGuildEntry(guildMember.guild.id);
        return 0;
      }

      const autoRole = guildMember.guild.roles.cache.get(guildTable.config.autoRole);
      if (autoRole) {guildMember.roles.add(autoRole)}
    });
  }
};
