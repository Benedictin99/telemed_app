<!-- App.jsx -->

import { Route, Routes, useLocation } from "react-router-dom";
import Consultation from "./composants/home/Consultation";
import Discussion from "./composants/home/Discussion";
import RendezVous from "./composants/home/RendezVous";
import Settings from "./composants/home/Settings";
import Profile from "./composants/home/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SideBar from "./composants/SideBar";
import Side from "./composants/Side";

function App() {
const location = useLocation();
const showSidebar = !["/login", "/"].includes(location.pathname);

return (

<div className="flex flex-col md:flex-row min-h-screen">
{showSidebar && <SideBar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/side" element={<Side />} />
        </Routes>
      </main>
    </div>

);
}

export default App;

<!-- SideBar.jsx -->

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SideBarMenus, ToggleTheme } from "../utils";
import { ArrowLeftFromLineIcon } from "lucide-react";

const SideBar = () => {
const [open, setOpen] = useState(true);

useEffect(() => {
const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaChange = (e) => {
      setOpen(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    setOpen(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);

}, []);

return (

<section
className={`flex gap-6 ${open ? "desktop-layout" : "mobile-layout"}`} >
<div
className={`min-h-screen px-3 duration-300 ${
          open ? "w-60" : "w-16"
        }  shadow-xl shadow-base-300`} >
<div className="hidden py-3 md:flex justify-end">
<ArrowLeftFromLineIcon
size={20}
className={`cursor-pointer ${!open ? "rotate-180" : ""}`}
onClick={() => setOpen(!open)}
/>
</div>
<div className="mt-4 flex flex-col gap-4 relative">
{SideBarMenus.map((menu, index) => (
<NavLink
to={menu.link}
key={index}
className={({ isActive }) =>
`flex group items-center gap-3 font-medium p-2 hover:bg-neutral rounded-md ${
                  menu.gap && "mt-5"
                } ${isActive ? "bg-secondary" : ""}`
} >
{/_ Menu icon _/}
<div>{React.createElement(menu.icon, { size: "20" })}</div>

              {/* Menu titre */}
              <h2
                style={{ transitionDelay: `${index - 2}00ms` }}
                className={`whitespace-pre duration-600 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.title}
              </h2>

              {/* Menu hover en mode minimize */}
              <h2
                className={`${
                  open && "hidden"
                } absolute left-25 bg-base-100 font-semibold whitespace-pre text-base-content/45 rounded-md drop-shadow-md px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-0.5 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.title}
              </h2>
            </NavLink>
          ))}
        </div>

        <div className="absolute bottom-2 mx-auto">
          <ToggleTheme />
        </div>
      </div>
    </section>

);
};

export default SideBar;

<!-- Home.jsx -->

import React from "react";
import NavBar from "../composants/NavBar";

import { Chart as ChartJS, registerables } from "chart.js";
import { chart } from "../utils";
import { ResponsiveChart } from "../composants/chart/BarGraph";
ChartJS.register(...registerables);

const Home = () => {
return (
<div className="h-screen w-full">
{/_ <NavBar /> _/}
<div className="p-3">
<div className="">
<h2 className="text-xl font-bold mb-2">
Voici le bilan de votre santé
</h2>
</div>

        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col gap-30">
            <ResponsiveChart data={chart.data} options={chart.options} />
            <ResponsiveChart data={chart.data} options={chart.options} />
            <ResponsiveChart data={chart.data} options={chart.options} />
          </div>
        </div>

        <div>Top doctors</div>
      </div>
    </div>

);
};

export default Home;

Voilà le code complet, le problème maintenant sont les suivants :
1- Lorsque la page est trop long (Home.jsx) alors qu'on a besoin de defiler vers le bas, la hauteur de la SideBar.jsx reste la même et ne s'étand pas lorsqu'on scrolle.
2- Lorsque je réduit le Sidebar et le l'affiche après (appuis sur le boutton pour changer la width du sidebar), la page ne s'adapte pas alors le width du Home.jsx depasse l'écran, ne retourne pas à sa taille initiale avent la réduction du sidebar.
