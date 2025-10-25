const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

//Defining the mongoose schema

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  category: { type: String, enum: ["web", "mobile", "data"] },
  price: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },
    },
    message: (props) => `${props.value} is not a valid price!`,
  },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

//* creating the model

const Course = mongoose.model("Course", CourseSchema);

const c1 = new Course({
  title: "React Course",
  category: "web",
  price: 3000,
  published: true,
});

c1.save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
