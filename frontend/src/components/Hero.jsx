import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = ({ bgImage }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 h-full relative"
      >
        <div className="absolute inset-0 bg-indigo-600/5 rounded-br-[60px] md:rounded-br-[120px]" />
        <img
          className="h-full w-full object-cover rounded-br-[60px] md:rounded-br-[120px] hover:scale-105 transition-transform duration-700"
          src={bgImage}
          alt="Hero background"
          loading="eager"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col justify-center items-start w-full md:w-1/2 p-6 md:p-12 space-y-4"
      >
        <div className="inline-block">
          <motion.span
            className="inline-block text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ Nouveau
          </motion.span>
        </div>

        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Bienvenue dans <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Notre Univers
          </span>
        </motion.h1>

        <motion.p className="text-base md:text-lg text-gray-600">
          Découvrez une expérience unique où l'innovation rencontre l'élégance.
        </motion.p>

        <motion.div
          className="flex flex-row gap-3 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
          >
            Commencer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-indigo-600 hover:text-indigo-600 transition-colors"
          >
            En savoir plus
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:transform-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>Défilez vers le bas</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
