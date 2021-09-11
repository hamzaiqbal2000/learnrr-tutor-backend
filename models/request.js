//request of a student
const Joi = require("joi");
const { subjectSchema } = require("./subject");
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  student: {
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

  description: {
    type: String,
    required: true,
  },
});

const Request = mongoose.model("Request", requestSchema);

function validateRequest(request) {
  const schema = {
    studentId: Joi.objectId().required(),
    subjectId: Joi.objectId().required(),
    description: Joi.string().required(),
  };

  return Joi.validate(request, schema);
}

exports.Request = Request;
exports.validate = validateRequest;
