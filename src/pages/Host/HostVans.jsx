import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const HostVans = ({ propVans }) => {
  const { vans: contextVans = [] } = useOutletContext() || {};
  const vans = propVans || contextVans;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-2xl font-semibold text-gray-800 mb-6">
        Your Listed Vans
      </div>

      {vans.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vans.map((van) => (
            <Link
              key={van.id}
              to={`${van.id}`}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="relative">
                <img
                  className="h-64 w-full object-cover rounded-t-2xl"
                  src={van?.imageUrl}
                  alt={van.name}
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md font-medium">
                  ${van.price}/day
                </div>
              </div>

              <div className="p-6">
                <div className="font-semibold text-gray-800 group-hover:text-orange-600 transition">
                  {van.name}
                </div>
                <div className="text-sm text-gray-500">{van.type}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-20 text-lg">
          You haven’t listed any vans yet.
        </div>
      )}
    </div>
  );
};

export default HostVans;
