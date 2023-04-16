const mongoose = require("mongoose");

var timewithsec = new Date().toLocaleTimeString();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  avatar: {
    type: Buffer,
  },
  timestamp: {
    type: Date,
    default: timewithsec.substring(0, timewithsec.length - 6),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
