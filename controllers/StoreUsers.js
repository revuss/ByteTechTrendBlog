const User = require("../database/models/User");

module.exports = (req, res) => {
  User.create(req.body)
    .then((success) => res.redirect("/auth/login"))
    .catch((error) => {
      if (error.code === 11000 && error.keyPattern.email) {
        // If the email is not unique
        req.flash("error", "Email already exists");
      } else if (error.code === 11000 && error.keyPattern.username) {
        // If the username is not unique
        req.flash("error", "Username already exists");
      } else {
        req.flash("error", errorMessages);
      }
      res.redirect("/auth/signup");
    });
};
