import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFile,
  FiFileText,
  FiDownload,
  FiUpload,
  FiEye,
  FiX,
  FiPlusCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiPieChart,
  FiActivity,
  FiHeart,
} from "react-icons/fi";
import Sidebar from "../components/layout/Sidebar";
import UserMenu from "../components/layout/UserMenu";

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState("documents");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");

  // Données fictives pour les documents
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Résultats analyse de sang",
      date: "10/11/2023",
      doctor: "Dr. Martin Dupont",
      category: "Analyses",
      fileType: "pdf",
      description: "Analyses sanguines complètes",
    },
    {
      id: 2,
      name: "Radiographie thorax",
      date: "05/10/2023",
      doctor: "Dr. Sophie Laurent",
      category: "Imagerie",
      fileType: "jpg",
      description: "Radiographie standard du thorax",
    },
    {
      id: 3,
      name: "Ordonnance médicaments",
      date: "15/09/2023",
      doctor: "Dr. Thomas Bernard",
      category: "Ordonnances",
      fileType: "pdf",
      description: "Traitement pour l'hypertension",
    },
  ]);

  // Données fictives pour les mesures
  const healthData = {
    weight: [
      { date: "01/10/2023", value: 72 },
      { date: "15/10/2023", value: 71.5 },
      { date: "01/11/2023", value: 71.2 },
      { date: "15/11/2023", value: 70.8 },
    ],
    bloodPressure: [
      { date: "01/10/2023", systolic: 135, diastolic: 85 },
      { date: "15/10/2023", systolic: 132, diastolic: 83 },
      { date: "01/11/2023", systolic: 130, diastolic: 82 },
      { date: "15/11/2023", systolic: 128, diastolic: 80 },
    ],
    heartRate: [
      { date: "01/10/2023", value: 76 },
      { date: "15/10/2023", value: 74 },
      { date: "01/11/2023", value: 72 },
      { date: "15/11/2023", value: 71 },
    ],
  };

  // Catégories de documents
  const documentCategories = [
    { value: "Analyses", label: "Analyses et tests" },
    { value: "Imagerie", label: "Imagerie médicale" },
    { value: "Ordonnances", label: "Ordonnances" },
    { value: "Comptes-rendus", label: "Comptes-rendus" },
    { value: "Certificats", label: "Certificats" },
    { value: "Autres", label: "Autres documents" },
  ];

  // Traiter l'upload d'un fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
    }
  };

  // Soumettre le formulaire d'upload
  const handleUploadSubmit = (e) => {
    e.preventDefault();

    if (!uploadFile || !uploadDescription || !uploadCategory) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Créer un nouveau document
    const newDocument = {
      id: Date.now(),
      name: uploadFile.name,
      date: new Date().toLocaleDateString("fr-FR"),
      doctor: "",
      category: uploadCategory,
      fileType: uploadFile.name.split(".").pop(),
      description: uploadDescription,
    };

    setDocuments([newDocument, ...documents]);

    // Réinitialiser le formulaire
    setUploadFile(null);
    setUploadDescription("");
    setUploadCategory("");
    setShowUploadModal(false);
  };

  // Visualiser un document
  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  // Télécharger un document (fictif)
  const handleDownloadDocument = (document) => {
    alert(`Téléchargement de ${document.name}`);
  };

  // Rendu des documents
  const renderDocuments = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Mes documents médicaux
          </h2>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiUpload className="mr-2" />
            Importer un document
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((document) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  {document.fileType === "pdf" ? (
                    <FiFileText className="text-red-500 text-xl" />
                  ) : document.fileType === "jpg" ||
                    document.fileType === "png" ? (
                    <FiFile className="text-blue-500 text-xl" />
                  ) : (
                    <FiFile className="text-gray-500 text-xl" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {document.name}
                    </h3>
                    <p className="text-sm text-gray-500">{document.date}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                  {document.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {document.description}
              </p>
              {document.doctor && (
                <p className="text-xs text-gray-500 mb-3">
                  Ajouté par: {document.doctor}
                </p>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleViewDocument(document)}
                  className="p-2 text-blue-600 rounded-full hover:bg-blue-50"
                  title="Voir le document"
                >
                  <FiEye />
                </button>
                <button
                  onClick={() => handleDownloadDocument(document)}
                  className="p-2 text-green-600 rounded-full hover:bg-green-50"
                  title="Télécharger"
                >
                  <FiDownload />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Rendu des mesures de santé
  const renderHealthData = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Mes données de santé
          </h2>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <FiPlusCircle className="mr-2" />
            Ajouter une mesure
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Poids */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900 flex items-center">
                <FiPieChart className="mr-2 text-blue-500" /> Poids
              </h3>
              <span className="text-lg font-bold text-blue-600">
                {healthData.weight[healthData.weight.length - 1].value} kg
              </span>
            </div>
            <div className="h-40 relative">
              {/* Simulation d'un graphique avec des barres */}
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {healthData.weight.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-blue-500 rounded-t-md"
                      style={{ height: `${(item.value - 50) * 2}px` }}
                    ></div>
                    <span className="text-xs mt-1">
                      {item.date.slice(0, 5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex justify-between">
              <span>
                Dernière mise à jour:{" "}
                {healthData.weight[healthData.weight.length - 1].date}
              </span>
              <span className="text-green-600 flex items-center">
                <FiCheckCircle className="mr-1" /> -0.4 kg
              </span>
            </div>
          </div>

          {/* Tension artérielle */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900 flex items-center">
                <FiActivity className="mr-2 text-red-500" /> Tension artérielle
              </h3>
              <span className="text-lg font-bold text-red-600">
                {
                  healthData.bloodPressure[healthData.bloodPressure.length - 1]
                    .systolic
                }
                /
                {
                  healthData.bloodPressure[healthData.bloodPressure.length - 1]
                    .diastolic
                }{" "}
                mmHg
              </span>
            </div>
            <div className="h-40 relative">
              {/* Simulation d'un graphique avec des lignes */}
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {healthData.bloodPressure.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative">
                      <div
                        className="w-2 bg-red-500 rounded-full absolute left-3"
                        style={{
                          height: `${(item.systolic - 100) * 0.8}px`,
                          bottom: 0,
                        }}
                      ></div>
                      <div
                        className="w-2 bg-blue-500 rounded-full absolute left-0"
                        style={{
                          height: `${(item.diastolic - 50) * 0.8}px`,
                          bottom: 0,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1">
                      {item.date.slice(0, 5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex justify-between">
              <span>
                Dernière mise à jour:{" "}
                {
                  healthData.bloodPressure[healthData.bloodPressure.length - 1]
                    .date
                }
              </span>
              <span className="text-green-600 flex items-center">
                <FiCheckCircle className="mr-1" /> -5 mmHg
              </span>
            </div>
          </div>

          {/* Rythme cardiaque */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900 flex items-center">
                <FiHeart className="mr-2 text-pink-500" /> Rythme cardiaque
              </h3>
              <span className="text-lg font-bold text-pink-600">
                {healthData.heartRate[healthData.heartRate.length - 1].value}{" "}
                bpm
              </span>
            </div>
            <div className="h-40 relative">
              {/* Simulation d'un graphique avec une courbe */}
              <svg className="w-full h-full">
                <path
                  d="M 10,100 Q 50,70 100,90 T 190,80"
                  stroke="rgb(236, 72, 153)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="10" cy="100" r="3" fill="rgb(236, 72, 153)" />
                <circle cx="60" cy="85" r="3" fill="rgb(236, 72, 153)" />
                <circle cx="120" cy="90" r="3" fill="rgb(236, 72, 153)" />
                <circle cx="190" cy="80" r="3" fill="rgb(236, 72, 153)" />
              </svg>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex justify-between">
              <span>
                Dernière mise à jour:{" "}
                {healthData.heartRate[healthData.heartRate.length - 1].date}
              </span>
              <span className="text-green-600 flex items-center">
                <FiCheckCircle className="mr-1" /> -1 bpm
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Rendu principal de la page
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Dossier médical
              </h1>
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`pb-4 px-1 ${
                  activeTab === "documents"
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("documents")}
              >
                Documents médicaux
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === "health"
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("health")}
              >
                Données de santé
              </button>
            </nav>
          </div>

          {/* Content based on active tab */}
          {activeTab === "documents" ? renderDocuments() : renderHealthData()}
        </main>
      </div>

      {/* Modal pour l'upload de document */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Importer un document
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleUploadSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fichier
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-2 border-dashed hover:bg-gray-50 border-gray-300 rounded-lg cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-blue-600">
                          Cliquez pour choisir un fichier
                        </span>{" "}
                        ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PDF, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {uploadFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Fichier sélectionné: {uploadFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {documentCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Décrivez brièvement ce document..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setShowUploadModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Importer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal pour visualiser un document */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedDocument.name}
              </h3>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Date: {selectedDocument.date}</span>
                <span>Catégorie: {selectedDocument.category}</span>
              </div>
              <p className="text-gray-800">{selectedDocument.description}</p>
              {selectedDocument.doctor && (
                <p className="text-sm text-gray-600 mt-2">
                  Ajouté par: {selectedDocument.doctor}
                </p>
              )}
            </div>

            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              {selectedDocument.fileType === "pdf" ? (
                <div className="text-center p-8">
                  <FiFileText className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-800">
                    Aperçu du PDF non disponible en mode démo
                  </p>
                </div>
              ) : ["jpg", "png", "jpeg"].includes(selectedDocument.fileType) ? (
                <div className="text-center p-8">
                  <FiFile className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-800">
                    Aperçu de l'image non disponible en mode démo
                  </p>
                </div>
              ) : (
                <div className="text-center p-8">
                  <FiFile className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-800">
                    Aperçu du document non disponible
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleDownloadDocument(selectedDocument)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiDownload className="mr-2" />
                Télécharger
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
