import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../features/userSlice";

function Pages() {
  const { isLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />
    </Routes>
  );
}

export default Pages;
