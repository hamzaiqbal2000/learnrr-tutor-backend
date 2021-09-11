// for requests by the students to hire a teacher
const studentAuth = require("../middleware/studentAuth");
const { validate, Request } = require("../models/request");
const express = require("express");
const { Subject } = require("../models/subject");
const { Student } = require("../models/student");
const router = express.Router();

router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.send(requests);
});

router.get("/:id", async (req, res) => {
  const request = await Request.findById(req.params.id);
  res.send(request);
});

router.post("/", studentAuth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //student
  const student = await Student.findById(req.body.studentId);
  if (!student) {
    return res.status(404).send("Invalid Student");
  }
  //subject
  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) {
    return res.status(404).send("Invalid Subject");
  }
  //create a new request
  let request = new Request({
    // student
    student: {
      _id: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
    },
    // subject
    subject: {
      _id: subject._id,
      name: subject.name,
    },
    // description
    description: req.body.description,
  });

  await request.save();
  res.send(request);
});

router.put("/:id", studentAuth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //student
  const student = await Student.findById(req.body.studentId);
  if (!student) {
    return res.status(404).send("Invalid Student");
  }
  //subject
  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) {
    return res.status(404).send("Invalid Subject");
  }

  let request = await Request.findByIdAndUpdate(
    req.params.id,
    {
      // student
      student: {
        _id: student._id,
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
      },
      // subject
      subject: {
        _id: subject._id,
        name: subject.name,
      },
      // description
      description: req.body.description,
    },
    { new: true }
  );
  if (!request) {
    return res
      .status(404)
      .send("The request you are trying to find is not available");
  }
  res.send(request);
});

router.delete("/:id", studentAuth, async (req, res) => {
  const request = await Request.findByIdAndRemove(req.params.id);

  if (!request) {
    return res
      .status(404)
      .send("The request you are trying to delete is not available");
  }

  res.send(request);
});

module.exports = router;
