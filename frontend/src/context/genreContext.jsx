import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../apis/axiosInstance";

const GenreContext = createContext();
export const useGenres = () => useContext(GenreContext);

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/genre");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchGenres();
    }
  }, [accessToken]);

  return (
    <GenreContext.Provider value={{ genres, loading }}>
      {children}
    </GenreContext.Provider>
  );
};
