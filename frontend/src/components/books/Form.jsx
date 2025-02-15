import React from "react";

function Form({
  onSubmit,
  formik,
  buttonText,
  isLoading,
  title,
  genres,
  onEdit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[90%] md:w-[600px] bg-gray-300 shadow-lg rounded-3xl py-12 px-6 md:px-12"
    >
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Book ID
        </label>
        <input
          type="text"
          name="book_id"
          value={formik.values.book_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={onEdit}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formik.touched.book_id && formik.errors.book_id
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {formik.touched.book_id && formik.errors.book_id && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.book_id}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formik.touched.title && formik.errors.title
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] ${
            formik.touched.description && formik.errors.description
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.description}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <select
          name="genre"
          value={formik.values.genre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formik.touched.genre && formik.errors.genre
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        >
          <option value="">Select a genre</option>
          {genres.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {formik.touched.genre && formik.errors.genre && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.genre}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        {isLoading ? "Processing..." : buttonText}
      </button>
    </form>
  );
}

export default Form;
