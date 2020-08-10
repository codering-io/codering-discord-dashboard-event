/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');
const passport = require('passport');
const { Strategy } = require('passport-discord');

// const Guild = require('./database/models/Guild');
// const User = require('./database/models/User');

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_CALLBACK_URL,
  scope: ['identify', 'guilds'],
}));

const passport = require("./strategy");

const express = require('express');

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
