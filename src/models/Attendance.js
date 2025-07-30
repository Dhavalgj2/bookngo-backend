const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  adults: {
    type: Number,
    required: true,
    trim: true,
  },
  child5to12: {
    type: Number,
    required: true,
    trim: true,
  },
  childbelow5: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("attendance", attendanceSchema);
