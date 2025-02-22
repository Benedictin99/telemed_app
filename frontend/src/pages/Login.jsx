// src/pages/Login.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion avec:", formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex">
      {/* Section formulaire - maintenant à gauche */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-white to-blue-50"
      >
        <div className="max-w-md w-full space-y-8">
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              Connexion
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600">
              Entrer vos informations pour vous connecter
            </motion.p>
          </div>

          <motion.form
            variants={containerVariants}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <motion.div variants={itemVariants} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="amélie@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Entrer votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Se souvenir de moi
                </label>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 rounded-lg font-medium transition-all bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              >
                Connexion
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg transition-all hover:border-gray-400 hover:bg-gray-50"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Continuer avec Google
                </span>
              </button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-center text-sm text-gray-600 mt-8"
            >
              Pas encore membre ?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Créer un compte
              </Link>
            </motion.p>
          </motion.form>
        </div>
      </motion.div>

      {/* Section image - maintenant à droite */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        <img
          src="/src/assets/auth/login.svg"
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Login;
