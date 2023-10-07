module.exports = (req, res) => {
  const flashMessages = {
    error: req.flash("error"),
    // Add more flash message types as needed
  };
  res.render(
    "signUp",
    { activeRoute: "/post/new", flashMessages }
    // { values: req.session.registrationErrors }
  );
};
