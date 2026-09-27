const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a design title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  imagePreviewUrl: {
    type: String,
    required: [true, 'An image preview is required'],
  },
  downloadFileUrl: {
    type: String,
    required: [true, 'The actual digitizing file is required'],
  },
  agent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Agent',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Design', designSchema);
