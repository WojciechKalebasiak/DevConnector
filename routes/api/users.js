const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//Load user model
const User = require("../../models/User");
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
module.exports = router;
