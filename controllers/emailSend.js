const emailIDs = require("../database/models/emailSubs");

module.exports = (req, res) => {
  emailIDs
    .create(req.body)
    .then((success) => res.redirect("/"))
    .catch((error) => console.log(error));
};
