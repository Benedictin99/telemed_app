// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">TeleMed</div>
        {/* Menu affiché sur écran moyen et plus */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>
          <Link to="/login" className="hover:underline">
            Connexion
          </Link>
          <Link to="/register" className="hover:underline">
            Inscription
          </Link>
        </div>

        {/* Bouton hamburger visible sur mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Menu mobile : s'affiche si isOpen est true */}
      {isOpen && (
        <div className="lg:hidden mt-2">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
