import React from "react";
import { useNavigate } from "react-router-dom";
import NaveBar from "../utils/NaveBar";

const Home = () => {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("/");
  };

  return (
    <div className="h-full w-full">
      <NaveBar />
      <div className="justify-center items-center flex flex-col h-screen">
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
