const User = require("../database/models/User");

module.exports = async (req, res, next) => {
  // Check if the user is already signed in (e.g., based on the presence of a session variable)
  if (req.session.userId) {
    try {
      // Verify if the user exists in the database by their session userId
      const user = await User.findById(req.session.userId);

      if (!user) {
        // If the user doesn't exist in the database, clear the session and redirect to login
        req.session.destroy(() => {
          return res.redirect("/auth/signup");
        });
      } else {
        // If the user is valid, continue to the next middleware or route
        return res.redirect("/post/new");
      }
    } catch (error) {
      // Handle any errors that occur during database access
      console.error("Database error:", error);
      res.redirect("/auth/signup");
    }
  } else {
    // If not signed in, continue to the next middleware or route
    next();
  }
};
