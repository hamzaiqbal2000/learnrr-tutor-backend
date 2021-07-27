//again do check
const auth = require("../middleware/auth");
//this above
const { validate, TutorProfile } = require("../models/tutorProfile");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tutorProfiles = await TutorProfile.find();
  res.send(tutorProfiles);
});

router.get("/:id", async (req, res) => {
  const tutorProfiles = await TutorProfile.findById(req.params.id);
  res.send(tutorProfiles);
});

router.post("/", auth, async (req, res) => {
  //validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //create a new tutor profile
  let tutorProfile = new TutorProfile({
    headline: req.body.headline,
    description: req.body.description,
  });

  await tutorProfile.save();
  res.send(tutorProfile);
});

router.put("/:id", auth, async (req, res) => {
  //validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find and update
  const tutorProfile = await TutorProfile.findByIdAndUpdate(
    req.params.id,
    {
      headline: req.body.headline,
      description: req.body.description,
    },
    { new: true }
  );

  if (!tutorProfile)
    return res
      .status(404)
      .send("The tutor profile you are trying to update is not available");
  res.send(tutorProfile);
});

router.delete("/:id", auth, async (req, res) => {
  const tutorProfile = await TutorProfile.findByIdAndRemove(req.params.id);
  if (!tutorProfile)
    return res
      .status(404)
      .send("The tutorProfile you are trying to delete is not available");

  res.send(tutorProfile);
});

module.exports = router;
