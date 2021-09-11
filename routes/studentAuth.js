const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Student } = require("../models/student");
const express = require("express");
const router = express.Router();

//REGISTER ROUTE FOR STUDENT
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = await Student.findOne({ email: req.body.email });
  if (!student) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = student.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
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
