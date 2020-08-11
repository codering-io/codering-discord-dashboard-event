/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');

const express = require('express');
const passport = require('./strategy');

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/auth/discord', passport.authenticate('discord'));

app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req, res) => res.redirect('/dashboard'));

app.get('/api/auth/', passport.authenticate('discord'), async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.send({ guilds: req.user.guilds, userId: req.user.userId, discordTag: req.user.discordTag });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
