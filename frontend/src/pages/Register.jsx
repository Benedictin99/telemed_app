import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../contexts/AuthContext.jsx";
import { validateRegistration } from "../utils/validation";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation côté client
    const validationErrors = validateRegistration(formData);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" | "));
      return;
    }

    if (!acceptTerms) {
      setError("Veuillez accepter les conditions d'utilisation");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await register(formData.name, formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      // Gérer l'erreur du serveur
      if (typeof error === "string") {
        setError(error);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue lors de la création du compte");
      }

      // Réinitialiser le mot de passe
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    } finally {
      setLoading(false);
    }
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

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-400 p-4 mb-4"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

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
                disabled={!acceptTerms || loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  acceptTerms && !loading
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-gray-700"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Création en cours...
                  </div>
                ) : (
                  "Créer un compte"
                )}
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
