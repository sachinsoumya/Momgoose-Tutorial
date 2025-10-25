const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log("error in connection " + " " + err));

//TODO: Embedding or Denormalization

//* DEfining the schema

// const productSchema = new mongoose.Schema({
//   category: String,
//   model: [
//     {
//       name: String,
//       price: Number,
//     },
//   ],
// });

// //*Creating the model

// const Product = mongoose.model("Product", productSchema);

// //* Creating the document

// const p1 = new Product({
//   category: "Electronics",
//   model: [
//     {
//       name: "Laptop",
//       price: 45000,
//     },

//     {
//       name: "Smartphone",
//       price: 25000,
//     },
//   ],
// });

// p1.save()
//   .then((data) => console.log("Document Saved successfully", data))
//   .catch((err) => console.log("error occoured", err));

//TODO: Referencing or Normalization

//*Defing the Schema

const CoursesSchema = new mongoose.Schema({
  name: String,
  duration: String,
  price: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },

      message: (props) => ` ${props.value} is not a valid price !`,
    },
  },

  ratings: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const Course = mongoose.model("Course", CoursesSchema);

// const StudentSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   qualification: String,
//   courses: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: Course,
//   },
// });

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  qualification: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Course,
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

(async function main() {
  try {
    // const c1 = new Course({
    //   name: "MERN Stack",
    //   duration: "6 months",
    //   price: 3000,
    //   ratings: 5,
    // });

    // await c1.save();
    // console.log("MERN Course data saved successfully", c1);

    // const c2 = new Course({
    //   name: "Java Fullstack",
    //   duration: "6 months",
    //   price: 3500,
    //   ratings: 4.5,
    // });

    // await c2.save();
    // console.log("Java Course data saved successfully", c2);

    // const s2 = new Student({
    //   name: "Lopa",
    //   age: 24,
    //   qualification: "BA",
    //   courses: [c1._id, c2._id],
    // });

    // await s2.save();
    // console.log("Student 2 data saved successfully", s2);

    // Query after saving the student
    const result_2 = await Student.findOne({ name: "Lopa" }).populate(
      "courses",
      "name price -_id"
    );
    console.log("Student data is", result_2);
  } catch (err) {
    console.log("Error:", err);
  }
})();

//*Creating the model

//*Creating the document

//* saving the document
