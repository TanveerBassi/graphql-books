const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    authors: [String]!
    description: String!
    pageCount: Int
    categories: [String]
    averageRating: Float
    isEbook: Boolean
  }
  type Success {
    success: Boolean!
    message: String!
  }
  input BookInput {
    id: ID!
    title: String!
    authors: [String]!
    description: String!
    pageCount: Int
    categories: [String]
    averageRating: Float
    isEbook: Boolean
  }
  type Query {
    books(searchTerm: String!): [Book]
    book(bookId: ID!): Book
    myBooks: [Book]
  }
  type Mutation {
    createBook(book: BookInput!): Success
  }
`;

module.exports = typeDefs;
