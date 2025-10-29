//* Indexing

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log("error in connecting mongodb", err));

const PalSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (V) {
        return V.length > 3;
      },
      message: (props) => `${props.value} is not a valid name`,
    },
  },

  email: {
    type: String,
    unique: true, //* adding unique index to email field
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },

  age: {
    type: Number,
    min: 18,
    max: 60,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: (props) => `${props.value} is not a valid age`,
    },
  },
});

PalSchema.index({ age: 1 });

const Pal = mongoose.model("Pal", PalSchema);

const p1 = new Pal({
  name: "Panada",
  email: "panda@gmail.com",
  age: 30,
});

p1.save()
  .then((data) => ("data saved successfully", data))
  .catch((err) => console.log("err in saving the data", err));

  (async function getDoc(){

    const filterDoc = await Pal.find({email:'sachin@gmail.com' , age:30}).explain();

    console.log(filterDoc.executionStats.executionStages.inputStage);
    

  })();
