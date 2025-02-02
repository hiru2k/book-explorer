import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import useFetchGenres from "../hooks/useFetchGenres";

const GenreContext = createContext();

export const useGenres = () => useContext(GenreContext);

export const GenreProvider = ({ children }) => {
  const { accessToken } = useSelector((state) => state.user);

  const { genres, loading, error } = useFetchGenres(accessToken);

  return (
    <GenreContext.Provider value={{ genres, loading, error }}>
      {children}
    </GenreContext.Provider>
  );
};
