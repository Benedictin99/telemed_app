// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-100 py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Bienvenue sur TeleMed
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Votre santé, notre priorité
        </p>
      </div>
    </header>
  );
};

export default Header;
