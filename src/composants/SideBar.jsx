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
      className={`${open ? "mr-60" : "mr-16"} transition-all duration-300`}
    >
      <div
        className={`min-h-screen px-3 duration-300 ${
          open ? "w-60" : "w-16"
        }  shadow-xl shadow-base-300 fixed top-0 left-0 h-screen bg-base-300`}
      >
        <div className="hidden py-3 md:flex justify-end">
          <ArrowLeftFromLineIcon
            size={20}
            className={`cursor-pointer transition-transform duration-300 ${
              !open ? "rotate-180" : ""
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {SideBarMenus.map((menu, index) => (
            <NavLink
              to={menu.link}
              key={index}
              className={({ isActive }) =>
                `flex group items-center gap-3 font-medium p-2 hover:bg-neutral rounded-md hover:scale-105 duration-200 ${
                  menu.gap && "mt-5"
                } ${isActive ? "bg-neutral" : ""}`
              }
            >
              {/* Menu icon */}
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
