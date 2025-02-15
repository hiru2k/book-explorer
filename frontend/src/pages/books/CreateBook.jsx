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
import { useFormik } from "formik";
import * as Yup from "yup";

const initialState = {
  book_id: "",
  title: "",
  description:
    "Books for every reader. Find inspiration, knowledge, and entertainment in our extensive library.",
  genre: "",
};

function CreateBook() {
  const dispatch = useDispatch();
  const { genres } = useGenres();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { books } = useSelector((state) => state.book);
  const { isLogged, user } = useSelector((state) => state.user);
  const [onEdit, setOnEdit] = useState(false);

  const validationSchema = Yup.object().shape({
    book_id: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    genre: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!isLogged || !user) {
        return showToast("Restricted access", "warning");
      }

      const updatedBook = { ...values, author: user._id, genre: values.genre };

      try {
        let resultAction;
        if (onEdit) {
          resultAction = await dispatch(
            updateBook({ id: id, bookData: updatedBook })
          ).unwrap();
          showToast(
            resultAction.msg || "Book updated successfully!",
            "success"
          );
        } else {
          resultAction = await dispatch(
            createBook({ bookData: updatedBook })
          ).unwrap();
          showToast(resultAction.msg, "success");
        }

        formik.resetForm();
        dispatch(fetchBooks({ page: 1, author: user._id }));
        navigate("/my_books");
      } catch (err) {
        showToast(err, "error");
      }
    },
  });

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      const existingBook = books.find((prod) => prod._id === id);
      if (existingBook) {
        formik.setValues({
          book_id: existingBook.book_id,
          title: existingBook.title,
          description: existingBook.description,
          genre: existingBook.genre._id,
        });
      }
    } else {
      setOnEdit(false);
      formik.resetForm();
    }
  }, [id, books, formik.setValues]);

  return (
    <div className="flex mt-10 justify-center items-center min-h-screen">
      <Form
        onSubmit={formik.handleSubmit}
        formik={formik}
        buttonText={onEdit ? "Update Book" : "Publish Book"}
        isLoading={formik.isSubmitting}
        title={onEdit ? "Edit Book" : "Publish Book"}
        genres={genres}
        onEdit={onEdit}
      />
    </div>
  );
}

export default CreateBook;
