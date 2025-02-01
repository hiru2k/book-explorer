import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./NotFound";
import Home from "./home/Home";
import DetailBook from "./books/DetailBook";
import CreateBook from "./books/CreateBook";
import Books from "./books/Books";
import MyBooks from "./books/MyBooks";
import "react-toastify/dist/ReactToastify.css";

function Pages() {
  const { isLogged } = useSelector((state) => state.user);

  return (
    <Routes>
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
