const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // template location for views

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // by default is "undefined"
console.log(`app: ${app.get("env")}`); // by default is development

app.use(express.json()); // to parse json
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.static("public")); // to serve static files
app.use(logger);
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password")); // set the enviroment variable and store the mapping in custom-environment-variables.json

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// Db work ...
dbDebugger("Connected to the database...");

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
