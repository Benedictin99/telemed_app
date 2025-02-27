import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: <FiUser className="w-5 h-5" />,
      title: "Profile",
      action: () => navigate("/profile"),
    },
    {
      icon: <FiSettings className="w-5 h-5" />,
      title: "Paramètres",
      action: () => navigate("/settings"),
    },
    {
      icon: <FiLogOut className="w-5 h-5" />,
      title: "Déconnexion",
      action: logout,
      className: "text-red-600 hover:text-red-700",
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-xl font-medium text-gray-600">
              {user?.name?.charAt(0)}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 ${
                item.className || "text-gray-700 hover:text-gray-900"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
