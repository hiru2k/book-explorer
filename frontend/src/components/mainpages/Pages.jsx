import React from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { Routes, Route } from "react-router-dom"; // No need for Switch

import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./utils/not_found/NotFound";
import Home from "./home/Home";
import DetailBook from "./books/DetailBook";
import CreateBook from "./books/CreateBook";
import Books from "./books/Books";
import MyBooks from "./books/MyBooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../features/userSlice"; // Import fetchUser action

function Pages() {
  const { isLogged } = useSelector((state) => state.user); // Access isLogged from Redux
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUser(accessToken)); // Fetch user data if token exists
    }
  }, [dispatch, accessToken]);

  return (
    <Routes>
      {" "}
      {/* Use Routes instead of Switch */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route
        path="/create_book"
        element={isLogged ? <CreateBook /> : <NotFound />}
      />
      <Route
        path="/edit_book/:id"
        element={isLogged ? <CreateBook /> : <NotFound />}
      />
      <Route
        path="/detail/:id"
        element={isLogged ? <DetailBook /> : <NotFound />}
      />
      <Route path="/my-books" element={isLogged ? <MyBooks /> : <NotFound />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
}

export default Pages;
