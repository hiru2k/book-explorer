import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/userSlice";
import useToast from "../../../hooks/useToast";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { loading } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(user)).unwrap();
      showToast(resultAction.msg || "Login successful!", "success");
      navigate("/"); //avoid displaying not found page
    } catch (err) {
      showToast(err || "An error occurred during Login.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-3xl flex flex-col md:flex-row h-fit w-[90%] md:w-[1500px] mt-12 md:mt-0 items-stretch overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={"/static/images/login.jpg"}
            alt="Login Image"
            className="w-full h-full object-cover rounded-t-3xl md:rounded-t-none"
          />
        </div>

        <div className="md:w-1/2 px-6 md:px-24 py-16 flex flex-col justify-center">
          <form onSubmit={loginSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <h2 className="text-2xl font-bold mb-4">Login</h2>

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
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <Link to="/register" className="text-blue-500 hover:underline">
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
