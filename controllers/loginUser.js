const bcrypt = require("bcrypt");
const User = require("../database/models/User");

module.exports = (req, res) => {
  const { email, password } = req.body;

  // Step 1: Find the user by their email
  User.findOne({ email })
    .then((user) => {
      // Step 2: Check if a user with the provided email exists
      if (!user) {
        // If the user doesn't exist, redirect to the login page
        req.flash("error", "User not found");
        res.redirect("/auth/login");
        return;
      } else {
        // Step 3: Compare the provided password with the hashed password in the database
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              // Step 4: If the passwords match, store the user's session ID
              req.session.userId = user._id;

              // Step 5: Redirect to a new post creation page
              res.redirect("/post/new");
            } else {
              // Step 6: If the passwords don't match, redirect to the login page
              req.flash("error", "Incorrect password");
              res.redirect("/auth/login");
            }
          })
          .catch((error) => {
            // Handle bcrypt error, if any
            console.error("Bcrypt error:", error);
            req.flash("error", "Incorrect password");
            res.redirect("/auth/login");
          });
      }
    })
    .catch((error) => {
      // Handle database error, if any
      console.error("Database error:", error);
      req.flash("error", "Incorrect password");
      res.redirect("/auth/login");
    });
};
