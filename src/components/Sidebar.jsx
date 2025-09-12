import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Sidebar() {
  const { currentUser } = useOutletContext() || {};
  const [isHostOpen, setIsHostOpen] = useState(false);

  return (
    <aside className="w-64 h-screen bg-white border-r">
      <div className="p-4 font-bold text-xl">#VANLIFE</div>

      <nav className="flex flex-col space-y-2 p-4">
        <Link to="/">About</Link>
        <Link to="/vans">Vans</Link>
        <Link to="/add-vans">Add Vans</Link>

        {currentUser?.isHost && (
          <div className="mt-6">
            <button
              onClick={() => setIsHostOpen(!isHostOpen)}
              className="w-full text-left font-semibold flex items-center justify-between"
            >
              Host Panel
              <span>{isHostOpen ? "▾" : "▸"}</span>
            </button>

            {isHostOpen && (
              <div className="ml-4 mt-2 flex flex-col space-y-2">
                <Link to="/host/dashboard">Dashboard</Link>
                <Link to="/host/income">Income</Link>
                <Link to="/host/vans">Vans</Link>
                <Link to="/host/reviews">Reviews</Link>
                <Link to="/host/update">Update</Link>
                <Link to="/host/booking">Booking</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </aside>
  );
}
