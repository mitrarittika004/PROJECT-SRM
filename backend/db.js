const mongoose = require("mongoose");

// Connecting to the database
mongoose.connect('mongodb+srv://rittika004:HrL9Xb9c6cifuPq4@cluster0.y14czk7.mongodb.net/')
// Create a Schema for Users
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // corrected to 'minlength'
  },
  username: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
