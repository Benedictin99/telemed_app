import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-red-500 m-10">Home</h1>
      </div>
      <div className="justify-center items-center flex flex-col h-screen">
        <h1 className="mb-20">0.00</h1>
        <button
          type="button"
          onClick={handleBtn}
          className="w-1/5 py-3 bg-amber-500 text-black rounded-lg hover:bg-gray-400 transition-all"
        >
          Deconnexion
        </button>
      </div>
    </div>
  );
};

export default Home;
