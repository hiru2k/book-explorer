import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenreFilter } from "../store/reducers/bookReducer";
import { fetchBooks } from "../store/actions/bookActions";

import { fetchGenres } from "../store/actions/genreActions";

function Filters() {
  const dispatch = useDispatch();
  const genreFilter = useSelector((state) => state.book.genre);
  const { genres } = useSelector((state) => state.genre);
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchGenres({ token: accessToken }));
  }, [dispatch]);

  const handleGenreChange = (e) => {
    dispatch(setGenreFilter(e.target.value));
    dispatch(
      fetchBooks({
        page: 1,
        genre: e.target.value,

        token: accessToken,
      })
    );
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
    </div>
  );
}

export default Filters;
