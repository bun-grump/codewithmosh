const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db"); // getting db based on the environment we are running
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
