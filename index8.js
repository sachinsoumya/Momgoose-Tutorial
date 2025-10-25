//* Indexing

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then((data) => console.log("mongodb connected successfully"))
  .catch((err) => console.log("error in connecting"));


  


