const moongose = require("mongoose");

const studentSchema = new moongose.Schema({
  name: String,
  npm: Number,
  fakultas: String,
});

const Student = moongose.model("Student", studentSchema);

module.exports = Student;
