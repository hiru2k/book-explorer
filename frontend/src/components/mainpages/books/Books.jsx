import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "../utils/book_item/BookItem";
import Filters from "../utils/book_item/Filters";
import { fetchBooks } from "../../../features/bookSlice";

function Books() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const { isLogged, accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBooks({ page: 1, genre: "", token: accessToken }));
  }, [dispatch]);

  if (loading) return <div>Loading books...</div>;

  return (
    <>
      <Filters />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pro_item">
        {books.map((book) => (
          <BookItem key={book._id} book={book} isLogged={isLogged} />
        ))}
      </div>
    </>
  );
}

export default Books;
