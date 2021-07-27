//auth route
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { TutorUser } = require("../models/tutorUser");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let tutorUser = await TutorUser.findOne({ email: req.body.email });
  if (!tutorUser) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    tutorUser.password
  );
  if (!validPassword) {
    res.status(400).send("Invalid email or password");
  }

  const token = tutorUser.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(25).required(),
    password: new PasswordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
    }),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
