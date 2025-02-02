import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  disabled = false,
}) => (
  <div className="w-full">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default InputField;
