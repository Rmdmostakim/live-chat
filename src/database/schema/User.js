const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: [
        {
          validator: function (name) {
            // Check if name contains only letters
            const letterRegex = /^[A-Za-z]+$/;
            return letterRegex.test(name);
          },
          message: "Name should contain only letters A-Z or a-z",
        },
      ],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: function (phoneNumber) {
            // Check if phone number is greater than 10 and less than 14 digits
            return phoneNumber.length > 10 && phoneNumber.length < 14;
          },
          message:
            "Phone number should be greater than 10 digits and less than 14 digits",
        },
      ],
    },
    password: {
      type: String,
      required: true,
      validate: [
        {
          validator: (password) => {
            // Minimum 8 characters
            return password.length >= 8;
          },
          message: "Password should be at least 8 characters long",
        },
        {
          validator: (password) => {
            //at least one number
            const numberRegex = /\d/;
            return numberRegex.test(password);
          },
          message: "Password should be at least 8 characters long",
        },
        {
          validator: function (password) {
            // At least one letter
            const letterRegex = /[a-zA-Z]/;
            return letterRegex.test(password);
          },
          message: "Password should contain at least one letter",
        },
        {
          validator: function (password) {
            // At least one special character
            const specialCharRegex = /[!@#$%^&*]/;
            return specialCharRegex.test(password);
          },
          message: "Password should contain at least one special character",
        },
      ],
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving
schema.pre("save", async function (next) {
  const user = this;
  // Only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    // Replace the plain password with the hashed password
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = schema;
