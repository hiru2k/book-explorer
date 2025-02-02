import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/actions/bookActions";
import BookList from "../../components/books/BookList";
import Filters from "../../components/books/Filters";

const AllBooks = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const { isLogged } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBooks({ page: 1, genre: "" }));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center mt-20 ">
      <Filters />
      <BookList books={books} loading={loading} isLogged={isLogged} />
    </div>
  );
};

export default AllBooks;
