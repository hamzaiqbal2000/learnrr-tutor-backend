const express = require("express");
const subjects = require("../routes/subjects");
const tutorProfiles = require("../routes/tutorProfiles");
const tutors = require("../routes/tutors");
const requests = require("../routes/requests");
const bookings = require("../routes/bookings");
const tutorUsers = require("../routes/tutorUsers");
const students = require("../routes/students");
const auth = require("../routes/auth");
const studentAuth = require("../routes/studentAuth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  //tutorUsers
  app.use("/api/tutorUsers", tutorUsers);
  //tutorProfiles
  app.use("/api/tutorProfiles", tutorProfiles);
  //subjects
  app.use("/api/subjects", subjects);
  //students
  app.use("/api/students", students);
  //tutors
  app.use("/api/tutors", tutors);
  //booking
  app.use("/api/bookings", bookings);
  //requests
  app.use("/api/requests", requests);
  //auth
  app.use("/api/auth", auth);
  //studentAuth
  app.use("/api/studentAuth", studentAuth);

  app.use(error);
};
