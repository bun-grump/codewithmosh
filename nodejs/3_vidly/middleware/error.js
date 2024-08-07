const winston = require("winston");

// this only catches express request processing pipeline
// if error is thrown outside of express, then it will not be caught here
module.exports = function (err, req, res, next) {
  // log the exception
  winston.error(err.message, err);
  res.status(500).send("something failed"); // internal server error
};
