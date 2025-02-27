import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiSend,
  FiPaperclip,
  FiImage,
  FiX,
  FiSearch,
  FiMoreVertical,
  FiPhoneCall,
  FiVideo,
  FiFile,
  FiInfo,
  FiChevronLeft,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiUser,
  FiFileText,
} from "react-icons/fi";
import Sidebar from "../components/layout/Sidebar";
import UserMenu from "../components/layout/UserMenu";
import { useAuth } from "../contexts/AuthContext.jsx";

const Discussions = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOnMobile, setIsOnMobile] = useState(false);
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const messagesEndRef = useRef(null);

  // Données fictives pour les conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      doctor: {
        id: "d1",
        name: "Dr. Martin Dupont",
        specialty: "Cardiologie",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        online: true,
      },
      lastMessage: {
        text: "Vos derniers résultats d'analyse sont très encourageants.",
        time: "10:23",
        isRead: true,
        sender: "doctor",
      },
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Bonjour, comment puis-je vous aider aujourd'hui?",
          time: "09:45",
          date: "15/12/2023",
          sender: "doctor",
          isRead: true,
        },
        {
          id: 2,
          text: "Bonjour Docteur, j'ai des questions concernant mes résultats d'analyses.",
          time: "09:48",
          date: "15/12/2023",
          sender: "user",
          isRead: true,
        },
        {
          id: 3,
          text: "Bien sûr, je les ai sous les yeux. Que voulez-vous savoir en particulier?",
          time: "09:51",
          date: "15/12/2023",
          sender: "doctor",
          isRead: true,
        },
        {
          id: 4,
          text: "Est-ce que mes taux de cholestérol se sont améliorés par rapport à la dernière fois?",
          time: "09:54",
          date: "15/12/2023",
          sender: "user",
          isRead: true,
        },
        {
          id: 5,
          text: "Vos derniers résultats d'analyse sont très encourageants. Votre taux de LDL est passé de 1,60 g/l à 1,38 g/l, ce qui représente une amélioration significative.",
          time: "10:23",
          date: "15/12/2023",
          sender: "doctor",
          isRead: true,
        },
      ],
    },
    {
      id: 2,
      doctor: {
        id: "d2",
        name: "Dr. Sophie Laurent",
        specialty: "Dermatologie",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        online: false,
        lastSeen: "Il y a 35 min",
      },
      lastMessage: {
        text: "N'oubliez pas d'appliquer la crème deux fois par jour.",
        time: "Hier",
        isRead: false,
        sender: "doctor",
      },
      unreadCount: 2,
      messages: [
        {
          id: 1,
          text: "Bonjour, comment va votre éruption cutanée aujourd'hui?",
          time: "14:30",
          date: "14/12/2023",
          sender: "doctor",
          isRead: true,
        },
        {
          id: 2,
          text: "Bonjour Docteur, c'est un peu mieux mais j'ai encore des rougeurs.",
          time: "14:45",
          date: "14/12/2023",
          sender: "user",
          isRead: true,
        },
        {
          id: 3,
          text: "Pourriez-vous m'envoyer une photo pour que je puisse évaluer l'évolution?",
          time: "15:00",
          date: "14/12/2023",
          sender: "doctor",
          isRead: true,
        },
        {
          id: 4,
          type: "image",
          text: "Voici une photo prise à l'instant",
          file: "https://example.com/skin-condition.jpg",
          time: "15:10",
          date: "14/12/2023",
          sender: "user",
          isRead: true,
        },
        {
          id: 5,
          text: "Je vois une amélioration, mais continuez le traitement comme prescrit.",
          time: "15:30",
          date: "14/12/2023",
          sender: "doctor",
          isRead: true,
        },
        {
          id: 6,
          text: "N'oubliez pas d'appliquer la crème deux fois par jour.",
          time: "17:45",
          date: "14/12/2023",
          sender: "doctor",
          isRead: false,
        },
        {
          id: 7,
          text: "Et évitez l'exposition au soleil autant que possible.",
          time: "17:46",
          date: "14/12/2023",
          sender: "doctor",
          isRead: false,
        },
      ],
    },
    {
      id: 3,
      doctor: {
        id: "d3",
        name: "Dr. Thomas Bernard",
        specialty: "Médecine générale",
        avatar: "https://randomuser.me/api/portraits/men/64.jpg",
        online: true,
      },
      lastMessage: {
        text: "Votre prescription a été envoyée à la pharmacie.",
        time: "Lun",
        isRead: true,
        sender: "doctor",
      },
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Bonjour, suite à notre consultation d'hier, je vous confirme votre diagnostic.",
          time: "10:15",
          date: "11/12/2023",
          sender: "doctor",
          isRead: true,
        },
        {
          id: 2,
          text: "Merci Docteur. Avez-vous pu préparer l'ordonnance comme discuté?",
          time: "10:30",
          date: "11/12/2023",
          sender: "user",
          isRead: true,
        },
        {
          id: 3,
          text: "Votre prescription a été envoyée à la pharmacie.",
          time: "11:00",
          date: "11/12/2023",
          sender: "doctor",
          isRead: true,
          type: "file",
          file: "prescription_11122023.pdf",
          fileType: "pdf",
          fileSize: "156 Ko",
        },
      ],
    },
  ]);

  useEffect(() => {
    // Vérifier si l'utilisateur est sur mobile
    const checkMobile = () => {
      setIsOnMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Faire défiler vers le bas lorsque les messages changent
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Mettre à jour la conversation active avec le nouveau message
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation) {
        const newMessage = {
          id: Date.now(),
          text: message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date().toLocaleDateString("fr-FR"),
          sender: "user",
          isRead: false,
        };

        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: {
            text: message,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isRead: false,
            sender: "user",
          },
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setMessage("");
  };

  const handleSelectConversation = (id) => {
    // Marquer tous les messages comme lus
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === id) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map((msg) => ({
            ...msg,
            isRead: true,
          })),
          lastMessage: {
            ...conv.lastMessage,
            isRead: true,
          },
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setActiveConversation(id);

    if (isOnMobile) {
      setShowMobileConversation(true);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActiveConversation = () => {
    return conversations.find((conv) => conv.id === activeConversation);
  };

  const formatMessageDate = (date, time) => {
    const today = new Date().toLocaleDateString("fr-FR");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString("fr-FR");

    if (date === today) {
      return `Aujourd'hui, ${time}`;
    } else if (date === yesterdayStr) {
      return `Hier, ${time}`;
    }
    return `${date}, ${time}`;
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];
    let currentDate = null;

    messages.forEach((message) => {
      if (message.date !== currentDate) {
        currentDate = message.date;
        groupedMessages.push({ type: "date", date: message.date });
      }
      groupedMessages.push(message);
    });

    return groupedMessages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Discussions</h1>
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-180px)] flex">
            {/* Liste des conversations (cachée sur mobile si une conversation est ouverte) */}
            <div
              className={`w-full md:w-1/3 border-r border-gray-200 ${
                isOnMobile && showMobileConversation ? "hidden" : "block"
              }`}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-700">Messages</h2>
                <button
                  onClick={() => setShowNewMessageModal(true)}
                  className="p-2 rounded-full text-blue-600 hover:bg-blue-50"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>

              <div
                className="overflow-y-auto"
                style={{ height: "calc(100% - 140px)" }}
              >
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Aucune conversation trouvée
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`p-4 border-b border-gray-100 flex items-start cursor-pointer hover:bg-gray-50 transition-colors ${
                        activeConversation === conv.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="relative mr-3">
                        <img
                          src={conv.doctor.avatar}
                          alt={conv.doctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conv.doctor.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {conv.doctor.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {conv.lastMessage.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {conv.lastMessage.sender === "user" ? "Vous: " : ""}
                          {conv.lastMessage.text}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {conv.doctor.specialty}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Zone de conversation (visible sur mobile uniquement si une conversation est sélectionnée) */}
            <div
              className={`w-full md:w-2/3 flex flex-col ${
                isOnMobile && !showMobileConversation ? "hidden" : "block"
              }`}
            >
              {activeConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    {isOnMobile && (
                      <button
                        onClick={() => setShowMobileConversation(false)}
                        className="mr-2 text-gray-600"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    <div className="flex items-center flex-1">
                      <img
                        src={getActiveConversation()?.doctor.avatar}
                        alt={getActiveConversation()?.doctor.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {getActiveConversation()?.doctor.name}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center">
                          {getActiveConversation()?.doctor.online ? (
                            <>
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              En ligne
                            </>
                          ) : (
                            getActiveConversation()?.doctor.lastSeen
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                        <FiPhoneCall className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                        <FiVideo className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setShowInfoPanel(!showInfoPanel)}
                        className={`p-2 rounded-full hover:bg-gray-100 ${
                          showInfoPanel ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        <FiInfo className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 overflow-hidden">
                    <div
                      className={`flex-1 flex flex-col ${
                        showInfoPanel ? "md:w-2/3" : "w-full"
                      }`}
                    >
                      <div
                        className="flex-1 overflow-y-auto p-4 space-y-4"
                        style={{ height: "calc(100% - 70px)" }}
                      >
                        {groupMessagesByDate(
                          getActiveConversation()?.messages || []
                        ).map((item, index) =>
                          item.type === "date" ? (
                            <div
                              key={`date-${index}`}
                              className="flex justify-center my-4"
                            >
                              <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                                {item.date}
                              </span>
                            </div>
                          ) : (
                            <div
                              key={item.id}
                              className={`flex ${
                                item.sender === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              {item.sender === "doctor" && (
                                <img
                                  src={getActiveConversation()?.doctor.avatar}
                                  alt=""
                                  className="w-8 h-8 rounded-full mr-2 mt-1 object-cover"
                                />
                              )}
                              <div
                                className={`max-w-xs rounded-lg p-3 ${
                                  item.sender === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {item.type === "image" ? (
                                  <div className="space-y-2">
                                    <div className="relative">
                                      <div className="bg-gray-200 rounded aspect-square w-48 flex items-center justify-center">
                                        <FiImage className="w-12 h-12 text-gray-400" />
                                      </div>
                                    </div>
                                    <p>{item.text}</p>
                                  </div>
                                ) : item.type === "file" ? (
                                  <div className="flex items-center space-x-2 p-2 bg-opacity-10 bg-gray-500 rounded">
                                    <FiFile className="w-8 h-8" />
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium truncate">
                                        {item.file}
                                      </p>
                                      <p className="text-xs opacity-75">
                                        {item.fileSize}
                                      </p>
                                    </div>
                                    <button className="p-1 rounded hover:bg-white hover:bg-opacity-20">
                                      <FiDownload className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <p>{item.text}</p>
                                )}
                                <div
                                  className={`text-xs mt-1 flex justify-end items-center ${
                                    item.sender === "user"
                                      ? "text-blue-100"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {formatMessageDate(item.date, item.time)}
                                  {item.sender === "user" && (
                                    <span className="ml-1">
                                      {item.isRead ? (
                                        <FiCheckCircle className="w-3 h-3" />
                                      ) : (
                                        <FiCheck className="w-3 h-3" />
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      <form
                        onSubmit={handleSendMessage}
                        className="border-t border-gray-200 p-3 flex items-center"
                      >
                        <button
                          type="button"
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <FiPaperclip className="w-5 h-5" />
                        </button>
                        <input
                          type="text"
                          placeholder="Tapez votre message..."
                          className="flex-1 border-0 focus:ring-0 focus:outline-none px-3 py-2"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                          type="submit"
                          className={`p-2 rounded-full ${
                            message.trim()
                              ? "text-blue-600 hover:bg-blue-50"
                              : "text-gray-400"
                          }`}
                          disabled={!message.trim()}
                        >
                          <FiSend className="w-5 h-5" />
                        </button>
                      </form>
                    </div>

                    {/* Panneau d'informations (visible uniquement si showInfoPanel est true) */}
                    {showInfoPanel && (
                      <div className="w-1/3 border-l border-gray-200 p-4 overflow-y-auto hidden md:block">
                        <div className="text-center mb-6">
                          <img
                            src={getActiveConversation()?.doctor.avatar}
                            alt={getActiveConversation()?.doctor.name}
                            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                          />
                          <h3 className="font-semibold text-lg">
                            {getActiveConversation()?.doctor.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {getActiveConversation()?.doctor.specialty}
                          </p>
                          {getActiveConversation()?.doctor.online ? (
                            <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              En ligne
                            </p>
                          ) : (
                            <p className="text-xs text-gray-500 mt-1">
                              {getActiveConversation()?.doctor.lastSeen}
                            </p>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-wider">
                              Actions rapides
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              <button className="p-2 text-sm bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                                <FiCalendar className="mr-1" /> Rendez-vous
                              </button>
                              <button className="p-2 text-sm bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                                <FiFileText className="mr-1" /> Documents
                              </button>
                              <button className="p-2 text-sm bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                                <FiPhoneCall className="mr-1" /> Appeler
                              </button>
                              <button className="p-2 text-sm bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                                <FiVideo className="mr-1" /> Vidéo
                              </button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-wider">
                              Fichiers partagés
                            </h4>
                            <div className="space-y-2">
                              {getActiveConversation()
                                ?.messages.filter(
                                  (msg) =>
                                    msg.type === "file" || msg.type === "image"
                                )
                                .slice(0, 3)
                                .map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center p-2 bg-gray-50 rounded"
                                  >
                                    {file.type === "image" ? (
                                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mr-3">
                                        <FiImage className="text-gray-400" />
                                      </div>
                                    ) : (
                                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mr-3">
                                        <FiFile className="text-gray-400" />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">
                                        {file.file || "Image"}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {file.date}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              {getActiveConversation()?.messages.filter(
                                (msg) =>
                                  msg.type === "file" || msg.type === "image"
                              ).length > 3 && (
                                <button className="text-sm text-blue-600 w-full text-center">
                                  Voir tous les fichiers
                                </button>
                              )}
                              {getActiveConversation()?.messages.filter(
                                (msg) =>
                                  msg.type === "file" || msg.type === "image"
                              ).length === 0 && (
                                <p className="text-sm text-gray-500 italic">
                                  Aucun fichier partagé
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-wider">
                              Dernier rendez-vous
                            </h4>
                            <div className="p-3 border border-gray-200 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium">
                                    Consultation vidéo
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    05/12/2023 à 14:30
                                  </p>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Complété
                                </span>
                              </div>
                              <button className="mt-2 text-sm text-blue-600">
                                Voir les détails
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiMessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Vos messages médicaux
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Sélectionnez une conversation ou commencez-en une nouvelle
                      pour discuter avec votre médecin.
                    </p>
                    <button
                      onClick={() => setShowNewMessageModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Nouvelle discussion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal pour nouvelle discussion */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Nouvelle discussion
              </h3>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sélectionnez un médecin
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un médecin..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Récents
              </h4>
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={conv.doctor.avatar}
                      alt={conv.doctor.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {conv.doctor.name}
                      </h5>
                      <p className="text-xs text-gray-500">
                        {conv.doctor.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2">
                Tous les médecins
              </h4>
              <div className="space-y-2">
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <img
                    src="https://randomuser.me/api/portraits/men/41.jpg"
                    alt="Dr. Philippe Durand"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h5 className="font-medium text-gray-900">
                      Dr. Philippe Durand
                    </h5>
                    <p className="text-xs text-gray-500">Neurologie</p>
                  </div>
                </div>
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Dr. Anne Moreau"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h5 className="font-medium text-gray-900">
                      Dr. Anne Moreau
                    </h5>
                    <p className="text-xs text-gray-500">Pédiatrie</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 mr-2"
              >
                Annuler
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Commencer la discussion
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Discussions;
