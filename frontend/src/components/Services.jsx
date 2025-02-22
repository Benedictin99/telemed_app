import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      title: "Téléconsultation",
      description: "Consultez nos médecins en ligne 24/7",
      icon: "🏥",
    },
    {
      title: "Suivi Médical",
      description: "Suivez votre santé avec nos outils connectés",
      icon: "📊",
    },
    {
      title: "Ordonnances",
      description: "Recevez vos ordonnances en ligne",
      icon: "📝",
    },
    {
      title: "Urgences",
      description: "Service d'assistance médicale urgente",
      icon: "🚑",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Nos Services
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                className="text-4xl mb-4"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;
