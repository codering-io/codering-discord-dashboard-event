const { Router } = require('express');

const router = Router();

const passport = require('../strategy');

router.get('/discord/', passport.authenticate('discord'));

router.get('/discord/redirect/', passport.authenticate('discord'), (req, res) => res.redirect('/dashboard'));

router.get('/', passport.authenticate('discord'), async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.send({ guilds: req.user.guilds, userId: req.user.userId, discordTag: req.user.discordTag });
});

module.exports = router;