const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    res.status(404).send("The movie with the given ID was not found.");
  else res.send(movie);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  const genre = await Genre.findById(req.body.genreId);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  else if (!genre) return res.status(400).send("Invalid genre.");
  else {
    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
    res.send(movie);
  }
});

router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const result = validate(req.body);
  const genre = await Genre.findById(req.body.genreId);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  else if (!genre) return res.status(400).send("Invalid genre.");
  else {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      { new: true }
    );
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
    else res.send(movie);
  }
});

router.delete("/:id", async (req, res) => {
  // find and delete
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  // Return the same movie
  else res.send(movie);
});

module.exports = router;
