/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
const { Router } = require('express');

const router = Router();

const Guild = require('../database/models/Guild');

const passport = require('../strategy');

router.get('/', passport.authenticate('discord'), async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const prefix = {};
  for (const guild of req.user.guilds) {
    // eslint-disable-next-line no-await-in-loop
    const g = await Guild.findById(guild);
    prefix[g.guildId] = g.prefix;
  }
  res.send(prefix);
});

module.exports = router; 