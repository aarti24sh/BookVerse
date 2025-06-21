const Book = require('../models/Book');
const mongoose = require('mongoose');

// @desc    Get all books for logged-in user
// @route   GET /api/books
// @access  Private
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ createdBy: req.user.id });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Private
exports.getBook = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid book ID format'
        });
      }
    
    const book = await Book.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private
exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
exports.updateBook = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
      }
    
    let book = await Book.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
exports.deleteBook = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
      }
    
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ success: true, message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};