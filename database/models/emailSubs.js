const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  emailId: String,
});

const emailIDs = mongoose.model("emailIDs", PostSchema);

module.exports = emailIDs;
