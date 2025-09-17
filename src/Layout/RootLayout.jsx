
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? 'ml-56' : 'ml-20'
        }`}
      >
        <main className="flex-1 py-6 pb-0 overflow-y-auto">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default RootLayout;