const express = require("express");
const ejs = require("ejs");
const path = require("path");
const Photo = require("./models/Photo");
const mongoose = require("mongoose");

const app = express();

//connect DB
mongoose.connect("mongodb://localhost:27017/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({})
  res.render("index", {
    photos,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render('photo', {
    photo
  })
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

//SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
