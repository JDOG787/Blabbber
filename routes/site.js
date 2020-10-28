const express = require("express"),
      router = express.Router(),
      Post = require("../models/post"),
      multer = require("multer"),
      { storage } = require("../cloudinary"),
      upload = multer({ storage });

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if(!err) {
      res.render("index", {posts: posts});
    }
  });
});

router.get('/new', (req, res) => {
  res.render("new");
});

router.post('/', upload.single("image"), (req, res) => {
  let newPost = req.body.post;
  newPost.image = req.file.path;
  Post.create(newPost, (err, post) => {
    if(!err) {
      res.redirect("/");
    }
  });
});

module.exports = router;