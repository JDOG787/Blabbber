const express = require("express"),
      router = express.Router(),
      User = require("../models/user"),
      passport =require("passport");


router.get('/signup', (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
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

router.get('/login', (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), (req, res) => {
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;