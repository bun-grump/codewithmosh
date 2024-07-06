const auth = require("../middleware/auth");
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    res.status(404).send("The rental with the given ID was not found.");
  else res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId);
  if (!customer) return res.status(400).send("Invalid customer.");
  else if (!movie) return res.status(400).send("Invalid movie.");
  else if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");
  else {
    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    const sesson = await mongoose.startSession();
    sesson.startTransaction();
    try {
      await rental.save();
      movie.numberInStock--;
      await movie.save();
      await sesson.commitTransaction();
      res.send(rental);
    } catch (err) {
      await sesson.abortTransaction();
      throw err;
    } finally {
      sesson.endSession();
    }
  }
});

module.exports = router;
