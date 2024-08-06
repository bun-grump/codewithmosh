require("express-async-errors"); // catching exceptions for async function
const winston = require("winston"); // logging package
const error = require("./middleware/error");
const config = require("config");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const home = require("./routes/home");
const mongoose = require("mongoose");
const app = express();

winston.add(new winston.transports.File({ filename: "logfile.log" }));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);

app.use(error); //error middleware is registered at last

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
