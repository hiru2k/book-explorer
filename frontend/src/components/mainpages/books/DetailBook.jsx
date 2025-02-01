import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BookItem from "../utils/book_item/BookItem";

function DetailBook() {
  const { id } = useParams();

  const { books, loading } = useSelector((state) => state.book);
  const [detailBook, setDetailBook] = useState(null);

  useEffect(() => {
    if (id && books.length) {
      const book = books.find((p) => p._id === id);
      setDetailBook(book || null);
    }
  }, [id, books]);

  if (loading) return <p>Loading...</p>;
  if (!detailBook) return <p>Book not found.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-screen-xl p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center">
            <div className=" flex flex-col gap-2 md:w-1/2">
              <h2 className="text-2xl text-center font-bold">
                {detailBook.title}
              </h2>
              <p className="text-md text-center">ID: {detailBook.book_id}</p>

              <h4 className="text-md text-center font-medium underline text-gray-700">
                Description:
              </h4>
              <p className="text-md text-center">{detailBook.description}</p>
              <div className="flex items-center justify-center flex-row gap-2">
                <p className="text-md text-center font-medium underline text-gray-700">
                  Genre:
                </p>
                <p>{detailBook.genre.name}</p>
              </div>
              <div className="flex items-center justify-center flex-row gap-2">
                <p className="text-md text-center font-medium underline text-gray-500">
                  Author:
                </p>
                <p>{detailBook.author.name}</p>
              </div>
              <div className="flex items-center justify-center flex-row gap-2">
                <p className="text-md text-center font-medium underline text-gray-500">
                  Published Date:
                </p>
                <p>{new Date(detailBook.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-20 mb-10">
            <h2>Related Books</h2>
          </div>
          <div className="related-books flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {books
                .filter(
                  (book) =>
                    book.genre.name === detailBook.genre.name &&
                    book._id !== detailBook._id
                )
                .map((book) => (
                  <BookItem key={book._id} book={book} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBook;
