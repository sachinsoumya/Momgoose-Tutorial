//* User and Posts relationship

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log("error in connection", err));

//* Defining the User Schema

(async function main() {
  try {
    const commentSchema = mongoose.Schema({
      content: String,
      likes: Number,
      re_comments: [String],
    });

    const Comment = mongoose.model("Comment", commentSchema);

    const comment_1 = await Comment.create({
      content: "Great post Simi",
      likes: 50,
      re_comments: ["Thanks uhh!", "🥰"],
    });

    console.log(`${comment_1} is crated successfully`);
    //* Defing the post schema
    const postSchema = new mongoose.Schema({
      caption: String,
      content: String,
      reach: Number,
      likes: Number,
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    });

    //*Creating model

    const Post = mongoose.model("Post", postSchema);

    //* Creating document and saving the document

    const post_1 = new Post({
      caption: "This is my first post",
      content: "Anything",
      reach: 10000,
      likes: 100,
    });

    await post_1.save();

    console.log("Post data saved successfully", post_1);

    const post_2 = new Post({
      caption: "This is my second post",
      content: "Hello world",
      reach: 5000,
      likes: 100,
    });

    await post_2.save();

    console.log("post 2 data saved successfully", post_2);

    const post_3 = new Post({
      caption: "This my Simi's life style",
      content: "Koran fan girl",
      reach: 8000,
      likes: 120,
      comments: [comment_1._id],
    });

    await post_3.save();
    console.log("Post 3 data saved successfully", post_3);

    const PeopleSchema = new mongoose.Schema({
      name: String,
      age: {
        type: Number,
        min: 18,
      },
      email: {
        type: String,
        unique: true,
        validate: {
          validator: function (v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },

          message: (props) => `${props.value} is not a valid email`,
        },
      },
      bio: String,

      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    });

  //   //* Create the user model

    const People = mongoose.model("People", PeopleSchema);

  //   //*Create the user document.

    const people_1 = new People({
      name: "Simi",
      age: 22,
      email: "simi@gmail.com",
      bio: "Hey I am a MCA student",
      posts: [post_3._id],
    });

    const savedDocument = await people_1.save();

    console.log(`${savedDocument.name}'s data saved successfully`);

   // console.log("People saved successfully", people_1);

  // const result = await People.findOne({ name: "Sachin" }).populate("posts");

    const result = await People.findOne({ name: "Lopa" }).populate({
      path: "posts",
      populate: { path: "comments" },
    });

    console.log(`${result.name}'s data is:`, result.posts[0].comments);

    //*Defining posts schema

    //* Creating posts model

    //* Creating document

    //* save the document
  } catch (err) {
    if (err.code === 1100) {
      console.error(err.errmsg);
    } else {
      console.error("error in saving people data", err);
    }
  }
})();
