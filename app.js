const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const cookies = require("cookie-signature");
const session = require("express-session");

const app = express();

//define
const port = 3000;
const secret = "secret-key";

//setup express
app.set("view engine", "ejs");
app.set("views", "./views");
app.engine("ejs", ejsMate);

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser(secret));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

//connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1/oxfordUn")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

//express listener
app.listen(port, () => {
  console.log("server running on http://localhost:3000");
});

//session
app.get("/count", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`count: ${req.session.count}`);
});

app.get("/register", (req, res) => {
  const { username = "anonim" } = req.query;
  req.session.username = username;
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  res.send(`welcome back ${req.session.username}`);
});

app.get("/signincookie", (req, res) => {
  res.cookie("paket", "ransel", { signed: true });
  res.send("signed cookie");
});

app.get("/verifycookie", (req, res) => {
  const cookies = req.signedCookies;

  res.send(cookies);
});

app.get("/", (req, res) => {
  const { user = "pubg", token = "12345" } = req.cookies;
  res.send(`hello ${user} welcome back, your token is ${token}`);
});

app.get("/enkrip", (req, res) => {
  const enkrip = cookies.sign("paketrahasia", "harusnyasecretkey");
  const unkrip = cookies.unsign(enkrip, "harusnyasecretkey");
  res.cookie("user", enkrip);
  res.send(`selamat datang ${unkrip}`);
});

app.use("/admin", require("./routes/admin"));
app.use("/students", require("./routes/students"));

app.use((err, req, res, next) => {
  console.log();
  res.send("Error:" + err);
});
