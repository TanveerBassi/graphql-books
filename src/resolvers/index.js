const { books, book, createBook, myBooks } = require("./books");

const resolvers = {
  Query: {
    books,
    book,
    myBooks,
  },
  Mutation: {
    createBook,
  },
};

module.exports = resolvers;
