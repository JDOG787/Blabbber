module.exports = () => {
  const mongoose = require("mongoose");

  mongoose.set('useFindAndModify', false);
  mongoose.connect(process.env.URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to the db")
  });
}