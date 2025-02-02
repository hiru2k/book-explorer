import React from "react";

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-2 text-gray-600 text-sm">Loading books...</p>
    </div>
  </div>
);

export default Loading;
