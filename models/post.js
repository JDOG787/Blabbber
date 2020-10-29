const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Post", schema);