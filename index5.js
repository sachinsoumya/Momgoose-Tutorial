const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log("error in connection " + " " + err));

//* Defing a schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/.test(v);
      },
      message: (props) => `${props.value} is not containing only alphabets`,
    },
  },

  age: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 18 && v < 60;
      },

      message: (props) => `${props.value} is not a valid value`,
    },
  },

  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },

      message: (props) => `${props.value} is not a valid email`,
    },
  },

  balance: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },

      message: (props) => `${props.value} is not a valid balance`,
    },
  },
});

//*Creating the model
const Customer = mongoose.model("Customer", customerSchema);

const c1 = new Customer({
  name: "Sachin",
  age: 26,
  email: "sachin@gmail.com",
  balance: 5000,
});



// c1.save()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err + "error in saving data"));

Customer.create([
  {
    name: "John",
    age: 54,
    email: "john@gmail.com",
    balance: 450000,
  },
])
  .then((data) => console.log(data))
  .catch((err) => console.log(err + " " + "error in inserting data"));
