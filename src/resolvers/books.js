const { ApolloError } = require("apollo-server");
const axios = require("axios");
const { Book } = require("../models");

const books = async (_, { searchTerm }) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );

    const books = data?.items?.map((book) => {
      return {
        id: book?.id,
        title: book?.volumeInfo?.title,
        authors: book?.volumeInfo?.authors,
        description: book?.volumeInfo?.description || "N/A",
        pageCount: book?.volumeInfo?.pageCount,
        categories: book?.volumeInfo?.categories,
        averageRating: book?.volumeInfo?.averageRating,
        isEbook: book?.saleInfo?.isEbook,
      };
    });

    return books;
  } catch (error) {
    console.log(`[ERROR]: Failed to resolve books | ${error.message}`);

    return new ApolloError("Failed to resolve books");
  }
};

const book = async (_, { bookId }) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );

    const book = {
      id: data?.id,
      title: data?.volumeInfo?.title,
      authors: data?.volumeInfo?.authors,
      description: data?.volumeInfo?.description || "N/A",
      pageCount: data?.volumeInfo?.pageCount,
      categories: data?.volumeInfo?.categories,
      averageRating: data?.volumeInfo?.averageRating,
      isEbook: data?.saleInfo?.isEbook,
    };

    return book;
  } catch (error) {
    console.log(`[ERROR]: Failed to resolve book | ${error.message}`);

    return new ApolloError("Failed to resolve book");
  }
};

const createBook = async (_, { book }) => {
  try {
    await Book.create(book);

    return {
      success: true,
      message: "Successfully created book",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to create book | ${error.message}`);

    return new ApolloError("Failed to create book");
  }
};

const myBooks = async () => {
  try {
    const books = await Book.find({});

    return books;
  } catch (error) {
    console.log(`[ERROR]: Failed to get my books | ${error.message}`);

    return new ApolloError("Failed to get my books");
  }
};

module.exports = {
  books,
  book,
  createBook,
  myBooks,
};
