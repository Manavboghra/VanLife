import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import logo2 from "../assets/Logo2.png";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Layout,
  DollarSign,
  Truck,
  Star,
  Settings,
  Calendar,
  ChevronDown,
  ChevronUp,
  UserPlus,
  FilePlus,
  Info,
} from "react-feather";

const Navbar = ({ isOpen, toggleMenu }) => {
  const navLinks = [
    { lable: "Host", to: "/host", icon:<UserPlus size={18}/>},
    { lable: "About", to: "/about", icon:<Info size={18}/>},
    { lable: "Vans", to: "/vans", icon:<Truck size={18}/>},
    { lable: "Add Vans", to: "/addvans", icon:<FilePlus size={18}/> },
  ];

  const location = useLocation();

  const isHostActive = location.pathname.startsWith("/host");

  const hostNavItems = [
    { to: "/host", label: "Dashboard", icon: <Layout size={15} />, end: true },
    { to: "/host/income", label: "Income", icon: <DollarSign size={15} /> },
    { to: "/host/vans", label: "Vans", icon: <Truck size={15} /> },
    { to: "/host/reviews", label: "Reviews", icon: <Star size={15} /> },
    { to: "/host/updatevans", label: "Update", icon: <Settings size={15} /> },
    { to: "/host/booking", label: "Booking", icon: <Calendar size={15} /> },
  ];

  const [isHostOpen, setIsHostOpen] = useState(false);

  return (
    <aside
      className={`fixed min-h-full ${
        isOpen ? "w-64" : "w-20"
      } bg-white shadow-lg flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        <div className="flex items-center justify-between px-4 py-4 ">
          {isOpen && (
            <Link to="/">
              <img className="w-32" src={logo} alt="#VANLIFE" />
            </Link>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-4 text-gray-700 font-medium">
          {navLinks.map((link) =>
            link.to === "/host" ? (
              <div key={link.to} className="mt-2">
                <button
                  onClick={() => setIsHostOpen(!isHostOpen)}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition-all ${
                    isHostActive
                      ? "bg-blue-100 font-semibold !text-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {isOpen ? <div className="flex flex-row gap-4">{link.icon}{link.lable}</div>:<div>{link.icon}</div>}
                  <span>
                    {isHostOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronUp size={18} />
                    )}
                  </span>
                </button>

                {isHostOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <nav className="flex flex-col gap-2">
                      {hostNavItems.map(({ to, label, icon, end }) => (
                        <NavLink
                          key={to}
                          to={to}
                          end={end}
                          className={({ isActive }) =>
                            ` ${
                              isActive
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                          }
                        >
                          {isOpen ? (
                            <div className="px-3 py-2 flex flex-row items-center gap-3 rounded-md transition">
                              {icon}
                              {label}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">{icon}</div>
                          )}
                        </NavLink>
                      )) }
                    </nav>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-100"
                  } ${!isOpen ? "justify-center" : ""}`
                }
              >
                {isOpen ? (
                  <div className="flex flex-row gap-4">{link.icon}{link.lable}</div>
                ) : (
                  <span>{link.icon}</span>
                )}
              </NavLink>
            )
          )}
        </nav>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            } ${!isOpen ? "justify-center" : ""}`
          }
        >
          <User size={22} />
          {isOpen && <span className="ml-2">Login</span>}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            } ${!isOpen ? "justify-center" : ""}`
          }
        >
          <ShoppingCart size={22} />
          {isOpen && <span className="ml-2">Cart</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Navbar;
