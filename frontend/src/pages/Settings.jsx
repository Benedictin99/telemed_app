import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiGlobe,
  FiLock,
  FiMonitor,
  FiShield,
  FiSliders,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";
import Sidebar from "../components/layout/Sidebar";
import UserMenu from "../components/layout/UserMenu";
import { useAuth } from "../contexts/AuthContext.jsx";

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: "fr",
    twoFactor: false,
    dataSharing: "limited",
    autoSave: true,
    fontSize: "medium",
  });
  const [notification, setNotification] = useState(null);
  const [activeSection, setActiveSection] = useState("app");

  // Simuler le chargement des paramètres
  useEffect(() => {
    // Ici, on pourrait charger les paramètres depuis l'API
    const timer = setTimeout(() => {
      // Afficher une notification de succès
      showNotification("Paramètres chargés avec succès", "success");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const handleChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'enregistrement
    setTimeout(() => {
      showNotification("Paramètres enregistrés avec succès", "success");
    }, 500);
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Sections des paramètres
  const sections = [
    { id: "app", label: "Application", icon: <FiMonitor /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
    { id: "privacy", label: "Confidentialité", icon: <FiShield /> },
    { id: "security", label: "Sécurité", icon: <FiLock /> },
    { id: "preferences", label: "Préférences", icon: <FiSliders /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="md:flex">
              {/* Sidebar de navigation des paramètres */}
              <div className="p-4 border-r border-gray-200 md:w-64">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center px-3 py-2 w-full rounded-md ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-3">{section.icon}</span>
                      {section.label}
                    </button>
                  ))}
                </div>

                {/* Profil */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      {user?.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                          {user?.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {user?.name}
                      </h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <a
                    href="/profile"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FiUser className="mr-1" /> Voir mon profil
                  </a>
                </div>
              </div>

              {/* Contenu des paramètres */}
              <div className="p-6 flex-1">
                <form onSubmit={handleSubmit}>
                  {/* Paramètres de l'application */}
                  {activeSection === "app" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Paramètres de l'application
                      </h2>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Mode sombre
                          </h3>
                          <p className="text-sm text-gray-500">
                            Activer le thème sombre pour l'application
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.darkMode}
                            onChange={() => handleToggle("darkMode")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">
                          Langue
                        </h3>
                        <select
                          value={settings.language}
                          onChange={(e) =>
                            handleChange("language", e.target.value)
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="de">Deutsch</option>
                          <option value="it">Italiano</option>
                        </select>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">
                          Taille de police
                        </h3>
                        <div className="flex space-x-4">
                          {["small", "medium", "large"].map((size) => (
                            <label
                              key={size}
                              className={`px-4 py-2 border rounded-md cursor-pointer ${
                                settings.fontSize === size
                                  ? "bg-blue-50 border-blue-500 text-blue-700"
                                  : "border-gray-300 text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="fontSize"
                                value={size}
                                checked={settings.fontSize === size}
                                onChange={() => handleChange("fontSize", size)}
                                className="sr-only"
                              />
                              {size === "small"
                                ? "Petite"
                                : size === "medium"
                                ? "Moyenne"
                                : "Grande"}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Paramètres de notifications */}
                  {activeSection === "notifications" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Paramètres de notifications
                      </h2>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Notifications
                          </h3>
                          <p className="text-sm text-gray-500">
                            Activer les notifications dans l'application
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={() => handleToggle("notifications")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Notifications par email
                          </h3>
                          <p className="text-sm text-gray-500">
                            Recevoir des emails pour les rappels importants
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={() => handleToggle("emailNotifications")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Notifications par SMS
                          </h3>
                          <p className="text-sm text-gray-500">
                            Recevoir des SMS pour les rappels de rendez-vous
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={() => handleToggle("smsNotifications")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Paramètres de confidentialité */}
                  {activeSection === "privacy" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Paramètres de confidentialité
                      </h2>

                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">
                          Partage de données
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          Déterminez quelles données peuvent être partagées avec
                          votre équipe médicale
                        </p>
                        <select
                          value={settings.dataSharing}
                          onChange={(e) =>
                            handleChange("dataSharing", e.target.value)
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="none">Aucun partage</option>
                          <option value="limited">
                            Partage limité (recommandé)
                          </option>
                          <option value="full">Partage complet</option>
                        </select>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FiAlertCircle className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Informations sur le partage de données
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>
                                Le partage limité permet à vos médecins
                                d'accéder uniquement aux informations
                                pertinentes pour votre traitement. Le partage
                                complet donne accès à l'ensemble de votre
                                dossier médical.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Paramètres de sécurité */}
                  {activeSection === "security" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Paramètres de sécurité
                      </h2>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Authentification à deux facteurs
                          </h3>
                          <p className="text-sm text-gray-500">
                            Ajouter une couche de sécurité supplémentaire
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.twoFactor}
                            onChange={() => handleToggle("twoFactor")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Changer mon mot de passe
                        </button>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="mt-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          Voir les appareils connectés
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Préférences diverses */}
                  {activeSection === "preferences" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Préférences
                      </h2>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Sauvegarde automatique
                          </h3>
                          <p className="text-sm text-gray-500">
                            Sauvegarder automatiquement les formulaires non
                            soumis
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.autoSave}
                            onChange={() => handleToggle("autoSave")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-5 border-t border-gray-200">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      >
                        <FiSave className="mr-2" /> Enregistrer les
                        modifications
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : notification.type === "error"
              ? "bg-red-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <FiCheckCircle className="mr-2" />
            ) : (
              <FiAlertCircle className="mr-2" />
            )}
            {notification.message}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
