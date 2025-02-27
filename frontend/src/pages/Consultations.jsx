import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiVideo,
  FiClock,
  FiCalendar,
  FiUser,
  FiPlus,
  FiX,
  FiSend,
  FiPaperclip,
  FiPhone,
} from "react-icons/fi";
import Sidebar from "../components/layout/Sidebar";
import UserMenu from "../components/layout/UserMenu";

const Consultations = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showNewConsultationModal, setShowNewConsultationModal] =
    useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  // Données fictives pour les consultations
  const [upcomingConsultations, setUpcomingConsultations] = useState([
    {
      id: 1,
      doctor: "Dr. Martin Dupont",
      specialty: "Cardiologie",
      date: "17 Décembre 2023",
      time: "14:00",
      type: "video",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Sophie Laurent",
      specialty: "Dermatologie",
      date: "23 Décembre 2023",
      time: "10:30",
      type: "chat",
      status: "pending",
    },
  ]);

  const [pastConsultations, setPastConsultations] = useState([
    {
      id: 3,
      doctor: "Dr. Thomas Bernard",
      specialty: "Médecine générale",
      date: "7 Novembre 2023",
      time: "11:15",
      type: "video",
      status: "completed",
      summary:
        "Consultation pour douleurs abdominales. Prescription d'examens complémentaires.",
    },
    {
      id: 4,
      doctor: "Dr. Claire Dubois",
      specialty: "Ophtalmologie",
      date: "12 Octobre 2023",
      time: "09:45",
      type: "chat",
      status: "completed",
      summary: "Suivi post-opératoire. Évolution favorable.",
    },
  ]);

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    type: "video",
    reason: "",
  });

  // Messages de chat fictifs
  const [chats, setChats] = useState({
    "chat-1": [
      {
        id: 1,
        sender: "doctor",
        name: "Dr. Martin Dupont",
        message: "Bonjour, comment puis-je vous aider aujourd'hui ?",
        time: "14:02",
      },
      {
        id: 2,
        sender: "patient",
        name: "Moi",
        message:
          "Bonjour Docteur, j'ai des douleurs à la poitrine depuis hier.",
        time: "14:03",
      },
      {
        id: 3,
        sender: "doctor",
        name: "Dr. Martin Dupont",
        message:
          "Pouvez-vous décrire l'intensité et la localisation précise de la douleur ?",
        time: "14:04",
      },
    ],
    "chat-2": [
      {
        id: 1,
        sender: "doctor",
        name: "Dr. Sophie Laurent",
        message:
          "Bonjour, avez-vous pu prendre les photos de votre éruption cutanée ?",
        time: "10:32",
      },
      {
        id: 2,
        sender: "patient",
        name: "Moi",
        message: "Bonjour Docteur, oui je vais vous les envoyer tout de suite.",
        time: "10:33",
      },
    ],
  });

  // Gestion du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.doctor ||
      !formData.date ||
      !formData.time ||
      !formData.type
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Créer une nouvelle consultation
    const newConsultation = {
      id: Date.now(),
      doctor: getDoctorName(formData.doctor),
      specialty: getDoctorSpecialty(formData.doctor),
      date: formatDateForDisplay(formData.date),
      time: formData.time,
      type: formData.type,
      status: "pending",
      reason: formData.reason,
    };

    setUpcomingConsultations([...upcomingConsultations, newConsultation]);
    resetForm();
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      doctor: "",
      date: "",
      time: "",
      type: "video",
      reason: "",
    });
    setShowNewConsultationModal(false);
  };

  // Fonctions utilitaires
  const getDoctorName = (doctorValue) => {
    switch (doctorValue) {
      case "dr-dupont":
        return "Dr. Martin Dupont";
      case "dr-laurent":
        return "Dr. Sophie Laurent";
      case "dr-bernard":
        return "Dr. Thomas Bernard";
      default:
        return "";
    }
  };

  const getDoctorSpecialty = (doctorValue) => {
    switch (doctorValue) {
      case "dr-dupont":
        return "Cardiologie";
      case "dr-laurent":
        return "Dermatologie";
      case "dr-bernard":
        return "Médecine générale";
      default:
        return "";
    }
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  const getConsultationStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConsultationStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmée";
      case "pending":
        return "En attente";
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  const getConsultationTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <FiVideo className="mr-2" />;
      case "chat":
        return <FiMessageSquare className="mr-2" />;
      case "phone":
        return <FiPhone className="mr-2" />;
      default:
        return null;
    }
  };

  const getConsultationTypeText = (type) => {
    switch (type) {
      case "video":
        return "Visioconférence";
      case "chat":
        return "Chat";
      case "phone":
        return "Téléphone";
      default:
        return type;
    }
  };

  // Démarrer un chat
  const startChat = (consultation) => {
    const chatId = `chat-${consultation.id}`;
    if (!chats[chatId]) {
      // Créer un nouveau chat si n'existe pas
      setChats({
        ...chats,
        [chatId]: [
          {
            id: Date.now(),
            sender: "system",
            message: `Consultation avec ${consultation.doctor} démarrée.`,
            time: new Date().toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      });
    }
    setActiveChat(chatId);
    setShowChatWindow(true);
  };

  // Envoyer un message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "patient",
      name: "Moi",
      message: chatMessage,
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats({
      ...chats,
      [activeChat]: [...chats[activeChat], newMessage],
    });
    setChatMessage("");

    // Simuler une réponse du médecin après 2 secondes
    setTimeout(() => {
      const doctorResponse = {
        id: Date.now() + 1,
        sender: "doctor",
        name: "Dr. Martin Dupont",
        message:
          "Je vous remercie pour cette information. Pourriez-vous préciser depuis combien de temps ces symptômes persistent ?",
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChats((prevChats) => ({
        ...prevChats,
        [activeChat]: [...prevChats[activeChat], doctorResponse],
      }));
    }, 2000);
  };

  const renderConsultationsList = (consultations) => {
    if (consultations.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune consultation disponible</p>
        </div>
      );
    }

    return consultations.map((consultation) => (
      <motion.div
        key={consultation.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {consultation.doctor}
              </h3>
              <p className="text-gray-600">{consultation.specialty}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getConsultationStatusClass(
                consultation.status
              )}`}
            >
              {getConsultationStatusText(consultation.status)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <FiCalendar className="text-gray-500 mr-2" />
              <span className="text-gray-700">{consultation.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="text-gray-500 mr-2" />
              <span className="text-gray-700">{consultation.time}</span>
            </div>
            <div className="flex items-center">
              {getConsultationTypeIcon(consultation.type)}
              <span className="text-gray-700">
                {getConsultationTypeText(consultation.type)}
              </span>
            </div>
          </div>

          {consultation.summary && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">{consultation.summary}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-end space-x-2">
              {consultation.status === "confirmed" && (
                <>
                  {consultation.type === "video" && (
                    <button className="flex items-center px-4 py-2 text-sm text-green-600 font-medium bg-green-50 rounded-lg hover:bg-green-100">
                      <FiVideo className="mr-2" />
                      Rejoindre
                    </button>
                  )}
                  {consultation.type === "chat" && (
                    <button
                      className="flex items-center px-4 py-2 text-sm text-blue-600 font-medium bg-blue-50 rounded-lg hover:bg-blue-100"
                      onClick={() => startChat(consultation)}
                    >
                      <FiMessageSquare className="mr-2" />
                      Démarrer le chat
                    </button>
                  )}
                  <button className="px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                    Annuler
                  </button>
                </>
              )}
              {consultation.status === "pending" && (
                <button className="px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                  Annuler
                </button>
              )}
              {consultation.status === "completed" && (
                <button
                  className="px-4 py-2 text-sm text-blue-600 rounded-lg hover:bg-blue-50"
                  onClick={() => setSelectedConsultation(consultation)}
                >
                  Détails
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Consultations
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNewConsultationModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FiPlus className="mr-2" />
                  Nouvelle consultation
                </button>
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              À venir
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "past"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Historique
            </button>
          </div>

          {/* Consultations List */}
          <div className="mt-6">
            {activeTab === "upcoming"
              ? renderConsultationsList(upcomingConsultations)
              : renderConsultationsList(pastConsultations)}
          </div>
        </main>
      </div>

      {/* Modal pour nouvelle consultation */}
      {showNewConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Nouvelle consultation
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Médecin
                </label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un médecin</option>
                  <option value="dr-dupont">
                    Dr. Martin Dupont (Cardiologie)
                  </option>
                  <option value="dr-laurent">
                    Dr. Sophie Laurent (Dermatologie)
                  </option>
                  <option value="dr-bernard">
                    Dr. Thomas Bernard (Médecine générale)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de consultation
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="video"
                      checked={formData.type === "video"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <FiVideo className="mr-1" /> Visioconférence
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="chat"
                      checked={formData.type === "chat"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <FiMessageSquare className="mr-1" /> Chat
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="phone"
                      checked={formData.type === "phone"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <FiPhone className="mr-1" /> Téléphone
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une heure</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motif de consultation
                </label>
                <textarea
                  rows="3"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Décrivez brièvement le motif de votre consultation..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={resetForm}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Confirmer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Fenêtre de chat */}
      {showChatWindow && activeChat && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-xl z-40 flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Chat médical</h3>
            <button
              onClick={() => setShowChatWindow(false)}
              className="text-white hover:text-gray-200"
            >
              <FiX />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {chats[activeChat] &&
                chats[activeChat].map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mb-4 ${
                      message.sender === "patient"
                        ? "flex flex-row-reverse"
                        : message.sender === "doctor"
                        ? "flex"
                        : "flex justify-center"
                    }`}
                  >
                    {message.sender === "system" ? (
                      <div className="bg-gray-100 rounded-lg py-1 px-3">
                        <p className="text-xs text-gray-500">
                          {message.message}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`max-w-xs ${
                            message.sender === "patient"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-800"
                          } rounded-lg p-3`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs text-right mt-1 opacity-70">
                            {message.time}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          <form
            onSubmit={sendMessage}
            className="p-3 border-t border-gray-200 flex"
          >
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="bg-gray-100 text-gray-500 p-2 border border-gray-300 border-l-0"
            >
              <FiPaperclip />
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Consultations;
