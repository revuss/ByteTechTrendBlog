module.exports = (req, res) => {
  // Destroy the user's session to log them out
  req.session.destroy((error) => {
    if (error) {
      console.error("Error destroying session:", error);
    }
    // Redirect to the home page or any other desired page after logout
    res.redirect("/auth/login");
  });
};
