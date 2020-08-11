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
app.use(
  session({
    secret: "Testing",
    cookie: {
      maxAge: 60 * 1000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/auth/', authenticationRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
