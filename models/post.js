const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", schema);