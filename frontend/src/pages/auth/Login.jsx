import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/userActions";
import useToast from "../../hooks/useToast";
import AuthForm from "../../components/auth/AuthForm";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { loading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginUser(values)).unwrap();
        showToast(resultAction.msg || "Login successful!", "success");
        navigate("/");
      } catch (err) {
        showToast(err, "error");
      }
    },
  });

  return (
    <div className="flex items-center mt-10 justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-md">
        <img
          src={"/static/images/login.jpg"}
          alt="Login Image"
          loading="lazy"
          className="w-full h-48 object-cover mb-4 rounded-md"
        />

        <AuthForm type="login" formik={formik} loading={loading} />
        <Link to="/register" className="text-blue-500 mt-4 hover:underline">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
