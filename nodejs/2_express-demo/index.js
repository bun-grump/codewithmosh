const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // by default is "undefined"
console.log(`app: ${app.get("env")}`); // by default is development

app.use(express.json()); // to parse json
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.static("public")); // to serve static files
app.use(logger);
app.use(helmet());

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

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(), // name is required and should be minimum 3 characters
  };

  return Joi.validate(course, schema);
}

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  // Update course
  // Return the updated course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // Not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1); // delete 1 element from index

  // Return the same course
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
