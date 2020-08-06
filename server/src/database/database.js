const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/codering-discord-dashboard-event", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
