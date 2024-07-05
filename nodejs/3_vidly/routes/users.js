const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  const display = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
  }));
  res.send(display);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).send("The user with the given ID was not found.");
  else res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  else {
    const user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email"]));
  }
});

router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // find and update
  else {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    else res.send(_.pick(user, ["_id", "name", "email"]));
  }
});

router.delete("/:id", async (req, res) => {
  // find and delete
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  // Return the same user
  else {
    res.send(_.pick(user, ["_id", "name", "email"]));
  }
});

module.exports = router;
