const studentAuth = require("../middleware/studentAuth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validate, Student } = require("../models/student");
const express = require("express");
const router = express.Router();

router.get("/me", studentAuth, async (req, res) => {
  const student = await Student.findById(req.student._id).select("-password");
  res.send(student);
});

//REGISTER ROUTE FOR STUDENT
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = await Student.findOne({ email: req.body.email });
  if (student) return res.status(400).send("Invalid email or password");

  student = new Student(
    // firstname: req.body.firstname,
    // lastname: req.body.lastname,
    // email: req.body.lastname,
    // password: req.body.password
    _.pick(req.body, ["_id", "firstname", "lastname", "email", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);

  await student.save();

  const token = student.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(student, ["_id", "firstname", "lastname", "email"]));
});

module.exports = router;
