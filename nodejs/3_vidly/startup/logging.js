const winston = require("winston"); // logging package
require("winston-mongodb");
require("express-async-errors"); // catching exceptions for async function

module.exports = function () {
  // using process and winston to catch and log errors outside of express
  winston.handleExceptions(
    new winston.transports.Console({ colorized: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // throw and exception when there's a rejected promise so winston can catch it
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" })); //log to a file
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error", //this level and above will be logged
    })
  ); // log to mongodb
};
