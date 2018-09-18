const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key.json");
const passport = require("passport");

//Load user model
const User = require("../../models/User");

//Load validators
const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

// @route /GET api/users/test
// @desc Test users route
// @acces Public
router.get("/test", (req, res) => {
  res.json({
    message: "Users works"
  });
});

// @route /POST api/users/register
// @desc Register a user
// @acces Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, name, password } = req.body;
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
      const newUser = new User({
        email,
        name,
        password: hashedPassword,
        avatar
      });
      return newUser.save();
    })
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(400).json(err.message));
});

// @route /POST api/users/login
// @desc Login User / Returning JWT Token
// @acces Public
router.post("/login", (req, res) => {
  const {errors, isValid} = validateLogin(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }
      bcrypt.compare(password, user.password).then(isCorrect => {
        if (isCorrect) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          });
        } else {
          res.status(401).json({ password: "Password not correct" });
        }
      });
    })
    .catch(e => res.status(500).json({ msg: "Something went wrong" }));
});

// @route /POST api/users/current
// @desc Return current user
// @acces Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
