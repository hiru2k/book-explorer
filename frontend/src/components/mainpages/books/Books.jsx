import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "../utils/book_item/BookItem";
import Filters from "../utils/book_item/Filters";
import { fetchBooks, deleteBook } from "../../../features/bookSlice";

function Books() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const { user, isLogged, accessToken } = useSelector((state) => state.user);

  console.log(books);
  const [checkedBooks, setCheckedBooks] = useState(new Set());

  useEffect(() => {
    dispatch(
      fetchBooks({ page: 1, genre: "", search: "", token: accessToken })
    );
  }, [dispatch]);

  // Handle book deletion
  const handleDeleteBook = async (id) => {
    if (!isLogged) {
      return alert(
        "You are not authenticated or your access token is missing."
      );
    }
    try {
      await dispatch(deleteBook({ id, token: accessToken }));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert(error.message || "Error deleting book");
    }
  };

  if (loading) return <div>Loading books...</div>;

  return (
    <>
      <Filters />

      {isLogged && (
        <div className="books flex justify-end mb-4">
          {/* <div className="delete-all">
            <span className="text-blue-700 font-bold uppercase tracking-wide">
              Select all
            </span>
            <input
              type="checkbox"
              checked={checkedBooks.size === books.length}
              onChange={() =>
                setCheckedBooks(
                  (prev) =>
                    new Set(
                      checkedBooks.size === books.length
                        ? []
                        : books.map((p) => p._id)
                    )
                )
              }
              className="ml-2 mr-4 h-5 w-5"
            />
            <button
              onClick={() => {
                if (checkedBooks.size === 0) return alert("No books selected.");
                checkedBooks.forEach((id) => dispatch(deleteBook({ id, token: accessToken })));
                setCheckedBooks(new Set());
              }}
              disabled={checkedBooks.size === 0}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded-md disabled:opacity-50"
            >
              Delete Selected
            </button>
          </div> */}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pro_item">
        {books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            isLogged={isLogged}
            deleteBook={handleDeleteBook}
            checked={checkedBooks.has(book._id)}
            onCheck={(checked) => {
              setCheckedBooks((prev) => {
                const newSet = new Set(prev);
                if (checked) newSet.add(book._id);
                else newSet.delete(book._id);
                return newSet;
              });
            }}
          />
        ))}
      </div>
    </>
  );
}

export default Books;
