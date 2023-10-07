module.exports = (req, res) => {
  const flashMessages = {
    error: req.flash("error"),
    // Add more flash message types as needed
  };
  res.render("login", { activeRoute: "/post/new", flashMessages });
};
