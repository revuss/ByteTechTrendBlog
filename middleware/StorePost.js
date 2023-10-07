module.exports = (req, res, next) => {
  if (
    !req.body.content ||
    !req.body.imageTag ||
    !req.body.title ||
    !req.body.subtitle
  ) {
    return res.redirect("/post/new");
  }

  next();
};
