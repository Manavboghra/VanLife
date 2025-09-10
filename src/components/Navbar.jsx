import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { ShoppingCart, User, Menu, X } from "react-feather";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Host", path: "/host" },
    { name: "About", path: "/about" },
    { name: "Vans", path: "/vans" },
    { name: "Add Vans", path: "/addvans" },
  ];

  return (
    <header className="shadow-md bg-white top-0 left-0 right-0 z-50">
      <div className="w-full flex justify-between px-4 lg:px-12 py-4 items-center h-20">
        {/* Logo - always visible */}
        <div>
          <Link to="/">
            <img className="w-32 lg:w-36" src={logo} alt="#VANLIFE" />
          </Link>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 whitespace-nowrap"
                  : "hover:text-blue-600 transition-colors whitespace-nowrap"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* User Icon */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 flex items-center"
                : "hover:text-blue-600 flex items-center transition-colors"
            }
          >
            <User size={22} />
          </NavLink>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 flex items-center"
                : "hover:text-blue-600 flex items-center transition-colors"
            }
          >
            <ShoppingCart size={20} />
          </NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-600 font-semibold"
                  : "block hover:text-blue-600"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <div className="flex gap-6 mt-4">
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              <User size={24} className="hover:text-blue-600" />
            </NavLink>
            <NavLink to="/cart" onClick={() => setIsOpen(false)}>
              <ShoppingCart size={22} className="hover:text-blue-600" />
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
  