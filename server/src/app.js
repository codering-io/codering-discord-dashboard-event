require("./database/database");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
