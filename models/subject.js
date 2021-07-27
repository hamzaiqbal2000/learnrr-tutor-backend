const Joi = require("joi");
const mongoose = require("mongoose");

//schema

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

function validateSubject(subject) {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(subject, schema);
}

exports.subjectSchema = subjectSchema;
exports.Subject = Subject;
exports.validate = validateSubject;
