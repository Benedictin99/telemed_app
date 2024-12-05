import React from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/107.jpg";

const Navbar = () => {
  return (
    <nav className="bg-transparent text-blue-500 flex h-14 justify-between items-center p-2">
      {/* Logo à gauche */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <span className="text-xl font-bold">Mon Application</span>
      </div>

      {/* Icône Utilisateur à droite */}
      <div className="flex items-center">
        <FaUserCircle
          size={30}
          className="cursor-pointer hover:text-gray-400"
        />
      </div>
    </nav>
  );
};

export default Navbar;
