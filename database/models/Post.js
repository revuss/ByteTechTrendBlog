const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  username: String,
  createdAt: { type: Date, default: new Date() },
  imageTag: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
