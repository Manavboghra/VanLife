import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HostNavbar = () => {
  //  const [currentUser, setCurrentUser] = useState(null);
  //   useEffect(() => {
  //     const user = localStorage.getItem("currentUser");
  //     if (user) {
  //       setCurrentUser(JSON.parse(user));
  //     }
  //   }, []);
  //   const userId = currentUser?.hostId
  return (
    <div className="flex  bg-[#FFF7ED] px-5 pb-6 gap-3 text-[#4D4D4D] ">
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

      
        <NavLink
          to="updatevans"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "font-[600] "
          }
        >
          Update
        </NavLink>


    </div>
  );
};

export default HostNavbar;
