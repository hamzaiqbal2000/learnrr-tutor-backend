const Joi = require("joi");
const mongoose = require("mongoose");

//schema
//model

const tutorProfileSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 520,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 20000,
  },
});

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

function validateTutorProfile(tutorProfile) {
  const schema = {
    headline: Joi.string().min(6).max(520).required(),
    description: Joi.string().min(50).max(20000).required(),
  };

  return Joi.validate(tutorProfile, schema);
}

exports.tutorProfileSchema = tutorProfileSchema;
exports.TutorProfile = TutorProfile;
exports.validate = validateTutorProfile;
