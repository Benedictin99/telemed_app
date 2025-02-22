import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:tsahatsgrb@gmail.com?subject=Message de ${formData.name}&body=${formData.message}%0D%0A%0D%0ADe: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contactInfo = [
    {
      title: "Téléphone",
      info: ["+261 33 17 250 84", "+261 34 37 865 70"],
      icon: "📞",
    },
    {
      title: "WhatsApp",
      info: ["+261 34 37 865 70"],
      icon: "💬",
      link: "https://wa.me/261343786570",
    },
    {
      title: "Email",
      info: ["tsahatsgrb@gmail.com"],
      icon: "📧",
      link: "mailto:tsahatsgrb@gmail.com",
    },
  ];

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
          Contactez-nous
        </motion.h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informations de contact */}
          <motion.div
            variants={containerVariants}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-semibold text-gray-800 mb-6"
            >
              Nos coordonnées
            </motion.h2>

            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <div className="space-y-1 mt-1">
                    {item.info.map((line, i) => (
                      <motion.p
                        key={i}
                        className="text-gray-600"
                        whileHover={{ x: 5 }}
                      >
                        {item.link ? (
                          <a
                            href={item.link}
                            className="hover:text-blue-600 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {line}
                          </a>
                        ) : (
                          line
                        )}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Formulaire */}
          <motion.div
            variants={containerVariants}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <motion.form
              variants={containerVariants}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Votre nom"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Votre message..."
                  required
                ></textarea>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                type="submit"
              >
                Envoyer
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
