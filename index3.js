const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

//Defining the mongoose schema

const StudentSchema = new mongoose.Schema({
  name: String,
  age: { type: Number, index: true },
  grade: String,
  marks: { type: Number },
});

//Creating the model
const Student = mongoose.model("Student", StudentSchema);

StudentSchema.index({ marks: 1 }); //* here also creating index on marrks field mannually

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

// Student.insertMany([
//   { name: "Sachin", age: 27, grade: "o", marks: 600 },
//   { name: "Simi", age: 22, grade: "A", marks: 400 },
//   { name: "Sonu", age: 30, grade: "B", marks: 550 },
// ])
//   .then((data) => console.log("students data saved successfully", data))
//   .catch((err) => console.log(err));

(async function getStudents() {
  try {
    // const filtered_student = await Student.find({ age: 30 });
    // console.log("Filtered students are" ,filtered_student);
    // console.log( await Student.collection.getIndexes());

    const filtered_student_mark = await Student.find({ marks: 400 });

    console.log("filtered students based on marks", filtered_student_mark);
    const checkIndexing_1 =  await Student.find({ marks: 400 }).explain("executionStats"); // before creatinf index  - COLLSCAN

    console.log("Check Indexing in marks" , checkIndexing_1.executionStats.executionStages);

    const checkIndexing_2 = await Student.find({ age: 30 }).explain(
      "executionStats"
    ); // after creatinf index - IXSCAN

    console.log("Check Indexing in age", checkIndexing_2.executionStats.executionStages);
  } catch (err) {
    console.log(err);
  }

  // const students = await Student.find();

  // console.log(students);

  // console.log(students);
})();
