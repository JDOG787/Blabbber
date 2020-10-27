const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const schema = new mongoose.Schema({
  username: String,
  password: String
  // later add:
  // Posts
  // bio
  // followers
  // following
  // profile picture
});

schema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", schema);