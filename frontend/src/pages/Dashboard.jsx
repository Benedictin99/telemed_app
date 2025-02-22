import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  FiLogOut,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiFileText,
} from "react-icons/fi";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <FiCalendar className="w-6 h-6" />,
      title: "Rendez-vous",
      description: "Gérer vos rendez-vous médicaux",
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: "Consultations",
      description: "Consultations en ligne avec vos médecins",
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: "Dossier médical",
      description: "Accéder à votre dossier médical",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Tableau de bord
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FiUser className="w-5 h-5 text-gray-600" />
                <span className="ml-2 text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
              >
                <FiLogOut className="w-5 h-5 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bienvenue, {user?.name} 👋
          </h2>
          <p className="text-gray-600">
            Gérez vos rendez-vous et consultez votre dossier médical en toute
            simplicité.
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Prochain rendez-vous
            </h4>
            <p className="text-2xl font-semibold text-gray-800">Aucun</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Consultations en attente
            </h4>
            <p className="text-2xl font-semibold text-gray-800">0</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Documents médicaux
            </h4>
            <p className="text-2xl font-semibold text-gray-800">0</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
