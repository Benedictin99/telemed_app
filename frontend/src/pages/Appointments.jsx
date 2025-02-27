import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPlus,
  FiUser,
  FiX,
  FiCheck,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";
import Sidebar from "../components/layout/Sidebar";
import UserMenu from "../components/layout/UserMenu";

const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [notification, setNotification] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  // État pour les rendez-vous
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Martin Dupont",
      specialty: "Cardiologie",
      date: "15 Décembre 2023",
      time: "10:00",
      location: "Centre Médical Saint-Joseph",
      status: "confirmed",
      reason: "Contrôle annuel",
    },
    {
      id: 2,
      doctor: "Dr. Sophie Laurent",
      specialty: "Dermatologie",
      date: "22 Décembre 2023",
      time: "14:30",
      location: "Clinique des Champs",
      status: "pending",
      reason: "Examen de routine",
    },
  ]);

  const [pastAppointments, setPastAppointments] = useState([
    {
      id: 3,
      doctor: "Dr. Thomas Bernard",
      specialty: "Médecine générale",
      date: "5 Novembre 2023",
      time: "09:15",
      location: "Cabinet Médical Central",
      status: "completed",
      reason: "Grippe",
      notes: "Prescription d'antibiotiques pour 7 jours. Repos recommandé.",
    },
    {
      id: 4,
      doctor: "Dr. Claire Dubois",
      specialty: "Ophtalmologie",
      date: "28 Octobre 2023",
      time: "16:45",
      location: "Centre Optique Vision",
      status: "cancelled",
      reason: "Contrôle de la vision",
    },
    {
      id: 5,
      doctor: "Dr. Martin Dupont",
      specialty: "Cardiologie",
      date: "10 Octobre 2023",
      time: "11:30",
      location: "Centre Médical Saint-Joseph",
      status: "completed",
      reason: "Examen cardiaque",
      notes: "Résultats normaux. Prochain contrôle dans 6 mois.",
    },
  ]);

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

    if (!formData.doctor || !formData.date || !formData.time) {
      showNotification(
        "Veuillez remplir tous les champs obligatoires",
        "error"
      );
      return;
    }

    // Si on modifie un rendez-vous existant
    if (editingAppointment) {
      const updatedAppointments = upcomingAppointments.map((appointment) => {
        if (appointment.id === editingAppointment.id) {
          return {
            ...appointment,
            doctor: getDoctorName(formData.doctor),
            specialty: getDoctorSpecialty(formData.doctor),
            date: formatDateForDisplay(formData.date),
            time: formData.time,
            reason: formData.reason,
          };
        }
        return appointment;
      });

      setUpcomingAppointments(updatedAppointments);
      showNotification("Rendez-vous modifié avec succès", "success");
    } else {
      // Nouveau rendez-vous
      const newAppointment = {
        id: Date.now(),
        doctor: getDoctorName(formData.doctor),
        specialty: getDoctorSpecialty(formData.doctor),
        date: formatDateForDisplay(formData.date),
        time: formData.time,
        location: getLocationByDoctor(formData.doctor),
        status: "pending",
        reason: formData.reason,
      };

      setUpcomingAppointments([...upcomingAppointments, newAppointment]);
      showNotification("Rendez-vous créé avec succès", "success");
    }

    resetForm();
  };

  // Annuler un rendez-vous
  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = upcomingAppointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: "cancelled" };
      }
      return appointment;
    });

    const cancelledAppointment = upcomingAppointments.find(
      (app) => app.id === appointmentId
    );

    setUpcomingAppointments(
      updatedAppointments.filter((app) => app.status !== "cancelled")
    );
    setPastAppointments([
      { ...cancelledAppointment, status: "cancelled" },
      ...pastAppointments,
    ]);

    showNotification("Rendez-vous annulé", "info");
  };

  // Modifier un rendez-vous
  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);

    // Conversion des données pour le formulaire
    setFormData({
      doctor: getDoctorValue(appointment.doctor, appointment.specialty),
      date: formatDateForInput(appointment.date),
      time: appointment.time,
      reason: appointment.reason || "",
    });

    setShowModal(true);
  };

  // Afficher les détails d'un rendez-vous
  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      doctor: "",
      date: "",
      time: "",
      reason: "",
    });
    setEditingAppointment(null);
    setShowModal(false);
  };

  // Afficher une notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Helpers pour la manipulation des données
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

  const getDoctorValue = (name, specialty) => {
    if (name.includes("Dupont")) return "dr-dupont";
    if (name.includes("Laurent")) return "dr-laurent";
    if (name.includes("Bernard")) return "dr-bernard";
    return "";
  };

  const getLocationByDoctor = (doctorValue) => {
    switch (doctorValue) {
      case "dr-dupont":
        return "Centre Médical Saint-Joseph";
      case "dr-laurent":
        return "Clinique des Champs";
      case "dr-bernard":
        return "Cabinet Médical Central";
      default:
        return "À déterminer";
    }
  };

  const formatDateForDisplay = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const formatDateForInput = (displayDate) => {
    // Conversion depuis "15 Décembre 2023" vers "2023-12-15"
    const months = {
      janvier: "01",
      février: "02",
      mars: "03",
      avril: "04",
      mai: "05",
      juin: "06",
      juillet: "07",
      août: "08",
      septembre: "09",
      octobre: "10",
      novembre: "11",
      décembre: "12",
    };

    const parts = displayDate.split(" ");
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1].toLowerCase()];
    const year = parts[2];

    return `${year}-${month}-${day}`;
  };

  // Classes CSS conditionnelles
  const getAppointmentStatusClass = (status) => {
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

  const getNotificationClass = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-500 text-green-700";
      case "error":
        return "bg-red-100 border-red-500 text-red-700";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-700";
      default:
        return "bg-gray-100 border-gray-500 text-gray-700";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheck className="w-5 h-5" />;
      case "error":
        return <FiAlertTriangle className="w-5 h-5" />;
      case "info":
        return <FiInfo className="w-5 h-5" />;
      default:
        return <FiInfo className="w-5 h-5" />;
    }
  };

  const getAppointmentStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmé";
      case "pending":
        return "En attente";
      case "completed":
        return "Terminé";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  const renderAppointments = (appointments) => {
    if (appointments.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucun rendez-vous disponible</p>
        </div>
      );
    }

    return appointments.map((appointment) => (
      <motion.div
        key={appointment.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {appointment.doctor}
              </h3>
              <p className="text-gray-600">{appointment.specialty}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getAppointmentStatusClass(
                appointment.status
              )}`}
            >
              {getAppointmentStatusText(appointment.status)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <FiCalendar className="text-gray-500 mr-2" />
              <span className="text-gray-700">{appointment.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="text-gray-500 mr-2" />
              <span className="text-gray-700">{appointment.time}</span>
            </div>
            <div className="flex items-center">
              <FiMapPin className="text-gray-500 mr-2" />
              <span className="text-gray-700">{appointment.location}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-end space-x-2">
              {appointment.status === "confirmed" && (
                <button
                  className="px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Annuler
                </button>
              )}
              {(appointment.status === "confirmed" ||
                appointment.status === "pending") && (
                <button
                  className="px-4 py-2 text-sm text-blue-600 rounded-lg hover:bg-blue-50"
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Modifier
                </button>
              )}
              {appointment.status === "completed" && (
                <button
                  className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
                  onClick={() => handleShowDetails(appointment)}
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
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Rendez-vous</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FiPlus className="mr-2" />
                  Nouveau rendez-vous
                </button>
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Notifications */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-4 px-4 py-3 rounded border ${getNotificationClass(
                  notification.type
                )} flex items-center`}
              >
                <span className="mr-2">
                  {getNotificationIcon(notification.type)}
                </span>
                <span>{notification.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

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

          {/* Appointments List */}
          <div className="mt-6">
            {activeTab === "upcoming"
              ? renderAppointments(upcomingAppointments)
              : renderAppointments(pastAppointments)}
          </div>
        </main>
      </div>

      {/* Modal pour nouveau/modifier rendez-vous */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingAppointment
                  ? "Modifier le rendez-vous"
                  : "Nouveau rendez-vous"}
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
                  {editingAppointment ? "Modifier" : "Confirmer"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal pour les détails */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Détails du rendez-vous
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Rendez-vous avec
                </h4>
                <p className="text-lg font-semibold">
                  {selectedAppointment.doctor}
                </p>
                <p className="text-gray-600">{selectedAppointment.specialty}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Date et heure
                  </h4>
                  <p>
                    {selectedAppointment.date} à {selectedAppointment.time}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Lieu</h4>
                  <p>{selectedAppointment.location}</p>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-700 mb-2">Motif</h4>
                <p>{selectedAppointment.reason || "Non spécifié"}</p>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Notes médicales
                  </h4>
                  <p className="p-3 bg-blue-50 rounded-lg text-gray-800">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
