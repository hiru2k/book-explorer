import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGenreFilter,
  setSearchTerm,
  fetchBooks,
} from "../../../../features/bookSlice";
import { fetchGenres } from "../../../../features/genreSlice"; // Import fetchGenres

function Filters() {
  const dispatch = useDispatch();

  const genreFilter = useSelector((state) => state.book.genre);
  const { genres } = useSelector((state) => state.genre); // Access genres from genreSlice
  const searchTerm = useSelector((state) => state.book.search);
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchGenres({ token: accessToken })); // Dispatch fetchGenres when the component mounts
  }, [dispatch]);

  const handleGenreChange = (e) => {
    dispatch(setGenreFilter(e.target.value));
    dispatch(
      fetchBooks({
        page: 1,
        genre: e.target.value,
        search: searchTerm,
        token: accessToken,
      })
    ); // Fetch books based on selected genre
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    dispatch(setSearchTerm(searchTerm));
    dispatch(
      fetchBooks({
        page: 1,
        genre: genreFilter,
        search: searchTerm,
        token: accessToken,
      })
    ); // Fetch books based on search term
  };

  return (
    <div className="filters flex flex-col gap-2 bg-gray-200 px-4 py-2 rounded-md">
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">Filters:</span>
        <select
          className="text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          name="genre"
          value={genreFilter}
          onChange={handleGenreChange}
        >
          <option value="">All Books</option>
          {genres.map((genre) => (
            <option value={genre._id} key={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        className="text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        value={searchTerm}
        placeholder="Enter the name for search"
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Filters;
