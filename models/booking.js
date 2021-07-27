const Joi = require("joi");
const { subjectSchema } = require("./subject");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  //student
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
      phone: {
        type: Number,
        required: true,
        minlength: 11,
        maxlength: 11,
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      },
    }),
  },
  //tutor
  tutor: {
    type: new mongoose.Schema({
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

      //availablity
      availability: [
        {
          type: new mongoose.Schema({
            day: String,
            timming: Date,
          }),
          required: true,
        },
      ],
    }),
  },
  //rental fee
  rentalfee: {
    type: Number,
    required: true,
  },
  //time
  time: {
    type: Date,
    required: true,
  },
  //payment
  payment: {
    type: Boolean,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

function validatebooking(booking) {
  const schema = {
    studentId: Joi.objectId().required(),
    tutorId: Joi.objectId().required(),
  };

  return Joi.validate(booking, schema);
}

exports.Booking = Booking;
exports.validate = validatebooking;
