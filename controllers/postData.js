const Post = require("../database/models/Post");

module.exports = (req, res) => {
  console.log(req.files);
  Post.create(req.body)
    .then((success) => res.redirect("/"))
    .catch((error) => console.log(error));
};
