const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    res.status(404).send("The genre with the given ID was not found.");
  else res.send(genre);
});

// only authenticated users can add new genres
router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  else {
    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
  }
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // find and update
  else {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    else res.send(genre);
  }
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  // find and delete
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  // Return the same genre
  else res.send(genre);
});

module.exports = router;
