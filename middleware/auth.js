const User = require("../database/models/User");

module.exports = async (req, res, next) => {
  if (!req.session.userId) {
    // If not authenticated, redirect to the login page
    return res.redirect("/auth/login");
  }

  try {
    // Verify if the user exists in the database by their session userId
    const user = await User.findById(req.session.userId);

    if (!user) {
      // If the user doesn't exist in the database, clear the session and redirect to login
      req.session.destroy(() => {
        res.redirect("/auth/login");
      });
    } else {
      // If authenticated and user exists, continue to the next middleware or route
      next();
    }
  } catch (error) {
    // Handle any errors that occur during database access
    console.error("Database error:", error);
    res.redirect("/auth/login");
  }
};
