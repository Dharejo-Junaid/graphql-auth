const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"],
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Password must contain at least 8 characters"],
    maxlength: [16, "Password must be no more than 16 characters"],
  },

  verified: {
    type: Boolean,
    default: false,
    enum: [true, false],
  },
});

module.exports = model("user", userSchema);
