import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ path, label, icon, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className="hover:text-yellow-400 transition-colors duration-300 py-2 md:py-0 flex items-center gap-2"
  >
    {icon} {label}
  </Link>
);

export default NavItem;
