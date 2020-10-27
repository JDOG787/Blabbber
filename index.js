const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("./mongo")();
const Post = require("./models/post");
const User = require("./models/user");
const bodyParser =require("body-parser");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary,
  folder: "blabber",
  allowedFormats: ["png", "jpeg", "jpg"]
});
const multer = require("multer");
const upload = multer({ storage });
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");



app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(bodyParser.urlencoded({extended: true}));
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



app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if(!err) {
      res.render("index", {posts: posts});
    }
  });
});

app.get('/new', (req, res) => {
  res.render("new");
});

app.post('/', upload.single("image"), (req, res) => {
  let newPost = req.body.post;
  newPost.image = req.file.path;
  Post.create(newPost, (err, post) => {
    if(!err) {
      res.redirect("/");
    }
  });
});

app.get('/signup', (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), (req, res) => {
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect("/");
});


app.listen(8080);