const Joi = require("joi");
const { subjectSchema } = require("./subject");
const { tutorProfileSchema } = require("./tutorProfile");
const mongoose = require("mongoose");

//schema
//model

const tutorSchema = new mongoose.Schema({
  tutorUser: {
    type: new mongoose.Schema({
      firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      },
    }),
    required: true,
  },

  subject: {
    type: subjectSchema,
    required: true,
  },

  hourlyRate: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 10,
  },

  //profilePicture
  //profile -> headline, description
  tutorProfile: {
    type: tutorProfileSchema,
    required: true,
  },
  //availablity
  availability: [
    {
      type: String,
      required: true,
    },
  ],
});

const Tutor = mongoose.model("Tutor", tutorSchema);

function validatetutor(tutor) {
  const schema = {
    tutorUserId: Joi.objectId().required(),
    subjectId: Joi.string().required(),
    tutorProfileId: Joi.objectId().required(),
    hourlyRate: Joi.number().required(),
    availability: Joi.string().required(),
  };

  return Joi.validate(tutor, schema);
}

exports.Tutor = Tutor;
exports.validate = validatetutor;
