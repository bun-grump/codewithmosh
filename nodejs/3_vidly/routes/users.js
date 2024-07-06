const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

// get current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// registering a new user
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

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token) // seeting response headers
      .send(_.pick(user, ["_id", "name", "email"])); // body of the response
  }
});

router.put("/:id", auth, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
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
