import React from "react";

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="flex items-center">
      <label className="text-sm font-medium mr-2">{label}</label>
      <select
        className="w-40 text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">All Books</option>
        {options.map((option) => (
          <option value={option._id} key={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
