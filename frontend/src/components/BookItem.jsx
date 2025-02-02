import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { deleteBook } from "../store/actions/bookActions";
import useToast from "../hooks/useToast";

function BookItem({ book }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { isLogged, user, accessToken } = useSelector((state) => state.user);

  const handleDelete = () => {
    if (!isLogged || !user) {
      return showToast("restricted access", "error");
    }
    try {
      const resultAction = dispatch(
        deleteBook({ id: book._id, token: accessToken })
      ).unwrap();
      showToast(resultAction.msg || "Book is deleted successfully!", "success");
    } catch (error) {
      showToast(err, "error");
    }
  };

  // Show delete and edit buttons only if the logged-in user is the author of the book
  const canEditOrDelete = isLogged && user?._id === book.author?._id;

  return (
    <div className="book-item bg-white rounded-md shadow-md p-4 flex flex-col gap-2 w-56 mx-auto">
      <div className="flex justify-end">
        <Link to={`/detail/${book._id}`} className="btn btn-secondary">
          <FaEye className="text-blue-500" />
        </Link>
      </div>
      <div className="book-info flex flex-col gap-2">
        <h2 className="text-lg font-medium truncate text-center">
          {book.title}
        </h2>
        <p className="text-gray-600 text-sm truncate text-center">
          {book.author ? book.author.name : "Unknown Author"}
        </p>
        <p className="text-gray-600 text-sm truncate text-center">
          {new Date(book.createdAt).toISOString().split("T")[0]}
        </p>
      </div>
      {canEditOrDelete && (
        <div className="flex justify-center">
          <Link to={`/edit_book/${book._id}`} className="btn btn-primary">
            <FaEdit className="text-green-500" />
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <FaTrash className="text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}

export default BookItem;
