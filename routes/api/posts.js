const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
//Validation
const validatePost = require("../../validation/post");
const validateComment = validatePost;
// @route /POST api/posts
// @desc Create post
// @acces Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validatePost(req.body);
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
    .sort({
      date: -1
    })
    .then(posts => {
      if (!posts) {
        return res.status(404).json({
          nopostfound: "No posts found"
        });
      }
      res.json(posts);
    })
    .catch(err => res.status(404).json({
      nopostfound: "No posts found"
    }));
});

// @route /GET api/posts/:post_id
// @desc Get post by id
// @acces Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (!post) {
        return res.status(404).json({
          nopostfound: "No post found with that ID"
        });
      }
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({
        nopostfound: "No post found with that ID"
      })
    );
});

// @route /DELETE api/posts/:post_id
// @desc Delete post by id
// @acces Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (!post) {
        return res.status(404).json({
          nopostfound: "No post found with that ID"
        });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          notauthorized: "User not authorized"
        });
      }
      post.remove()
        .then(post => res.json({
          success: true
        }))
        .catch(err => res.status(404).end());
    });
  }
);

// @route /PUT api/posts/:post_id
// @desc Update post by id
// @acces Private
router.put("/:post_id", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validatePost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(req.params.post_id).then(post => {
    if (!post) {
      return res.status(404).json({
        nopostfound: "No post found with that ID"
      });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        notauthorized: "User not authorized"
      });
    }
    post.text = req.body.text;
    post.save()
      .then(post => res.json(post))
      .catch(err => res.status(404).end());
  });
});

// @route /POST api/posts/like/:post_id
// @desc Like post
// @acces Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (!post) {
        return res.status(404).json({
          nopostfound: "No post found with that ID"
        });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          notauthorized: "User not authorized"
        });
      }
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({
          alreadyliked: "User already liked this post"
        });
      }
      post.likes.unshift({
        user: req.user.id
      });
      post.save()
        .then(post => res.json(post))
        .catch(err => res.status(404).end());
    });
  }
);

// @route /POST api/posts/unlike/:post_id
// @desc Unlike post
// @acces Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (!post) {
        return res.status(404).json({
          nopostfound: "No post found with that ID"
        });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          notauthorized: "User not authorized"
        });
      }
      if (!post.likes.filter(like => like.user.toString() === req.user.id).length) {
        return res.status(400).json({
          notliked: 'You have not liked this post yet'
        });
      }
      post.likes = post.likes.filter(
        like => like.user.toString() !== req.user.id
      );
      post.save()
        .then(post => res.json(post))
        .catch(err => res.status(404).end());
    });
  }
);

// @route /POST api/posts/comment/:post_id
// @desc Add comment to post
// @acces Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateComment(req.body);

    if (!isValid) {
      return res.status(400).json(errors)
    }
    Post.findById(req.params.post_id).then(post => {
      if (!post) {
        return res.status(404).json({
          nopostfound: "No post found with that ID"
        });
      }
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      post.save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json({
          nopostfound: 'No post found'
        }));
    });
  })

// @route /DELETE api/posts/comment/:post_id/:comment_id
// @desc Remove comment fr post
// @acces Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (!post) {
        return res.status(404).json({
          nopostfound: "No post found with that ID"
        });
      }
      const comment = post.comments.find(comment => comment.id === req.params.comment_id);
      if (!comment) {
        return res.status(404).json({
          commentnotexists: 'Comment does not exists'
        });
      }
      if (comment.user.toString() !== req.user.id) {
        console.log(comment.user, req.user.id);
        return res.status(401).json({
          notauthorized: "User not authorized"
        });
      }
      post.comments = post.comments.filter(comment => comment.id.toString() !== req.params.comment_id);
      post.save()
        .then(post => {
          res.json(post)
        })
      // post.comments.unshift(newComment);
      // post.save()
      //   .then(post => res.json(post))
      //   .catch(err => res.status(404).json({
      //     nopostfound: 'No post found'
      //   }));
    });
  })
module.exports = router;