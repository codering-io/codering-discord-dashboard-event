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

router.get('/:guildId', async (req, res) => {
  req.user = req.session.user;
  if (!req.user) return res.sendStatus(401);
  const { guildId } = req.params;
  const guild = await Guild.findOne({ guildId });
  if (!guild) return res.sendStatus(404);
  if (!req.user.guilds.find(async (i) => {
    const g = await Guild.findById(i);
    if (g.guildId === guildId) return true;
    return false;
  })) return res.sendStatus(404);
  // ^ 404 is in the requirements, HOWEVER we should make
  //   it 401 as it exists but isn't managable by the user.
  res.send({ guildId, prefix: guild.prefix });
});

module.exports = router;
