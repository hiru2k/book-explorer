import React from "react";

const EmptyState = ({ message }) => (
  <div className="flex flex-col justify-center items-center min-h-40 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
    <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full">
      <svg
        className="w-12 h-12 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 14l-4-4m0 0l4-4m-4 4h16"
        ></path>
      </svg>
    </div>
    <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
    <p className="text-sm text-gray-500">Try adding new items</p>
  </div>
);

export default EmptyState;
