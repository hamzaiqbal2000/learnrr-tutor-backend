const { Subject, validate } = require("../models/subject");
const express = require("express");
const router = express.Router();

//schema
//model
//requests
router.get("/", async (req, res) => {
  const subject = await Subject.find().sort("name");
  res.send(subject);
});

router.get("/:id", async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.send(subject);
});

router.post("/", async (req, res) => {
  //validating
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //creating a new subject object
  const subject = new Subject({
    name: req.body.name,
  });

  await subject.save();
  res.send(subject);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find id
  //then update
  let subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  //if no subject then return error
  if (!subject)
    return res
      .status(404)
      .send("The subject you are trying to update is not available");
  //return the result
  res.send(subject);
});

router.delete("/:id", async (req, res) => {
  const subject = await Subject.findByIdAndRemove(req.params.id);

  //if not available return an error
  if (!subject)
    return res.status(404).send("The subject you are trying is not available");

  //return the course
  res.send(subject);
});

module.exports = router;
