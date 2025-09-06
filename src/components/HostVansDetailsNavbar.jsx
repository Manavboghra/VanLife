import React from "react";
import { NavLink } from "react-router-dom";

const HostVansDetailsNavbar = () => {
  return (
    <div className="">
     <div className="flex items-center px-5 md:gap-7 gap-3 text-[#4D4D4D] text-sm md:text-xl">

        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600] "
          }
        >
          Details
        </NavLink>

        <NavLink
          to="pricing"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600] "
          }
        >
          Pricing
        </NavLink>

        <NavLink
          to="photos"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600] "
          }
        >
          Photos
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600] "
          }
        >
          Reviews
        </NavLink>

        <NavLink
          to="income"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600] "
          }
        >
          Income
        </NavLink>

      </div>
    </div>
  );
};

export default HostVansDetailsNavbar;
