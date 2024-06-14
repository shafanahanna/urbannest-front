import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logos from "../components/assets/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md";
import "../components/header.css";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-slate-200 shadow-md w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-20 relative">
        <div className="flex justify-between items-center">
          <Link to="/" className=" name flex items-center text-gray-900">
            <img src={Logos} alt="logo" className="h-12 w-12 sm:h-20 sm:w-20" />
            <h1 className="font-bold text-xl sm:text-3xl sm:text-center flex items-center ml-10">
              <span className=" text-slate-500">Urban</span>
              <span className=" text-slate-700 ml-1 underline-none">Nest</span>
            </h1>
          </Link>
          <button className="sm:hidden text-2xl" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-20 left-0 w-full bg-slate-200 sm:items-center sm:static sm:w-auto sm:bg-transparent sm:block`}
            style={{ maxWidth: "100vw", padding: "0 1rem", zIndex: "999" }}
          >
            <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full sm:w-auto mt-2 sm:mt-0">
              <li>
                <Link
                  to="/"
                  className="text-slate-700 hover:text-gray-400 no-underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-700 hover:text-gray-400 no-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-slate-700 hover:text-gray-400 no-underline"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-700 hover:text-gray-400 no-underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center no-underline">
                {currentUser? currentUser.username:null}

                  {currentUser ? (
                    <img
                      className="h-7 w-7 rounded-full object-cover"
                      src={currentUser.profile}
                      alt="Profile"
                    />
                  ) : (
                    <span className="text-slate-700 hover:text-gray-400 no-underline">
                      Sign in
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <MdAdminPanelSettings
                  className="p-1 size-10 cursor-pointer"
                  onClick={() => navigate("/admin/login")}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
