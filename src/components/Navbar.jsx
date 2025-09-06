import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { User } from "react-feather";

const Navbar = () => {
  //  const [currentUser, setCurrentUser] = useState(null);
  //   useEffect(() => {
  //     const user = localStorage.getItem("currentUser");
  //     if (user) {
  //       setCurrentUser(JSON.parse(user));
  //     }
  //   }, []);
  //   const userId = currentUser?.hostId
  return (
    <header>
      <div className="w-full flex justify-between lg:p-6 p-3 gap-2 items-center h-28 bg-[#FFF7ED]">
        <div>
          <Link to="/">
            <img className="w-40" src={logo} alt="#VANLIFE" />
          </Link>
        </div>
        <div className="flex lg:gap-4 gap-2 text-[#4D4D4D] items-center">
          <NavLink 
            className={({ isActive }) => {
              return isActive ? "underline font-bold" : "font-[600]";
            }}
             to= "/host"
          >
            Host
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? "underline font-bold" : "font-[600]";
            }}
            to="about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? "underline font-bold" : "font-[600]";
            }}
            to="vans"
          >
            Vans
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? "underline font-bold" : "font-[600]";
            }}  
            to="addvans"
          >
            AddVans
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline font-bold flex items-center justify-center"
                : "font-[600] flex items-center justify-center"
            }
            to="login"
          >
            <span className="flex items-center justify-center h-10 w-8">
              <User className="border-3 rounded-2xl" size={25} />
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
