const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.password) {
    res.send("welcome riki");
  }
  res.send("your not the author");
});

module.exports = router;
