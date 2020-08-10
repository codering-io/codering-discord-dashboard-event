/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');

const Guild = require("./database/models/Guild");
const User = require("./database/models/User");

const passport = require("passport");
const { Strategy } = require("passport-discord");

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_CALLBACK_URL,
  scope: ["identify", "guilds"]
}));

const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
