import React from "react";
import InputField from "../InputField";

const AuthForm = ({ type, formik, loading }) => {
  const fields =
    type === "login"
      ? [
          { label: "Email", type: "email", name: "email" },
          { label: "Password", type: "password", name: "password" },
        ]
      : [
          { label: "Name", type: "text", name: "name" },
          { label: "Email", type: "email", name: "email" },
          { label: "Password", type: "password", name: "password" },
        ];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center gap-6"
    >
      <h2 className="text-2xl font-bold">
        {type === "login" ? "Login" : "Register"}
      </h2>
      {fields.map(({ label, type, name }) => (
        <InputField
          key={name}
          label={label}
          type={type}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[name] && formik.errors[name]}
        />
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        disabled={loading}
      >
        {loading
          ? type === "login"
            ? "Logging in..."
            : "Registering..."
          : type === "login"
          ? "Login"
          : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
