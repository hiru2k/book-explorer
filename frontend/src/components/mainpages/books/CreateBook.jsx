import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchBooks,
  createBook,
  updateBook,
} from "../../../features/bookSlice";
import { fetchGenres } from "../../../features/genreSlice";

const initialState = {
  book_id: "",
  title: "",

  description:
    "Books for every reader. Find inspiration, knowledge, and entertainment in our extensive library.",
  genre: "",
  _id: "",
};

function CreateBook() {
  const [book, setBook] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { books } = useSelector((state) => state.book); // Destructure books
  const { genres } = useSelector((state) => state.genre);
  const { isLogged, user, accessToken } = useSelector((state) => state.user); // Access user and isLogged

  console.log(accessToken);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchGenres({ token: accessToken }));
    // console.log(genres);

    if (id) {
      setOnEdit(true);
      const existingBook = books.find((prod) => prod._id === id);
      if (existingBook) {
        setBook({
          ...existingBook,
          genre: existingBook.genre._id, // Set genre ID directly to show genre name
        });
      }
    } else {
      setOnEdit(false);
      setBook(initialState);
    }
  }, [id, books, dispatch]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      setBook({ ...book, genre: value }); // Store genre ID
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user.token);
    console.log(user);
    console.log(isLogged);

    if (!isLogged || !user) {
      // Check if user is logged in and token exists
      return alert("You are not an authenticated user or token is missing");
    }

    // Set the 'author' to the logged-in user _id and include the genre ID
    const updatedBook = {
      ...book,
      author: user._id, // Automatically set author to logged-in user's ID
      genre: book.genre, // Send the selected genre object ID
    };

    try {
      if (onEdit) {
        await dispatch(
          updateBook({
            id: book._id,
            bookData: updatedBook,
            token: accessToken,
          })
        ); // Dispatch update action
      } else {
        await dispatch(
          createBook({
            bookData: updatedBook,
            token: accessToken,
          })
        ); // Dispatch create action
      }

      setBook(initialState);
      dispatch(fetchBooks({ page: 1, author: user._id, token: accessToken }));
      navigate("/books");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-slate-200 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">
          {onEdit ? "Edit Book" : "Create Book"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="book_id"
              className="block text-sm font-medium text-gray-700"
            >
              Book ID:
            </label>
            <input
              type="text"
              name="book_id"
              id="book_id"
              required
              value={book.book_id}
              onChange={handleChangeInput}
              disabled={onEdit}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={book.title}
              onChange={handleChangeInput}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
              rows="5"
              type="text"
              name="description"
              id="description"
              required
              value={book.description}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre:
            </label>
            <select
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              name="genre"
              id="genre"
              value={book.genre}
              onChange={handleChangeInput}
            >
              <option value="">Please Select a genre</option>
              {Array.isArray(genres) &&
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md w-full hover:bg-blue-600"
          >
            {onEdit ? "Edit Book" : "Create Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
