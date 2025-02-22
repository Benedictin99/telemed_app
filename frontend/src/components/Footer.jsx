// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const footerLinks = {
    company: [
      { name: "À propos", href: "#" },
      { name: "Carrières", href: "#" },
      { name: "Actualités", href: "#" },
    ],
    services: [
      { name: "Téléconsultation", href: "#" },
      { name: "Suivi Médical", href: "#" },
      { name: "Ordonnances", href: "#" },
    ],
    legal: [
      { name: "Confidentialité", href: "#" },
      { name: "CGU", href: "#" },
      { name: "Mentions légales", href: "#" },
    ],
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gray-900 text-gray-300"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="space-y-4">
            <motion.h3
              variants={containerVariants}
              className="text-xl font-bold text-white"
            >
              TeleMed
            </motion.h3>
            <motion.p
              variants={containerVariants}
              className="text-sm text-gray-400"
            >
              Votre santé, notre priorité. Accédez aux meilleurs soins médicaux
              depuis chez vous.
            </motion.p>
            <motion.div variants={containerVariants} className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Liens rapides */}
          <div>
            <motion.h4
              variants={containerVariants}
              className="text-lg font-semibold text-white mb-4"
            >
              Entreprise
            </motion.h4>
            <motion.ul variants={containerVariants} className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Services */}
          <div>
            <motion.h4
              variants={containerVariants}
              className="text-lg font-semibold text-white mb-4"
            >
              Services
            </motion.h4>
            <motion.ul variants={containerVariants} className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contact */}
          <div>
            <motion.h4
              variants={containerVariants}
              className="text-lg font-semibold text-white mb-4"
            >
              Contact
            </motion.h4>
            <motion.div
              variants={containerVariants}
              className="space-y-2 text-sm"
            >
              <p>+261 33 17 250 84</p>
              <p>+261 34 37 865 70</p>
              <p>tsahatsgrb@gmail.com</p>
            </motion.div>
          </div>
        </div>

        {/* Barre de séparation */}
        <motion.div
          variants={containerVariants}
          className="border-t border-gray-800 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              variants={containerVariants}
              className="text-sm text-gray-400"
            >
              © 2024 TeleMed. Tous droits réservés.
            </motion.p>
            <motion.div variants={containerVariants} className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
