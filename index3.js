const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

//Defining the mongoose schema

const StudentSchema = new mongoose.Schema({
  name: String,
  stream:String,
  email: String,
  age: { type: Number, index: true },
  grade: String,
  marks: { type: Number },
  std: Number,
  section: String,
  intro:String
});

//Creating the model
const Student = mongoose.model("Student", StudentSchema);

StudentSchema.index({ marks: 1 }); //* here also creating index on marrks field mannually
StudentSchema.index({stream:1 , std:1}); //* here we are creating compound index.(i.e adding index more than one fields)
StudentSchema.index({intro:'text'});//* here we are adding text index to intro field.

//creating the document

// const s1 = new Student({
//   name: "Sachin",
//   email:"sachin@gmail.com",
//   age: 26,
//   grade: "o",
//   marks: 590,
//   std:9,
//   sec:"A",
// });

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

// Student.findByIdAndUpdate(
//   "68ea006ba065fb11e4c1f854",
//   { $set: [{ marks: 588 }, { name: "Gopal" }] },
//   { new: true }
// )
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// Student.deleteOne({ name: "Sachin" })
//   .then((data) => console.log("deleted successfully"))
//   .catch((err) => console.log(err));

// Student.find()
//   .limit(2)
//   .select({ marks:1, name:1 , _id:0 })
//   .sort({marks:-1})
//   .then((data) => console.log(data))
//   .catch((err => console.log(err)));

Student.insertMany([
  {
    name: "Sachin",
    stream:"Science",
    email: "sachin@gmail.com",
    age: 27,
    grade: "o",
    marks: 600,
    std: "10",
    section: "B",
    intro:"Hello I am Sachin and I am from science stream"
  },
  {
    name: "Simi",
     stream:"Arts",
    email: "simi@gmail.com",
    age: 22,
    grade: "A",
    marks: 400,
    std: 7,
    section: "A",
    intro:"Hello I am Simi and I am from arts stream"
  },
  {
    name: "Sonu",
     stream:"Commerce",
    email: "sonu@gmail.com",
    age: 30,
    grade: "B",
    marks: 550,
    std: 8,
    section: "C",
    intro:"Hello I am Sonu and I am from commerce stream"
  },
  {
    name: "Soumya",
     stream:"Arts",
    email: "soumya@gmail.com",
    age: 37,
    grade: "a",
    marks: 530,
    std: 6,
    section: "C",
    intro:"Hello I am Soumya and I am from arts stream"
  },
  {
    name: "Sushree",
     stream:"Science",
    email: "sushree@gmail.com",
    age: 28,
    grade: "b",
    marks: 510,
    std: 5,
    section: "B",
    intro:"Hello I am Sushree and I am from science stream"
  },
  {
    name: "Dhuluku",
     stream:"Science",
    email: "dhuluku@gmail.com",
    age: 30,
    grade: "c",
    marks: 570,
    std: 8,
    section: "A",
    intro:"Hello I am Dhuluku and I am from science stream"
  },
])
  .then((data) => console.log("students data saved successfully", data))
  .catch((err) => console.log(err));

(async function getStudents() {
  try {
    // const filtered_student = await Student.find({ age: 30 });
    // console.log("Filtered students are" ,filtered_student);
    // console.log( await Student.collection.getIndexes());

    // const filtered_student_mark = await Student.find({ marks: 400 });

    // console.log("filtered students based on marks", filtered_student_mark);
    // const checkIndexing_1 = await Student.find({ marks: 400 }).explain(
    //   "executionStats"
    // ); // before creatinf index  - COLLSCAN

    // console.log(
    //   "Check Indexing in marks",
    //   checkIndexing_1.executionStats.executionStages
    // );

    // const checkIndexing_2 = await Student.find({ age: 30 }).explain(
    //   "executionStats"
    // ); // after creatinf index - IXSCAN

    // console.log(
    //   "Check Indexing in age",
    //   checkIndexing_2.executionStats.executionStages
    // );

    // const checkCompoundIndexing= await Student.find({stream:"Science", std:{$eq:10}}).explain("executionStats");
    // console.log(checkCompoundIndexing.executionStats.executionStages);


    const findByText = await Student.find({$text:{$search:"science"}}); //* here we are filtering documents through texts.

    console.log(findByText);
  } catch (err) {
    console.log(err);
  }

  // const students = await Student.find();

  // console.log(students);

  // console.log(students);
})();
