import React from "react";
import NavItem from "./NavItem";
import {
  FaBook,
  FaPenFancy,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const NavMenu = ({ isLogged, onLogout, setMenuOpen }) => {
  const navLinks = isLogged
    ? [
        { path: "/all_books", label: "Books", icon: <FaBook /> },
        { path: "/create_book", label: "Publish Book", icon: <FaPenFancy /> },
        { path: "/my_books", label: "My Books", icon: <FaUser /> },
        {
          path: "/",
          label: "Logout",
          icon: <FaSignOutAlt />,
          action: onLogout,
        },
      ]
    : [
        { path: "/login", label: "Login", icon: <FaSignInAlt /> },
        { path: "/register", label: "Register", icon: <FaUserPlus /> },
      ];

  return (
    <nav className="absolute md:relative top-0 right-0 h-full bg-blue-900 md:bg-transparent md:flex md:items-center md:space-x-6 p-5 md:p-0 transition-transform duration-300 md:translate-x-0 flex flex-col md:flex-row fixed md:static w-2/3 md:w-auto min-h-screen md:min-h-0">
      {navLinks.map(({ path, label, icon, action }) => (
        <NavItem
          key={label}
          path={path}
          label={label}
          icon={icon}
          onClick={() => {
            if (action) action();
            setMenuOpen(false);
          }}
        />
      ))}
    </nav>
  );
};

export default NavMenu;
