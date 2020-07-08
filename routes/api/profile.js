const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateOnlineServicesInput = require("../../validation/onlineservices");
const validateLogisticsInput = require("../../validation/logistics");
const validateTravellingInput = require("../../validation/travelling");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.totalbills) profileFields.totalbills = req.body.totalbills;
    if (req.body.currentbalance)
      profileFields.currentbalance = req.body.currentbalance;
    if (req.body.allocatedbalance)
      profileFields.allocatedbalance = req.body.allocatedbalance;
    if (req.body.remainingbalance)
      profileFields.remainingbalance = req.body.remainingbalance;
    if (req.body.totalbalance)
      profileFields.totalbalance = req.body.totalbalance;

    // Skills - Spilt into array
    // if (typeof req.body.skills !== 'undefined') {
    // profileFields.skills = req.body.skills.split(',');
    // }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
// @route   POST api/profile/onlineservices
// @desc    Add onlineservices to profile
// @access  Private
router.post(
  "/onlineservices",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOnlineServicesInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newOnlineServices = {
        date: req.body.date,
        description: req.body.description,
        quantity: req.body.quantity,
        onlinecategory: req.body.onlinecategory,
        cost: req.body.cost
      };

      // Add to OnlineServices array
      profile.onlineservices.unshift(newOnlineServices);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/logistics
// @desc    Add onlineservices to profile
// @access  Private
router.post(
  "/logistics",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateLogisticsInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newLogistics = {
        date: req.body.date,
        description: req.body.description,
        quantity: req.body.quantity,
        logisticscategory: req.body.logisticscategory,
        cost: req.body.cost
      };

      // Add to Logistics array
      profile.logistics.unshift(newLogistics);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/travelling
// @desc    Add travelling to profile
// @access  Private
router.post(
  "/travelling",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTravellingInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newTravelling = {
        date: req.body.date,
        description: req.body.description,
        quantity: req.body.quantity,
        travellingcategory: req.body.travellingcategory,
        cost: req.body.cost
      };

      // Add to travelling array
      profile.travelling.unshift(newTravelling);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/onlineservices/:onservices_id
// @desc    Delete onlineservices from profile
// @access  Private
router.delete(
  "/onlineservices/:onservices_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.onlineservices
          .map(item => item.id)
          .indexOf(req.params.onservices_id);

        // Splice out of array
        profile.onlineservices.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/logistics/:logts_id
// @desc    Delete logistics from profile
// @access  Private
router.delete(
  "/logistics/:logts_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.logistics
          .map(item => item.id)
          .indexOf(req.params.logts_id);

        // Splice out of array
        profile.logistics.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
// @route   DELETE api/profile/travelling/:travg_id
// @desc    Delete travelling from profile
// @access  Private
router.delete(
  "/travelling/:travg_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.travelling
          .map(item => item.id)
          .indexOf(req.params.travg_id);

        // Splice out of array
        profile.travelling.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
