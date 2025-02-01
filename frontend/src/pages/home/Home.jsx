import React from "react";

function Home() {
  return (
    <div className="relative h-screen">
      <img
        src={"/static/images/home.jpg"}
        alt="Home Image"
        className="w-full h-full object-cover animate-image"
      />
    </div>
  );
}

export default Home;
