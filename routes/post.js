const express = require("express"),
      router = express.Router(),
      Post = require("../models/post"),
      User = require("../models/user"),
      multer = require("multer"),
      { storage } = require("../cloudinary"),
      upload = multer({ storage }),
      { isLoggedIn } = require("../middleware");


router.get('/home', isLoggedIn, (req, res) => {
  Post.find({}, (err, posts) => {
    if(!err) {
      res.render("home", {posts: posts, currentUser: req.user});
    }
  });
});

router.get('/new', isLoggedIn, (req, res) => {
  res.render("new");
});

router.post('/', isLoggedIn, upload.single("image"), (req, res) => {
  let newPost = req.body.post;
  newPost.image = req.file.path;
  newPost.author = {
    id: req.user._id,
    username: req.user.username
  }
  Post.create(newPost, (err, post) => {
    if(!err) {
      User.findById(req.user._id, (err, user) => {
        if(!err) {
          user.posts.unshift(post);
          user.save();
          res.redirect("/home");
        }
      });
    }
  });
});

// router.get("*", (_, res) => {
//   res.render("404");
// });


module.exports = router;