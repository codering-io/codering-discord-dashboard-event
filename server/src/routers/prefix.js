const { Router } = require('express');

const router = Router();

const Guild = require('../database/models/Guild');

router.get('/', async (req, res) => {
  req.user = req.session.user;
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
