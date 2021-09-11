//book a meeting with the tutor
const studentAuth = require("../middleware/studentAuth");
const { validate, Booking } = require("../models/booking");
const { TutorUser } = require("../models/tutorUser");
const { Subject } = require("../models/subject");
const { TutorProfile } = require("../models/tutorProfile");
const { Student } = require("../models/student");
const { Tutor } = require("../models/tutor");
const express = require("express");
const router = express.Router();
//schema
//model
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.send(bookings);
});

router.get("/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  res.send(booking);
});

router.post("/", studentAuth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //student
  const student = await Student.findById(req.body.studentId);
  if (!student) {
    return res.status(404).send("Invalid Student");
  }
  //tutor
  const tutor = await Tutor.findById(req.body.tutorId);
  if (!tutor) {
    return res.status(404).send("Invalid tutor");
  }

  // //tutorUser
  // const tutorUser = await TutorUser.findById(req.body.tutorUserId);
  // if (!tutorUser) {
  //   return res.status(404).send("Invalid tutorUser");
  // }

  // //subject
  // const subject = await Subject.findById(req.body.subjectId);
  // if (!subject) {
  //   return res.status(404).send("Invalid Subject");
  // }

  // //tutorProfile

  // const tutorProfile = await TutorProfile.findById(req.body.tutorProfileId);
  // if (!tutorProfile) {
  //   return res.status(404).send("Invalid tutorProfile");
  // }

  //create a new booking
  let booking = new Booking({
    // student
    student: {
      _id: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
    },
    // tutor
    tutor: {
      _id: tutor._id,
      //   //tutorUser
      //   tutorUser: {
      //     _id: tutorUser._id,
      //     firstname: tutorUser.firstname,
      //     lastname: tutorUser.lastname,
      //     email: tutorUser.email,
      //   },
      //   // subject
      //   subject: {
      //     _id: subject._id,
      //     name: subject.name,
      //   },
      // hourlyRate
      hourlyRate: tutor.hourlyRate,
      //   // tutorProfile
      //   tutorProfile: {
      //     _id: tutorProfile._id,
      //     headline: tutorProfile.headline,
      //     description: tutorProfile.description,
      //   },
      // availability
      availability: tutor.availability,
    },
    // rentalfee
    rentalfee: req.body.rentalfee,
    // time
    time: req.body.time,
    // payment
    payment: req.body.payment,
  });
  await booking.save();
  res.send(booking);
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
  //tutor
  const tutor = await Tutor.findById(req.body.tutorId);
  if (!tutor) {
    return res.status(404).send("Invalid tutor");
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

  let booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      // student
      student: {
        _id: student._id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
      },
      // tutor
      tutor: {
        _id: tutor._id,
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
      },
      // rentalfee
      rentalfee: req.body.rentalfee,
      // time
      time: req.body.time,
      // payment
      payment: req.body.payment,
    },
    { new: true }
  );

  if (!booking) {
    return res
      .status(404)
      .send("The booking you are trying to find is not available");
  }

  res.send(movie);
});

router.delete("/:id", studentAuth, async (req, res) => {
  const booking = await Booking.findByIdAndRemove(req.params.id);

  if (!booking) {
    return res
      .status(404)
      .send("The booking you are trying to delete is not available");
  }

  res.send(booking);
});

module.exports = router;
