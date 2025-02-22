import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inscription avec:", formData);
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
      {/* Section image - à gauche */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        <img
          src="/src/assets/auth/register.svg"
          alt="Register"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Section formulaire - à droite */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 flex items-center justify-center p-8 bg-gradient-to-bl from-white to-blue-50"
      >
        <div className="max-w-md w-full space-y-8">
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              Créer un compte
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600">
              Veuiller remplir les champs ci-dessous pour créer un compte
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
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Amélie Laurent"
                  required
                />
              </div>

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
                  placeholder="amélielaurent7622@gmail.com"
                  required
                />
              </div>

              <motion.div variants={itemVariants} className="space-y-5">
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
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!acceptTerms}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  acceptTerms
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Créer un compte
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <button
                type="button"
                disabled={!acceptTerms}
                className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg transition-all ${
                  acceptTerms
                    ? "hover:border-gray-400 hover:bg-gray-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Continuer avec Google
                </span>
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-6 mt-6">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  J'accepte les{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Conditions d'utilisation
                  </Link>
                </label>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-center text-sm text-gray-600"
              >
                Déjà membre?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Se connecter
                </Link>
              </motion.p>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
