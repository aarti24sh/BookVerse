const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add the book title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please add the author name'],
  },
  genre: {
    type: String,
    enum: ['Fiction', 'Non-Fiction', 'Biography', 'Science', 'Fantasy', 'Other'],
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['Want to Read', 'Reading', 'Finished'],
    default: 'Want to Read',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
  discoveredFrom: {
    type: String,
    maxlength: 100,
  },
  startedAt: {
    type: Date,
  },
  finishedAt: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);