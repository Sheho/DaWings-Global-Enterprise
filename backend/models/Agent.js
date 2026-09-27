const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Please choose a username'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  phone: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  specialization: {
    type: [String],
    default: [],
  },
  experience: {
    type: String,
    default: '',
  },
  portfolio: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    default: '',
  },
  isApproved: {
    type: Boolean,
    default: true, // Default to true so designers can test dashboard immediately
  },
  role: {
    type: String,
    default: 'designer', // 'designer' or 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Agent', agentSchema);
