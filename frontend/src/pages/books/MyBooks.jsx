import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/actions/bookActions";
import BookList from "../../components/books/BookList";

const MyBooks = () => {
  const dispatch = useDispatch();
  const { user, isLogged } = useSelector((state) => state.user);
  const { books, loading } = useSelector((state) => state.book);

  useEffect(() => {
    if (isLogged && user?._id) {
      dispatch(fetchBooks({ author: user._id }));
    }
  }, [dispatch, isLogged, user?._id]);

  return (
    <div className="container mx-auto mt-20">
      <BookList books={books} loading={loading} isLogged={isLogged} />
    </div>
  );
};

export default MyBooks;
