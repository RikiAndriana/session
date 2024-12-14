const Student = require("../models/student");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  const students = await Student.find();
  res.cookie("token", "1234567890abc");
  res.cookie("user", "riki");
  res.render("students/index", { students });
});

module.exports.show = wrapAsync(async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("students/show", { student });
});

module.exports.store = wrapAsync(async (req, res, next) => {
  const student = new Student(req.body.student);
  await student.save();
  res.redirect("/students");
});

module.exports.edit = wrapAsync(async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("students/edit", { student });
});

module.exports.update = wrapAsync(async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body.student
  );
  await student.save();
  res.redirect(`/students/${req.params.id}`);
});

module.exports.delete = wrapAsync(async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/students");
});
