const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//connect DB
mongoose.connect("mongodb://localhost:27017/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create schema

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

//create a photo

// Photo.create({
//   title: "Photo Title 2",
//   description: "Photo description 2 lorem ipsum",
// });

// read a photo

// Photo.find({},(err,data) => {
//     console.log(data);
// })

//update photo

// const id = "61d9ff8cec7d577ba97a2bb5";

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: "Photo Title 11 Updated",
//     description: "Photo description 11 updated",
//   },
//   {
//     new: true,
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );


// Delete photo
const id = "61da0409bfdd6320d2e36fbd";
Photo.findByIdAndDelete(id, (err, data) => {
  console.log("Photo is removed");
});