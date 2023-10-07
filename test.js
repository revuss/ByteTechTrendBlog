const mongoose = require("mongoose");
const Post = require("./database/models/Post");
const mongoURI = "mongodb://localhost:27017/";

mongoose
  .connect(mongoURI)
  .then((success) => console.log("connected"))
  .catch((error) => console.log(error));

//
Post.find({
  title: "My Second Blog",
})
  .then((posts) => console.log(posts))
  .catch((error) => console.log(error));
