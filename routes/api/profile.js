const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Validation
const validateProfile = require("../../validation/profile");
const validateExperience = require("../../validation/experience");
const validateEducation = require("../../validation/education");

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
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => console.log(err));
  }
);

// @route /POST api/profile
// @desc Create or edit user profile
// @acces Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Get fields
    let profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.status(200).json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields)
            .save()
            .then(profile => res.status(201).json(profile));
        });
      }
    });
  }
);

// @route /GET api/profile/all
// @desc Get all profile
// @acces Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json();
      }
      res.json(profiles);
    })
    .catch(() => res.status(404).json({ profile: "There is no profiles" }));
});

// @route /GET api/handle/:handle
// @desc Get profile by handle
// @acces Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  const { handle } = req.params;
  Profile.findOne({ handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(500).json(err));
});

// @route /GET api/profile/user/:user_id
// @desc Get profile by user's id
// @acces Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  const { user_id } = req.params;
  Profile.findOne({ user: user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route /POST api/profile/experience
// @desc Add experience to profile
// @acces Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateExperience(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(newExperience);
      profile.save().then(updatedProfile => {
        res.json(updatedProfile);
      });
    });
  }
);

// @route /POST api/profile/education
// @desc Add education to profile
// @acces Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateEducation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description
      };

      profile.education.unshift(newEducation);
      profile.save().then(updatedProfile => {
        res.json(updatedProfile);
      });
    });
  }
);

// @route /DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @acces Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.experience = profile.experience.filter(
          exp => exp.id !== req.params.exp_id
        );
        profile.save().then(profile => {
          res.json(profile);
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route /DELETE api/profile/education/:edu_id
// @desc Delete education from profile
// @acces Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.education = profile.education.filter(
          edu => edu.id !== req.params.edu_id
        );
        profile.save().then(profile => {
          res.json(profile);
        });
      })
      .catch(err => res.status(404).json(err));
  }
);
// @route /DELETE api/profile/
// @desc Delete user and profile
// @acces Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findByIdAndRemove(req.user.id).then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
