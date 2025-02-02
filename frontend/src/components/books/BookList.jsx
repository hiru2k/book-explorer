import React from "react";
import BookItem from "./BookItem";
import Loading from "./Loading";
import EmptyState from "./EmptyState";

const BookList = ({ books, loading, isLogged }) => {
  if (loading) return <Loading />;
  if (books.length === 0) return <EmptyState message="No books found." />;

  return (
    <div className="grid grid-cols-1 mb-2 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookItem key={book._id} book={book} isLogged={isLogged} />
      ))}
    </div>
  );
};

export default BookList;
