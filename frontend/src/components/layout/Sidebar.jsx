import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiMessageSquare,
  FiFileText,
  FiUser,
  FiSettings,
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Tableau de bord",
      icon: <FiHome className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      title: "Rendez-vous",
      icon: <FiCalendar className="w-5 h-5" />,
      path: "/appointments",
    },

    {
      title: "Discussions",
      icon: <FiMessageSquare className="w-5 h-5" />,
      path: "/discussions",
    },
    {
      title: "Dossier médical",
      icon: <FiFileText className="w-5 h-5" />,
      path: "/medical-records",
    },
    {
      title: "Mon profil",
      icon: <FiUser className="w-5 h-5" />,
      path: "/profile",
    },
    {
      title: "Paramètres",
      icon: <FiSettings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-10">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold text-blue-600">TéléMed</h1>
        <p className="text-sm text-gray-600">Votre santé, notre priorité</p>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="mr-4">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
