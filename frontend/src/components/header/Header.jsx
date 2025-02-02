import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../store/actions/userActions";
import { HiMenu, HiX } from "react-icons/hi";
import NavMenu from "./NavMenu";

const Header = () => {
  const { isLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-900 text-white py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold">
          කතුවරයා
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        {/* Navigation Menu */}
        <div
          ref={menuRef}
          className={`md:block ${menuOpen ? "block" : "hidden"}`}
        >
          <NavMenu
            isLogged={isLogged}
            onLogout={handleLogout}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
