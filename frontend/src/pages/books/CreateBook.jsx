import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchBooks,
  createBook,
  updateBook,
} from "../../store/actions/bookActions";
import { useGenres } from "../../context/GenreContext";
import useToast from "../../hooks/useToast";
import Form from "../../components/books/Form";

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
  const { genres } = useGenres();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { books } = useSelector((state) => state.book);
  const { isLogged, user } = useSelector((state) => state.user);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      const existingBook = books.find((prod) => prod._id === id);
      if (existingBook) {
        setBook({
          ...existingBook,
          genre: existingBook.genre._id,
        });
      }
    } else {
      setOnEdit(false);
      setBook(initialState);
    }
  }, [id, books]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.genre) {
      return showToast("Please select a genre", "warning");
    }
    if (!isLogged || !user) {
      return showToast("Restricted access", "warning");
    }
    const updatedBook = { ...book, author: user._id, genre: book.genre };

    try {
      if (onEdit) {
        const resultUpdateAction = await dispatch(
          updateBook({ id: book._id, bookData: updatedBook })
        ).unwrap();
        showToast(
          resultUpdateAction.msg || "Book updated successfully!",
          "success"
        );
      } else {
        const resultCreateAction = await dispatch(
          createBook({ bookData: updatedBook })
        ).unwrap();
        showToast(resultCreateAction.msg, "success");
      }
      setBook(initialState);
      dispatch(fetchBooks({ page: 1, author: user._id }));
      navigate("/my_books");
    } catch (err) {
      showToast(err, "error");
    }
  };

  const inputs = [
    {
      label: "Book ID",
      type: "text",
      name: "book_id",
      value: book.book_id,
      onChange: handleChangeInput,
      required: true,
      disabled: onEdit,
    },
    {
      label: "Title",
      type: "text",
      name: "title",
      value: book.title,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      value: book.description,
      onChange: handleChangeInput,
      required: true,
    },
  ];

  const selectOptions = {
    label: "Genre",
    name: "genre",
    value: book.genre,
    onChange: handleChangeInput,
    options: genres,
    required: true,
  };

  return (
    <div className="flex mt-10 justify-center items-center min-h-screen">
      <Form
        onSubmit={handleSubmit}
        inputs={inputs}
        buttonText={onEdit ? "Update Book" : "Publish Book"}
        isLoading={false}
        title={onEdit ? "Edit Book" : "Publish Book"}
        selectOptions={selectOptions}
      />
    </div>
  );
}

export default CreateBook;
