import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access the Redux state
import axiosInstance from "../apis/axiosInstance";

const GenreContext = createContext();

export const useGenres = () => useContext(GenreContext);

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access token from Redux store
  const { accessToken } = useSelector((state) => state.user);
  // Retrieve access token from localStorage
  // const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        // Send the access token in the headers
        const response = await axiosInstance.get("/api/genre", {
          headers: {
            Authorization: accessToken,
          },
        });
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      // Only call the API if accessToken exists
      fetchGenres();
    }
  }, [accessToken]); // Fetch genres when accessToken changes

  return (
    <GenreContext.Provider value={{ genres, loading }}>
      {children}
    </GenreContext.Provider>
  );
};
