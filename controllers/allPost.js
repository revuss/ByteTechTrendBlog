const Post = require("../database/models/Post");
module.exports = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ _id: -1 });
    res.render("lifestyle", { activeRoute: "/allPosts", posts }); // Pass "posts" as an object property
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
