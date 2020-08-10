/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');

const passport = require("./strategy");

const express = require('express');

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
