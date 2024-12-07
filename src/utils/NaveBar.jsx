import React from "react";
import { MdSearch } from "react-icons/md";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "About",
    link: "/#about",
  },
  {
    id: 3,
    name: "Contact",
    link: "/#contact",
  },
];

const Navbar = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo section */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-colorBlue font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              Telemedecine
            </a>

            {/* Menu items  */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {" "}
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navbar section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search section  */}
            <div className="relative group hidden sm:block">
              <input type="text" placeholder="Search" className="searchbar" />
              <MdSearch className="text-xl text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 group-hover:text-colorBlue" />
            </div>

            {/* Darck mode switch  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
