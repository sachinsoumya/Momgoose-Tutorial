const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log("connection failed", err));

//* defining the schema

const EmployeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String,
  salary: { type: Number, min: 20000 },
});

EmployeeSchema.query.byAge = function (age) {
  return this.where({ age: age });
};


EmployeeSchema.pre("save" , function(next){
  console.log("about to save " + " " +this.name);
  next();
});

EmployeeSchema.post("save", function(doc){
  console.log("saved document:" + doc.department);
})

EmployeeSchema.pre("find" , async function(){
  console.log("Query started at ");
  this.where({department:"IT"});
 
});

EmployeeSchema.pre("updateOne" , function(next){

  console.log("Update query is about to run" , this.getFilter() , this.getUpdate());
  next();

});


EmployeeSchema.post("deleteOne" , function(next){
  console.log("Delete query executed" , this.getFilter());
})

//* creating the model

const Employee = new mongoose.model("Employee", EmployeeSchema);

//* creating the document

const e1 = new Employee({
  name: "Dhoni",
  age: 45,
  department: "Cricket",
  salary: 2300000,
});

e1.save()
  .then(() => console.log("Employee data saved successfully"))
  .catch((err) => console.log("error occurred", err));

 

  

//*Create a document

// Employee.create({
//   name: "Lokesh",
//   age: 45,
//   department: "HR",
//   salary: 35000,
// })
//   .then(() => console.log("Employee data added successfully"))
//   .catch((err) => console.log("error occurred" + err));

// Employee.insertMany([
//   { name: "Ramesh", age: 43, department: "Finanace", salary: 40000 },

//   { name: "Gopal", age: 39, department: "IT", salary: 30000 },
// ])
//   .then(() => console.log("Multiple employee data added successfully"))
//   .catch((err) => console.log("error occurred" + err));

//* Find documents - find() , find by filter , findOne() , findById() ,

// Employee.find()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
//   Employee.find({department:'IT'}).then((data)=>console.log(data)).catch((err)=>console.log(err));

// Employee.findOne()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// Employee.findById("68e8be2b3e91dbab15491f7e")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// Employee.findById("68e8beea81eb1d2580f63c70")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

//   Employee.updateOne({name:"Lokesh"} , {$set:{salary:40000}}).then((data)=>console.log(data)).catch((err)=>console.log(err));

//   Employee.updateMany({department:'IT'}, {$set:{salary:60000}}).then(data=>console.log(data)).catch(err=>console.log(err));

// Employee.findByIdAndUpdate(
//   "68e75e1f41d85d41988f51b0",
//   { $set: { salary: 43000 } },
//   { new: true }
// )
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// Employee.deleteOne({name:'Ramesh'}).then(data=>console.log("Deleted Successfully")).catch(err=>console.log(err));
// Employee.deleteMany({name:'Sachin'}).then(data => console.log("Multiple documents deleted successfully")).catch(err=>console.log(err));

// Employee.findByIdAndDelete("68e8c031e534917af6206d7d").then(data=>console.log("Document deleted successfully")).catch(err=>console.log(err));

// Employee.find().limit(2).then(data=>console.log(data)).catch(err=>console.log(err));

// Employee.find().sort({salary:1}).then(data=>console.log(data)).catch(err=>console.log(err));

// Employee.find()
//   .select({ name: 1, department: 1 })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// Employee.find()
//   .select({ name: 1, department: 1, _id: 0 ,salary:1 })
//   .sort({ salary: 1 })
//   .limit(2)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

//* Find all employees whose age is in between 25 to 40;

// EmployeeSchema.query.byAge = function (age) {
//   return this.where({ age: age });
// };

const result = async () => {
//   try {
    // const result_1 = await Employee.find({age:{$gt:25 , $lt:40}});
    // console.log(result_1);

    // const result_2 = await Employee.find({ department:{$in:['IT' , 'HR']}});

    // console.log(result_2);

    // const result_3 = await Employee.find({name:{$regex:/^S/i}});

    // console.log(result_3);

    // const result_4 = await Employee.find({} , "name department");

    // console.log(result_4);

    // const result_5 = await Employee.find({}, {name:1 , department:1 , _id:1});

    // console.log(result_5);

    // const result_6 = await Employee.find().sort({salary:1});

    // console.log(result_6);

    // const result_7 = await Employee.find().limit(2);

    // console.log(result_7);

    // const result_8 = await Employee.find().skip(2);

    // console.log(result_8);

    // const result_9 = await Employee.find({department:'IT'}).select('name age salary');

    // console.log(result_9);

    // const result_10 = await Employee.find({ department: "IT" })
    //   .skip(1)
    //   .sort({ salary: -1 })
    //   .limit(3);

    // console.log(result_10);

    // const result_11_up = await Employee.findByIdAndUpdate("68e75d5aa19aa9f39e2f559a" , {salary:20000} , {new:true , runValidators:true}  );

    // const result_12_del =await Employee.deleteOne({name:'Sachin'});

    // const result_13_helper = await Employee.find().byAge(26);

    // const result_14_helper = await Employee.find({ age: { $gt: 25, $lt: 40 } })
    //   .where("department")
    //   .in(["IT", "HR"])
    //   .select("name age department");

    // console.log(result_14_helper);

    // console.log(result_13_helper);;

    // const result_15_helpers = await Employee.where("department").equals("IT").where("salary").gt(10000).select("name department salary");

    // console.log(result_15_helpers);

//     const result_16_helpers = await Employee.where("department")
//       .equals("IT")
//       .where("salary")
//       .in([43000, 25000])
//       .select({_id:0 , name:1 , salary:1});

//     console.log(result_16_helpers);
//   } catch (err) {
//     console.log(err);
//   }
   const e = await Employee.find({});
   console.log(e);

   const pre_mid_update = await Employee.updateOne({name:'Lokesh'},{ $set:{salary:500000 , department:'IT' , name:'Lokesh Kumar'}});

   console.log(pre_mid_update);

   const pre_mid_delete = await Employee.deleteOne({name:'Teldulker'});


   console.log(pre_mid_delete);
   
};

console.log(result());



