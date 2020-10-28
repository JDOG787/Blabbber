const express = require('express'),
      app = express(),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      User = require("./models/user");

require("./mongo")();
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(bodyParser.urlencoded({extended: true}));

// AUTH
app.use(require("express-session")({
  secret: "Blabber social media",
  resave: false,
  saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
app.use(require("./routes/site"));
app.use(require("./routes/auth"));

app.listen(8080);