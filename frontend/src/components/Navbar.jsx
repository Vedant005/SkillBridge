// src/components/Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">SKILLBRIDGE</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            {/* <Link
              to="/"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              Home
            </Link> */}
            <Link
              to="/about"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              About
            </Link>
            <Link
              to="/talent"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              Find talent
            </Link>
            <Link
              to="/gigs"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              Find work
            </Link>
            <Link
              to="/contact"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              Contact
            </Link>
            {/* Authentication Links */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout(); // Call logout function
                  // Optionally navigate or show a message
                }}
                className="ml-4 px-3 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ml-4 px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-2 px-3 py-2 rounded-md text-blue-500 border border-blue-500 hover:bg-blue-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Basic text button for the menu */}
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/talent"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Find talent
            </Link>
            <Link
              to="/gigs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Find work
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {/* Authentication Links */}
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block mt-1 px-3 py-2 rounded-md text-base font-medium text-blue-500 border border-blue-500 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
