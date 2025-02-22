// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleEspaceClient = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const buttonStyles = (sectionId) => `
    px-3 py-1.5 rounded-full transition-all duration-300
    ${
      activeSection === sectionId
        ? "bg-blue-700 font-medium"
        : "hover:bg-blue-700"
    }
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-3 z-50 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-bold cursor-pointer flex items-center"
          onClick={() => scrollToSection("hero")}
        >
          <img
            src="/src/assets/ico/logo.svg"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          TeleMed
        </motion.div>

        {/* Menu principal */}
        <div className="hidden lg:flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
            className={buttonStyles("hero")}
          >
            Accueil
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("services")}
            className={buttonStyles("services")}
          >
            Services
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("contact")}
            className={buttonStyles("contact")}
          >
            Contact
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEspaceClient}
            className="ml-3 px-4 py-1.5 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
          >
            Espace Client
          </motion.button>
        </div>

        {/* Menu mobile */}
        <div className="lg:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
          </motion.button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden"
      >
        <div className="py-2 space-y-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("hero")}
            className={`block w-full text-left px-3 py-1.5 ${
              activeSection === "hero" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            Accueil
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("services")}
            className={`block w-full text-left px-3 py-1.5 ${
              activeSection === "services" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            Services
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("contact")}
            className={`block w-full text-left px-3 py-1.5 ${
              activeSection === "contact" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            Contact
          </motion.button>
          <div className="px-3 py-1.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEspaceClient}
              className="w-full px-4 py-1.5 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              Espace Client
            </motion.button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;
