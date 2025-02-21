// src/pages/Login.jsx
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Section image : affichée uniquement sur les écrans larges */}
      <div className="hidden lg:flex lg:w-1/2">
        <img
          src="/hero.svg" // Assurez-vous que cette image se trouve dans le dossier public
          alt="Connexion"
          className="object-cover h-screen w-screen"
        />
      </div>

      {/* Section formulaire */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-6 text-center">Se connecter</h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
              >
                Se connecter
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Pas encore inscrit ?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
