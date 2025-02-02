import React from "react";

function Form({
  onSubmit,
  inputs,
  buttonText,
  isLoading,
  title,
  selectOptions,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[90%] md:w-[600px] bg-gray-300 shadow-lg rounded-3xl py-12 px-6 md:px-12"
    >
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

      {inputs.map((input, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {input.label}
          </label>

          {input.type === "textarea" ? (
            <textarea
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              required={input.required}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            ></textarea>
          ) : (
            <input
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              required={input.required}
              disabled={input.disabled}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}

      {selectOptions && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {selectOptions.label}
          </label>
          <select
            name={selectOptions.name}
            value={selectOptions.value}
            onChange={selectOptions.onChange}
            required={selectOptions.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a genre</option>
            {selectOptions.options.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        {isLoading ? "Processing..." : buttonText}
      </button>
    </form>
  );
}

export default Form;
