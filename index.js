const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log("connection failed", err));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: "general" },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

productSchema.methods.getDiscoutedPrice = function(discountPercent){
    return this.price - (this.price * discountPercent)/100;
} 

productSchema.statics.findByCategory = function(category){
    return this.find({category:category})
}

const Product = mongoose.model("Product", productSchema);

const product1 = new Product({
  name: "Laptop",
  price: 45000,
  category: "Electronic",
  inStock: true,
});

console.log(product1.getDiscoutedPrice(10));

Product.findByCategory('Electronic').then((data)=>console.log(data));

product1
  .save()
  .then(() => console.log("product successfully daved"))
  .catch((err) => console.log("error occoured", err));

Product.insertMany([
  { name: "Smartphone", price: 25000, category: "Electronics" },
  { name: "Table", price: 5000, category: "Furniture" },
])
  .then(() => console.log("multiple products added successfully"))
  .catch((err) => console.log("error occoured", err));


// productSchema.methods.getDiscoutedPrice = function(discountPercent){
//     return this.price;
// } 

//* Define schema
// const employeeSchema = new mongoose.Schema({
//   name: String,
//   department: String,
//   salary: Number,
// });

// //* Create model
// const Employee = mongoose.model("Employee", employeeSchema);

// console.log(Employee);

// //* Create document
// const employee1 = new Employee({
//   name: "Simi",
//   department: "IT",
//   salary: 25000,
// });

// //* save document
// employee1
//   .save()
//   .then(() => console.log("employee saved"))
//   .catch((err) => console.log("errrr occored", err));
