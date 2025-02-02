import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/userActions";
import useToast from "../../hooks/useToast";
import AuthForm from "../../components/auth/AuthForm";

function Register() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(registerUser(user)).unwrap();
      showToast(
        resultAction.msg || "Registration successful!",
        "success",
        navigate,
        "/login"
      );
    } catch (err) {
      showToast(err, "error");
    }
  };

  return (
    <div className="flex mt-10 items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-md">
        <AuthForm
          type="register"
          user={user}
          onChangeInput={onChangeInput}
          onSubmit={registerSubmit}
          loading={false}
        />
        <Link
          to="/login"
          className="block mt-4 text-center text-blue-500 hover:underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
