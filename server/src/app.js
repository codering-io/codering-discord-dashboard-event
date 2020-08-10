/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');

const Guild = require("./database/models/Guild");
const User = require("./database/models/User");

const passport = require("passport");
const { Strategy } = require("passport-discord");
const axios = require("axios");

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_CALLBACK_URL,
  scope: ["identify", "guilds"]
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ userId: profile.id });
  if (!user) {
    let userGuilds = profile.guilds.filter(g => {
      let guilds = await axios.get(`https://discord.com/api/v6/users/${process.env.CLIENT_ID}/guilds`, {
        headers: {
          "Authorization": `BOT ${process.env.BOT_TOKEN}`
        }
      });
      if ((g.permissions & 32) === 32 && guilds.some(i => i.id === g.id)) return true;
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
      let guilds = await axios.get(`https://discord.com/api/v6/users/${process.env.CLIENT_ID}/guilds`, {
        headers: {
          "Authorization": `BOT ${process.env.BOT_TOKEN}`
        }
      });
      if ((g.permissions & 32) === 32 && guilds.some(i => i.id === g.id)) return true;
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
