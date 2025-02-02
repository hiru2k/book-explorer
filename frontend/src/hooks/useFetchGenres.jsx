import { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";

const useFetchGenres = (accessToken) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/api/genre");
        setGenres(response.data);
      } catch (error) {
        setError("Error fetching genres");
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [accessToken]);

  return { genres, loading, error };
};

export default useFetchGenres;
