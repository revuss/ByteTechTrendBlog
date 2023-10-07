const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  try {
    const SinglePost = await Post.findById(req.params.id);
    // const posts = await Post.find({}).sort({ _id: -1 }).limit(5);

    //

    const posts = await Post.find({ _id: { $ne: SinglePost.id } })
      .sort({ _id: -1 })
      .limit(5);
    //

    res.render("single", { activeRoute: "/", SinglePost, posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
