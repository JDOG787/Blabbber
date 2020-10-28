const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const schema = new mongoose.Schema({
  username: String,
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
    }
  ]
  
  // later add:
  // bio
  // followers
  // following
  // profile picture
});

schema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", schema);