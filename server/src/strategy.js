const passport = require('passport');
const { Strategy } = require('passport-discord');
const axios = require('axios');

const User = require('./database/models/User');
const Guild = require('./database/models/Guild');

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findOne({ userId });
  return user && done(null, user);
});

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_CALLBACK_URL,
  scope: ['identify', 'guilds'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ userId: profile.id });
    if (!user) {
      const guilds = (await axios.get('https://discord.com/api/v6/users/@me/guilds', {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      })).data;
      // eslint-disable-next-line max-len
      const userGuilds = profile.guilds.filter(async (g) => (g.permissions & 32) === 32 && guilds.find((bg) => (bg.id === g.id)));
      const objIds = [];
      for (const g of userGuilds) {
        // eslint-disable-next-line no-await-in-loop
        let guild = await Guild.findOne({ guildId: g.id });
        if (!guild) {
          // eslint-disable-next-line no-await-in-loop
          guild = await Guild.create({
            guildId: g.id,
            prefix: '!',
          });
        }
        objIds.push(guild.id);
      }
      user = await User.create({
        userId: profile.id,
        discordTag: `${profile.username}#${profile.discriminator}`,
        guilds: objIds,
      });
    } else {
      const guilds = (await axios.get('https://discord.com/api/v6/users/@me/guilds', {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      })).data;
      // eslint-disable-next-line max-len
      const userGuilds = profile.guilds.filter(async (g) => (g.permissions & 32) === 32 && guilds.find((bg) => (bg.id === g.id)));
      const objIds = [];
      for (const g of userGuilds) {
        // eslint-disable-next-line no-await-in-loop
        let guild = await Guild.findOne({ guildId: g.id });
        if (!guild) {
          // eslint-disable-next-line no-await-in-loop
          guild = await Guild.create({
            guildId: g.id,
            prefix: '!',
          });
        }
        objIds.push(guild.id);
      }
      user = await User.findOneAndUpdate({ discordTag: `${profile.username}#${profile.discriminator}`, guilds: objIds });
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
}));

module.exports = passport;
