//tutor route for the info and information

//again do check
const auth = require("../middleware/auth");
//this above
const { validate, Tutor } = require("../models/tutor");
const { TutorUser } = require("../models/tutorUser");
const { Subject } = require("../models/subject");
const { TutorProfile } = require("../models/tutorProfile");
const express = require("express");
const router = express.Router();

//getting all tutors from database
router.get("/", async (req, res) => {
  const tutors = await Tutor.find();
  res.send(tutors);
});

// getting a particular user based on ID
router.get("/:id", async (req, res) => {
  const tutor = await Tutor.findById(req.params.id);
  res.send(tutor);
});

//posting about a new user or adding a new user
router.post("/", auth, async (req, res) => {
  //validation error
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //tutorUser
  const tutorUser = await TutorUser.findById(req.body.tutorUserId);
  if (!tutorUser) {
    return res.status(404).send("Invalid tutorUser");
  }

  //subject
  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) {
    return res.status(404).send("Invalid Subject");
  }

  //tutorProfile

  const tutorProfile = await TutorProfile.findById(req.body.tutorProfileId);
  if (!tutorProfile) {
    return res.status(404).send("Invalid tutorProfile");
  }

  //create a new tutor
  let tutor = new Tutor({
    // tutorUser
    tutorUser: {
      _id: tutorUser._id,
      firstname: tutorUser.firstname,
      lastname: tutorUser.lastname,
      email: tutorUser.email,
    },
    // subject
    subject: {
      _id: subject._id,
      name: subject.name,
    },
    // hourlyRate
    hourlyRate: req.body.hourlyRate,
    // tutorProfile
    tutorProfile: {
      _id: tutorProfile._id,
      headline: tutorProfile.headline,
      description: tutorProfile.description,
    },
    // availability
    availability: req.body.availability,
  });

  await tutor.save();
  res.send(tutor);
});

//updating a tutor

router.put("/:id", auth, async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //tutorUser
  const tutorUser = await TutorUser.findById(req.body.tutorUserId);
  if (!tutorUser) {
    return res.status(404).send("Invalid tutorUser");
  }

  //subject
  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) {
    return res.status(404).send("Invalid Subject");
  }

  //tutorProfile

  const tutorProfile = await TutorProfile.findById(req.body.tutorProfileId);
  if (!tutorProfile) {
    return res.status(404).send("Invalid tutorProfile");
  }

  let tutor = await Tutor.findByIdAndUpdate(
    req.params.id,
    {
      tutorUser: {
        _id: tutorUser._id,
        firstname: tutorUser.firstname,
        lastname: tutorUser.lastname,
        email: tutorUser.email,
      },
      // subject
      subject: {
        _id: subject._id,
        name: subject.name,
      },
      // hourlyRate
      hourlyRate: req.body.hourlyRate,
      // tutorProfile
      tutorProfile: {
        _id: tutorProfile._id,
        headline: tutorProfile.headline,
        description: tutorProfile.description,
      },
      // availability
      availability: req.body.availability,
    },
    {
      new: true,
    }
  );
  if (!tutor) {
    return res
      .status(404)
      .send("The tutor you are trying to find is not available");
  }

  res.send(tutor);
});

// for deleting the tutor
router.delete("/:id", auth, async (req, res) => {
  //look for the tutor
  const tutor = await Tutor.findByIdAndRemove(req.params.id);

  //if tutor not available then show error
  if (!tutor) {
    return res
      .status(404)
      .send("The tutor you are trying to delete is not available");
  }

  res.send(tutor);
});

module.exports = router;
