import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/user/register", {
        ...user,
      });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden flex justify-center items-center ">
      <div className="bg-gray-300 shadow-lg rounded-3xl w-[90%] md:w-[600px] h-fit py-12 px-6 md:px-12">
        <form
          onSubmit={registerSubmit}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="text-2xl font-bold">Register</h2>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            onChange={onChangeInput}
            value={user.name}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            onChange={onChangeInput}
            value={user.email}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={onChangeInput}
            value={user.password}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Register
            </button>
            <Link
              to="/login"
              className="block mt-4 text-center text-blue-500 hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
