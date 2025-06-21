const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getBooks)     // List all books for logged-in user
  .post(protect, createBook); // Create new book

router.route('/:id')
  .get(protect, getBook)      // Get single book
  .put(protect, updateBook)   // Update book
  .delete(protect, deleteBook); // Delete book

module.exports = router;