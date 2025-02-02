import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "../../components/BookItem";
import Filters from "../../components/Filters";
import { fetchBooks } from "../../store/actions/bookActions";

function Books() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const { isLogged } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBooks({ page: 1, genre: "" }));
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
