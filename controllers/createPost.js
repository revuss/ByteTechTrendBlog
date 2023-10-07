const Post = require("../database/models/Post");
const User = require("../database/models/User");

module.exports = (req, res) => {
  res.render("addPageBlog", { activeRoute: "/post/new" });
};
