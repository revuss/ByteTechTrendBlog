const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ _id: -1 }).limit(3);
    res.render("index", { activeRoute: "/", posts }); // Pass "posts" as an object property
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
