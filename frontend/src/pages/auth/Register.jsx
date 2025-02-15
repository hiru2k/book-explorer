import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/userActions";
import useToast from "../../hooks/useToast";
import AuthForm from "../../components/auth/AuthForm";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(registerUser(values)).unwrap();
        showToast(
          resultAction.msg || "Registration successful!",
          "success",
          navigate,
          "/login"
        );
      } catch (err) {
        showToast(err, "error");
      }
    },
  });

  return (
    <div className="flex mt-10 items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-md">
        <AuthForm type="register" formik={formik} loading={false} />
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
