import React from "react";
import { UserInfos } from "../utils";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar shadow-md sticky top-0 z-50 bg-base-200">
      <div className="flex-1">
        <a className="font-black text-xl m-2">Bonjour {UserInfos.name} 👋</a>
      </div>
      <div className="flex gap-2">
        {/* <div className="flex gap-2 items-center">
          <p className="text-md font-medium">NavLink</p>
        </div> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="/title_logo.svg" />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/profile" className="justify-between">
                Profil
                <span className="badge">Nouveaux</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">Paramètres</NavLink>
            </li>
            <li>
              <NavLink to="/login">Deconnexion</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
