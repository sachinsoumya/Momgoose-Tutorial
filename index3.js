const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

//Defining the mongoose schema

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
  marks: Number,
});

//Creating the model
const Student = mongoose.model("Student", StudentSchema);

//creating the document

const s1 = new Student({
  name: "Sachin",
  age: 26,
  grade: "o",
  marks: 590,
});

// s1.save()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// Student.insertMany([
//   { name: "Lopa", age: 26, grade: "o", marks: 560 },
//   { name: "Ram", age: 25, grade: "o", marks: 599 },

//   { name: "Shyam", age: 23, grade: "o", marks: 595 },
// ])
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

//   Student.find({}).then((data)=>console.log(data)).catch((err=>console.log(err)));

Student.findByIdAndUpdate(
  "68ea006ba065fb11e4c1f854",
  { $set: [{ marks: 588 }, { name: "Gopal" }] },
  { new: true }
)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

Student.deleteOne({ name: "Sachin" })
  .then((data) => console.log("deleted successfully"))
  .catch((err) => console.log(err));

Student.find()
  .limit(2)
  .select({ marks:1, name:1 , _id:0 })
  .sort({marks:-1})
  .then((data) => console.log(data))
  .catch((err => console.log(err)));
