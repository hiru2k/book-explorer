import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenreFilter } from "../../store/reducers/bookReducer";
import { fetchBooks } from "../../store/actions/bookActions";
import { useGenres } from "../../context/GenreContext";
import SelectField from "../SelectField";

function Filters() {
  const dispatch = useDispatch();
  const genreFilter = useSelector((state) => state.book.genre);
  const { genres } = useGenres();

  const handleGenreChange = (e) => {
    dispatch(setGenreFilter(e.target.value));
    dispatch(fetchBooks({ page: 1, genre: e.target.value }));
  };

  const selectOptions = {
    label: "Filters:",
    name: "genre",
    value: genreFilter,
    onChange: handleGenreChange,
    options: genres,
  };

  return (
    <div className="filters flex flex-col gap-2 bg-gray-200 px-4 py-2 rounded-md w-full sm:w-96 md:w-1/2 lg:w-1/3">
      {" "}
      <SelectField {...selectOptions} />
    </div>
  );
}

export default Filters;
