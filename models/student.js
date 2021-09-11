const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");

//schema

const studentSchema = new mongoose.Schema({
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
  // phone: {
  //   type: Number,
  //   required: true,
  //   minlength: 11,
  //   maxlength: 11,
  // },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: String,
    minlength: 8,
    maxlength: 1024,
  },
});

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

//model

const Student = mongoose.model("Student", studentSchema);

function validateStudent(student) {
  const schema = {
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    //phone: Joi.number().min(11).max(11).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: new PasswordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
    }),
  };

  return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validate = validateStudent;
