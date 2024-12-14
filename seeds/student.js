const moongose = require("mongoose");
const Student = require("../models/student");
const { default: mongoose } = require("mongoose");

moongose
  .connect("mongodb://127.0.0.1/oxfordUn")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const student = [
  {
    name: "Riki Andriana",
    npm: 201410052,
    fakultas: "FAI",
  },
  {
    name: "Mark Zuck",
    npm: 201110032,
    fakultas: "FISIP",
  },
  {
    name: "Jack Ma",
    npm: 12853395,
    fakultas: "FEB",
  },
  {
    name: "Khabib Nurmegadov",
    npm: 582399562,
    fakultas: "FAI",
  },
  {
    name: "Syaikh Uthman",
    npm: 201410345,
    fakultas: "FAI",
  },
  {
    name: "Black Panther",
    npm: 204256245,
    fakultas: "Teknik",
  },
  {
    name: "Yee Long Ma",
    npm: 53456678,
    fakultas: "Teknik",
  },
  {
    name: "Ronaldo",
    npm: 70707070,
    fakultas: "FKIP",
  },
  {
    name: "Benzema",
    npm: 735399462,
    fakultas: "PGSD",
  },
  {
    name: "Mufti Menk",
    npm: 674230345,
    fakultas: "FAI",
  },
];

async function addSeed() {
  try {
    await Student.deleteMany({});
    await Student.insertMany(student);
    console.log("seed has been added");
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}
addSeed();
