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

app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.send(200);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
