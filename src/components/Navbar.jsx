import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { User } from "react-feather";

const Navbar = () => {
  return (
    <header>
      <div className="w-full flex justify-between p-6 items-center h-28 bg-[#FFF7ED]">
        <div>
          <Link to="/">
            <img className="w-40" src={logo} alt="#VANLIFE" />
          </Link>
        </div>
        <div className="flex gap-4 text-[#4D4D4D]">
          <NavLink
            className={({ isActive }) => {
              return isActive ? "underline font-bold" : "font-[600]";
            }}
            to="host"
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
            className={({ isActive }) =>
              isActive
                ? "underline font-bold flex items-center justify-center"
                : "font-[600] flex items-center justify-center"
            }
            to="account"
          >
            <span className="flex items-center justify-center pb-6 h-10 w-10">
              <User className="border-3 rounded-2xl" size={25} />
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
