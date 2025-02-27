import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { FiEdit2, FiSave } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implémenter la mise à jour du profil
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {isEditing ? (
            <>
              <FiSave className="w-5 h-5 mr-2" />
              Sauvegarder
            </>
          ) : (
            <>
              <FiEdit2 className="w-5 h-5 mr-2" />
              Modifier
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 rounded-lg border bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
