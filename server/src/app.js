/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');

const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
