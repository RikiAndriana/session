const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students");

router.get("/", studentController.index);

router.get("/create", (req, res) => {
  res.render("students/create");
});

router.get("/:id", studentController.show);

router.post("/", studentController.store);

router.get("/:id/edit", studentController.edit);

router.put("/:id", studentController.update);

router.delete("/:id", studentController.delete);

module.exports = router;
