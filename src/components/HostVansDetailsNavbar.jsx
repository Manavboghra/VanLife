import React from "react";
import { NavLink } from "react-router-dom";

const HostVansDetailsNavbar = () => {
  return (
    <div>
      <div className="flex px-5 gap-4 text-[#4D4D4D] ">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600]"
          }
        >
          Details
        </NavLink>

        <NavLink
          to="pricing"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600]"
          }
        >
          Pricing
        </NavLink>

        <NavLink
          to="photos"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600]"
          }
        >
          Photos
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
    </div>
  );
};

export default HostVansDetailsNavbar;
