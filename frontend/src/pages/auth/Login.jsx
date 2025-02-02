import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/userActions";
import useToast from "../../hooks/useToast";
import AuthForm from "../../components/auth/AuthForm";

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
      showToast(err, "error");
    }
  };

  return (
    <div className="flex items-center mt-10 justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-md">
        <img
          src={"/static/images/login.jpg"}
          alt="Login Image"
          className="w-full h-48 object-cover mb-4 rounded-md"
        />

        <AuthForm
          type="login"
          user={user}
          onChangeInput={onChangeInput}
          onSubmit={loginSubmit}
          loading={loading}
        />
        <Link to="/register" className="text-blue-500 mt-4 hover:underline">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
