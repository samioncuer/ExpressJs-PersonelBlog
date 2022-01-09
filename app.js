const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const path = require("path");
const Photo = require("./models/Photo");
const fs = require("fs");

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
app.use(fileUpload());

//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render("index", {
    photos,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  //await Photo.create(req.body);

  const uploadDir = 'public/uploads';
  if(!fs.existsSync()) {
    fs.mkdirSync(uploadDir);
  }
  
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
  
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
});

//SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
