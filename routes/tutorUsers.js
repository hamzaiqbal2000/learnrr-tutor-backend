//Register route for tutors

const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { TutorUser, validate } = require("../models/tutorUser");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const tutorUser = await TutorUser.findById(req.tutorUser._id).select(
    "-password"
  );
  res.send(tutorUser);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let tutorUser = await TutorUser.findOne({ email: req.body.email });
  if (tutorUser) return res.status(400).send("User already registered");

  tutorUser = new TutorUser(
    // firstname: req.body.firstname,
    // lastname: req.body.lastname,
    // email: req.body.lastname,
    // password: req.body.password,
    _.pick(req.body, ["_id", "firstname", "lastname", "email", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  tutorUser.password = await bcrypt.hash(tutorUser.password, salt);

  await tutorUser.save();

  const token = tutorUser.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(tutorUser, ["_id", "firstname", "lastname", "email"]));
});

module.exports = router;
