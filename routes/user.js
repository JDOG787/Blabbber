const express = require("express"),
      router = express.Router(),
      User = require("../models/user"),
      multer = require("multer"),
      { storage } = require("../cloudinary"),
      upload = multer({ storage }),
      { isLoggedIn } = require("../middleware");


router.get('/@:username', isLoggedIn, (req, res) => {
  User.find({username: req.params.username}).populate("posts").exec((err, user) => {
    if (!err) {
      if (user[0] === undefined) return res.redirect("*");
      res.render("profile", {user: user[0], isOwner: req.user.username === user[0].username});
    }
  });
});

router.get("/profile/edit", isLoggedIn, (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if(!err) {
      res.render("edit-profile", {user: user});
    }
  });
});

router.put("/profile/edit", isLoggedIn, upload.single("image"), (req, res) => {
  let updatedProfile = {
    bio: req.body.bio,
  }
  if (req.file) {
    updatedProfile.profileImage = req.file.path;
  } 
  User.findByIdAndUpdate(req.user._id, updatedProfile, (err, user) => {
    if(!err) {
      res.redirect("/@"+user.username);
    }
  });
});

module.exports = router;