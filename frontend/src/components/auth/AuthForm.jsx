import React from "react";
import InputField from "../InputField";

const AuthForm = ({ type, user, onChangeInput, onSubmit, loading }) => {
  const fields =
    type === "login"
      ? [
          { label: "Email", type: "email", name: "email", required: true },
          {
            label: "Password",
            type: "password",
            name: "password",
            required: true,
          },
        ]
      : [
          { label: "Name", type: "text", name: "name", required: true },
          { label: "Email", type: "email", name: "email", required: true },
          {
            label: "Password",
            type: "password",
            name: "password",
            required: true,
          },
        ];

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">
        {type === "login" ? "Login" : "Register"}
      </h2>
      {fields.map(({ label, type, name, required }) => (
        <InputField
          key={name}
          label={label}
          type={type}
          name={name}
          value={user[name]}
          onChange={onChangeInput}
          required={required}
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
