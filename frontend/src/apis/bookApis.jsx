// apiConstants.js
const BOOK_BASE_URL = "/api/books";

export const BOOK_API = {
  FETCH_BOOKS: `${BOOK_BASE_URL}`,
  CREATE_BOOK: `${BOOK_BASE_URL}`,
  UPDATE_BOOK: (id) => `${BOOK_BASE_URL}/${id}`,
  DELETE_BOOK: (id) => `${BOOK_BASE_URL}/${id}`,
};
