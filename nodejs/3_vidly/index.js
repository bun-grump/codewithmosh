const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "comedy" },
  { id: 3, name: "romance" },
  { id: 4, name: "horror" },
  { id: 5, name: "drama" },
  { id: 6, name: "science fition" },
];

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(), // name is required and should be minimum 3 characters
  };

  return Joi.validate(genre, schema);
}

app.get("/", (req, res) => {
  res.send("Hello World!!! I am Vidly~ ^o^");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const result = validateGenre(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  // Look up the genre
  // If not existing, return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  // Update genre
  // Return the updated genre
  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  // Look up the genre
  // Not existing, return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  // Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1); // delete 1 element from index

  // Return the same genre
  res.send(genre);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
