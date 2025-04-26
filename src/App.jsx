import { Route, Routes, useLocation } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import SideBar from "./composants/SideBar";
import Dashboard from "./pages/home/Dashboard";
import Discussion from "./pages/home/Discussion";
import Consultation from "./pages/home/Consultation";
import RendezVous from "./pages/home/RendezVous";
import Settings from "./pages/home/Settings";
import Profile from "./pages/home/Profile";

function App() {
  const location = useLocation();
  const showSidebar = !["/login", "/"].includes(location.pathname);

  return (
    <div className="flex md:flex-row min-h-screen max-w-screen">
      {showSidebar && <SideBar />}

      <main className={`flex-grow transition-all duration-300 bg-base-200 `}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Dashboard />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
