// src/pages/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FiDownload, FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section
          id="hero"
          className="relative min-h-screen px-2 sm:px-4 md:px-6"
        >
          <div className="container mx-auto">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-4 sm:py-8 lg:py-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-1/2 mt-4 sm:mt-8 lg:mt-0 relative px-2 sm:px-4"
              >
                <img
                  src="/src/assets/hero/doctor1.svg"
                  alt="Doctor Preview"
                  className="w-full h-auto max-w-sm mx-auto lg:max-w-none relative z-10"
                />
                <div className="flex justify-center mt-6 lg:hidden">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all text-sm sm:text-base font-medium"
                  >
                    Commencer maintenant
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-1/2 space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left px-2 sm:px-4"
              >
                <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-xs sm:text-sm font-medium">
                  ✨ Nouveau
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  La santé à portée de{" "}
                  <span className="text-indigo-600">main</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                  Accédez à des consultations médicales de qualité depuis votre
                  smartphone. Simple, rapide et sécurisé.
                </p>
                <div className="hidden lg:flex lg:justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all text-sm sm:text-base font-medium"
                  >
                    Commencer maintenant
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats Section */}
          <section className="relative py-8 sm:py-12 md:py-20 overflow-hidden mt-4 sm:mt-8 md:mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/src/assets/hero/doctor2.svg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.1,
              }}
            />

            <div className="container relative mx-auto px-2 sm:px-4 md:px-6">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
                  Notre Impact en Chiffres
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200">
                  Des résultats qui parlent d'eux-mêmes
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <img
                          src={stat.icon}
                          alt={stat.label}
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                        />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: index * 0.2,
                        }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm sm:text-base text-gray-200 font-medium">
                        {stat.label}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                Nos Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Découvrez tout ce que notre application peut faire pour vous
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  viewport={{ once: true }}
                  className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.h3
                    className="text-xl font-semibold mb-2 text-indigo-600"
                    whileHover={{ scale: 1.02 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                Contactez-nous
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Notre équipe est disponible 24h/24 et 7j/7
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8 p-6 bg-white rounded-2xl shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <img
                      src="/src/assets/ico/whatsapp-ico.svg"
                      alt="WhatsApp"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/261343786570"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      +261 34 37 865 70
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <img
                      src="/src/assets/ico/gmail.svg"
                      alt="Email"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:tsahatsgrb@gmail.com"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      tsahatsgrb@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <img
                      src="/src/assets/ico/sms.svg"
                      alt="Téléphone"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+261331725084"
                        className="block text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        +261 33 17 250 84
                      </a>
                      <a
                        href="tel:+261343786570"
                        className="block text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        +261 34 37 865 70
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl shadow-lg space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Votre message..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Envoyer le message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const features = [
  {
    image: "/src/assets/hero/video.svg",
    title: "Téléconsultation",
    description: "Consultez un médecin en vidéo 24h/24 et 7j/7",
  },
  {
    image: "/src/assets/hero/message.svg",
    title: "Ordonnances",
    description: "Recevez vos ordonnances directement sur l'application",
  },
  {
    image: "/src/assets/hero/tele.svg",
    title: "Rendez-vous",
    description: "Prenez rendez-vous en quelques clics",
  },
  // ... ajoutez d'autres fonctionnalités selon vos besoins
];

const stats = [
  {
    number: "50k+",
    label: "Utilisateurs Actifs",
    description: "Qui nous font confiance chaque jour",
    icon: "/src/assets/ico/whatsapp.svg",
  },
  {
    number: "100+",
    label: "Médecins Certifiés",
    description: "À votre service 24h/24",
    icon: "/src/assets/ico/message.svg",
  },
  {
    number: "4.8/5",
    label: "Note Moyenne",
    description: "Basée sur 10k+ avis",
    icon: "/src/assets/ico/sms.svg",
  },
  {
    number: "24/7",
    label: "Disponibilité",
    description: "Support continu et réactif",
    icon: "/src/assets/ico/gmail.svg",
  },
];

const screenshots = [
  "/src/assets/hero/doctor1.svg",
  "/src/assets/hero/doctor2.svg",
  "/src/assets/hero/doctor3.svg",
  // ... ajoutez d'autres captures d'écran
];

export default Home;
