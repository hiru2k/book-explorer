import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../features/bookSlice";
import BookItem from "../utils/book_item/BookItem";
import { fetchUser } from "../../../features/userSlice";

const MyBooks = () => {
  const dispatch = useDispatch();
  const { user, isLogged, accessToken } = useSelector((state) => state.user);
  const { books, loading } = useSelector((state) => state.book);

  useEffect(() => {
    // Fetch books after user data has been successfully fetched
    if (isLogged && user?._id) {
      dispatch(fetchBooks({ author: user._id, token: accessToken })); // Fetch books using user._id
    }
  }, [dispatch, isLogged, user?._id]); // Only fetch books once user data is available

  if (loading) return <div>Loading books...</div>;

  return (
    <div className="container mx-auto mt-10">
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {/* Added justify-center to center the grid items */}
          {books.map((book) => (
            <BookItem key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
