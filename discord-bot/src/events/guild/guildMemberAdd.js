const BaseEvent = require("../../utils/structures/BaseEvent");
var { guild, createNewGuildEntry } = require("../../database/Guild");

module.exports = class guildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client, guildMember) {
    guild.findById(guildMember.guild.id, "config", (error, guildTable) => {
      if (error) return 1;
      if (!guildTable) {
        createNewGuildEntry(guildMember.guild.id);
        return 0;
      }

      let autoRole = guildMember.guild.roles.cache.get(
        guildTable.config.autoRole
      );
      if (autoRole) {
        guildMember.roles.add(autoRole).catch((error) => console.log(error));
      }
    });
  }
};
