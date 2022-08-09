const mongoose = require("mongoose");

const bookSchema = {
  id: String,
  title: String,
  authors: [String],
  description: String,
  pageCount: Number,
  categories: [String],
  averageRating: Number,
  isEbook: Boolean,
};

const schema = new mongoose.Schema(bookSchema);

const Book = mongoose.model("Book", schema);

module.exports = Book;
