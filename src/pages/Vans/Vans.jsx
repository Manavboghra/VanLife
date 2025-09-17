import React, { Suspense, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
import { Link, Await } from "react-router-dom";

const Vans = () => {
  const [vans, setVans] = useState([]);
  const [filters, setFilters] = useState([]); 
  const options = ["Simple", "Luxury", "Rugged"];
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const filteredVans =
  filters.length > 0
    ? vans.filter((van) => filters.includes(van.type.toLowerCase()))
    : vans;

const displayedProducts = filteredVans.slice(
  (currentPage - 1) * limit,
  currentPage * limit
);

const total = filteredVans.length;
const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    const fetchVans = async () => {
      const req = await fetch(`http://localhost:5000/vans`);
      if (!req.ok) {
        throw new Error(`Error: ${req.status}`);
      }
      const res = await req.json();
      setVans(res);
    };
    fetchVans();
  }, [currentPage]);

  const handleClick = (option) => {
    const lowerOption = option.toLowerCase();
    if (filters.includes(lowerOption)) {
      setFilters(filters.filter((f) => f !== lowerOption));
    } else {
      setFilters([...filters, lowerOption]);
    }
  };
  

  

  const handleClear = () => {
    setFilters([]);
  };

  const typeColor = (type) => {
    switch (type) {
      case "simple":
        return "bg-blue-400";
      case "rugged":
        return "bg-blue-600";
      case "luxury":
        return "bg-blue-900";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 lg:px-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900">
          Explore Our Vans
        </h1>
        <p className="text-blue-700 mt-2 text-lg">
          Choose the perfect van for your next adventure
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => handleClick(o)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                filters.includes(o.toLowerCase())
                  ? "bg-blue-600 !text-white shadow-md"
                  : "bg-blue-100 !text-blue-700 hover:bg-blue-200"
              }`}
          >
            {o}
          </button>
        ))}
        {filters.length > 0 && (
          <button
            onClick={handleClear}
            className="ml-2 underline text-blue-700 text-sm hover:text-blue-900"
          >
            Clear All
          </button>
        )}
      </div>

      <Suspense fallback={<div className="text-center text-lg">Loading vans...</div>}>
        <Await resolve={displayedProducts}>
          {(loadedVans) => {
            const displayedData =
              filters.length > 0
                ? loadedVans.filter((van) =>
                    filters.includes(van.type.toLowerCase())
                  )
                : loadedVans;

            return (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {displayedData.length <= 0 ? (
                  <div className="col-span-full text-center text-blue-700 text-lg">
                    No vans found. Try clearing filters.
                  </div>
                ) : (
                  displayedData.map((van) => (
                    <div
                      key={van.id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link to={`${van.id}`}>
                        <img
                          src={van?.imageUrl}
                          alt={van.name}
                          className="h-64 w-full rounded-t-2xl object-cover"
                        />
                      </Link>

                      <div className="p-5 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-bold text-blue-900">
                            {van.name}
                          </h2>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${typeColor(
                              van.type
                            )}`}
                          >
                            {van.type?.charAt(0).toUpperCase() +
                              van.type?.slice(1)}
                          </span>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-900">
                            ${van.price}
                          </span>
                          <span className="text-blue-600 text-sm">/day</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          }}
        </Await>
      </Suspense>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 border rounded-md bg-white text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            <ChevronsLeft size={18} />
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 border rounded-md bg-white text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
            Prev
          </button>

          <span className="px-4 py-2 font-medium text-blue-800">
            Page <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 border rounded-md bg-white text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            Next
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 border rounded-md bg-white text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Vans;
