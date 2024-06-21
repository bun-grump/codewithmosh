const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Hello World!!! I am Vidly~ ^o^");
  });

module.exports = router;