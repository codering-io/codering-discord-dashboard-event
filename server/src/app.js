/* eslint-disable no-console */
require('dotenv').config();
require('./database/database');

const express = require('express');

const passport = require('./strategy');

const authenticationRouter = require('./routers/authentication');

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth/', authenticationRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
