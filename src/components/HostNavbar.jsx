import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Layout, 
  DollarSign, 
  Truck, 
  Star, 
  Edit3, 
  Clipboard, 
  Menu, 
  X, 
} from "react-feather"; 

const HostNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { to: "/host", label: "Dashboard", icon: <Layout size={18} />, end: true },
    { to: "income", label: "Income", icon: <DollarSign size={18} /> },
    { to: "vans", label: "Vans", icon: <Truck size={18} /> },
    { to: "reviews", label: "Reviews", icon: <Star size={18} /> },
    { to: "updatevans", label: "Update", icon: <Edit3 size={18} /> },
    { to: "booking", label: "Booking", icon: <Clipboard size={18} /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md border-r w-64 p-5 flex flex-col transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-50`}
      >
        {/* Logo + Toggle */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold text-gray-800">Host Panel</span>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-4">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile toggle button */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 md:hidden bg-white shadow-md p-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Page Content */}
      <div className="flex-1 bg-[#FFF7ED] p-6 overflow-auto">
        {/* This will render Dashboard / Vans / Income / etc. */}
      </div>
    </div>
  );
};

export default HostNavbar;
