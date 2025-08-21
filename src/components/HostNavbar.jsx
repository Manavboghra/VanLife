import React from "react";
import { NavLink } from "react-router-dom";

const HostNavbar = () => {
  return (
    <div className="flex bg-[#FFF7ED] px-6 pb-6 gap-4 text-[#4D4D4D] ">
      <NavLink
        to="/host"
        end
        className={({ isActive }) =>
          isActive ? "underline font-bold" : "font-[600]"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="income"
        className={({ isActive }) =>
          isActive ? "underline font-bold" : "font-[600]"
        }
      >
        Income
      </NavLink>

      <NavLink
        to="vans"
        className={({ isActive }) =>
          isActive ? "underline font-bold" : "font-[600]"
        }
      >
        Vans
      </NavLink>

      <NavLink
        to="reviews"
        className={({ isActive }) =>
          isActive ? "underline font-bold" : "font-[600]"
        }
      >
        Reviews
      </NavLink>
    </div>
  );
};

export default HostNavbar;
