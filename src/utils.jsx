import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  BoxIcon,
  CalendarDaysIcon,
  ChartLineIcon,
  MessageSquare,
  SettingsIcon,
  UserCircle,
  UserIcon,
} from "lucide-react";

// Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
// Chart.js

// Menus side bar
const SideBarMenus = [
  { title: "Dashboard", icon: BoxIcon, link: "/home" },
  {
    title: "Discussion",
    icon: MessageSquare,
    gap: true,
    link: "/discussion",
  },
  { title: "Consultation", icon: ChartLineIcon, link: "/consultation" },
  { title: "Rendez-vous", icon: CalendarDaysIcon, link: "/rendez-vous" },
  { title: "Settings", icon: SettingsIcon, gap: true, link: "/settings" },
  { title: "Profile", icon: UserCircle, link: "/profile" },
];
// Menu side bar

// Theme toggle

const ToggleTheme = () => {
  return (
    <div>
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" className="theme-controller" value="light" />

        {/* sun icon */}
        <svg
          className="swap-off h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-on h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </div>
  );
};
// Theme toggle

// Donner du graphique
const GlycemieData = {
  labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
  datasets: [
    {
      label: "Taux de glucose",
      data: [35, 20, 45, 50, 25],
      backgroundColor: ["yellow"],
      borderColor: ["yellow"],
      borderWidth: 1,
    },
  ],
};

const TensionData = {
  labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
  datasets: [
    {
      label: "Relevé du tension",
      data: [12, 16, 8, 10, 14],
      backgroundColor: ["cyan"],
      borderColor: ["cyan"],
      borderWidth: 1,
    },
  ],
};

const TemperatureData = {
  labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
  datasets: [
    {
      label: "Relevé de Température",
      data: [65, 59, 80, 81, 56],
      backgroundColor: ["red"],
      borderColor: ["red"],
      borderWidth: 1,
    },
  ],
};

const ChartOptions = [
  { option1: { title: "Temperature" } },
  { option2: { title: "Glucose" } },
];
// Donner du graphique

// Nom d'utilisateur
const title = "Hello John 👋";
// Nom d'utilisateur

// Liste docteurs
const RelatedDoctors = [
  { name: "Dr. Smith", img: UserIcon, speciality: "Generalist" },
  { name: "Dr. Arnaud", img: UserIcon, speciality: "Chirurgie" },
  { name: "Dr. Carene", img: UserIcon, speciality: "Psychiatre" },
  { name: "Dr. Lucie", img: UserIcon, speciality: "Sage-femme" },
  { name: "Dr. Christelle", img: UserIcon, speciality: "Infirmière" },
  { name: "Dr. Sam", img: UserIcon, speciality: "Infirmière" },
];
// Liste docteurs

// User infos
const UserInfos = {
  name: "RAKOTO",
  lastName: "Besôsy Tongolo",
  sexe: "Homme",
  phone: 261343786570,
  email: "besosy@gmail.com",
  naissance: "27/12/1997",
  img: "/doctor.svg",
  maladie: "Diabétique",
  password: "mot de passe",
};
// User infos

export {
  SideBarMenus,
  ToggleTheme,
  title,
  RelatedDoctors,
  UserInfos,
  GlycemieData,
  TensionData,
  TemperatureData,
  ChartOptions,
};
