const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
//Validation
const validatePost = require("../../validation/post");

// @route /POST api/posts
// @desc Create post
// @acces Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      user: req.user.id,
      name: req.body.name,
      avatar: req.body.avatar,
      text: req.body.text
    });
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(500).json(err));
  }
);

// @route /GET api/posts
// @desc Get all posts
// @acces Public
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(posts => {
      if (!posts) {
        return res.status(404).json({ nopostfound: "No posts found" });
      }
      res.json(posts);
    })
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

// @route /GET api/posts/:post_id
// @desc Get post by id
// @acces Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (!post) {
        return res
          .status(404)
          .json({ nopostfound: "No post found with that ID" });
      }
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route /DELETE api/posts/:post_id
// @desc Delete post by id
// @acces Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (!post) {
        return res
          .status(404)
          .json({ nopostfound: "No post found with that ID" });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      post
        .remove()
        .then(post => res.json({ success: true }))
        .catch(err => res.status(404).end());
    });
  }
);

// @route /PUT api/posts/:post_id
// @desc Update post by id
// @acces Private
router.put(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.post_id).then(post => {
      if (!post) {
        return res
          .status(404)
          .json({ nopostfound: "No post found with that ID" });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      post.text = req.body.text;
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(404).end());
    });
  }
);
module.exports = router;
