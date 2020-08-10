/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');

const Guild = require("./database/models/Guild");
const User = require("./database/models/User");

const passport = require("passport");
const { Strategy } = require("passport-discord");

const { Client, Permissions } = require('discord.js');
const client = new Client();
client.login(process.env.BOT_TOKEN);

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_CALLBACK_URL,
  scope: ["identify", "guilds"]
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ userId: profile.id });
  if (!user) {
    let userGuilds = profile.guilds.filter(g => {
      let permissions = new Permissions(g.permissions);
      if (permissions.has("MANAGE_GUILD") && client.guilds.cache.has(g.id)) return true;
      return false;
    });
    let objIds = [];
    for (let g of userGuilds) {
      let guild = await Guild.findOne({ guildId: g.id });
      if (!guild) {
        guild = (new Guild({
          guildId: g.id,
          prefix: "!"
        })).save();
      }
      objIds.push(guild.id);
    }
    user = (new User({
      userId: profile.id,
      discordTag: `${profile.username}#${profile.discriminator}`,
      guilds: objIds
    })).save();
  } else {
    let userGuilds = profile.guilds.filter(g => {
      let permissions = new Permissions(g.permissions);
      if (permissions.has("MANAGE_GUILD") && client.guilds.cache.has(g.id)) return true;
      return false;
    });
    let objIds = [];
    for (let g of userGuilds) {
      let guild = await Guild.findOne({ guildId: g.id });
      if (!guild) {
        guild = (new Guild({
          guildId: g.id,
          prefix: "!"
        })).save();
      }
      objIds.push(guild.id);
    }
    User.findOneAndUpdate({ discordTag: `${profile.username}#${profile.discriminator}`, guilds: objIds });
  }
}));

const express = require('express');

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
