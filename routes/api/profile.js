const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User Model
const User = require("../../models/User");

// @route /GET api/profile/test
// @desc Test profile route
// @acces Public
router.get("/test", (req, res) => {
  res.json({
    message: "Profile works"
  });
});

// @route /GET api/profile
// @desc Get current user profile
// @acces Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json();
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
