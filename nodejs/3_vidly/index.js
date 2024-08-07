const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging"); //load this first to log any error when loading the other modules
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");
require("./startup/validation");

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
