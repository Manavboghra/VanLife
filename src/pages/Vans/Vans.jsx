import { button } from "@material-tailwind/react";
import React, { Suspense, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";
import { Link, useSearchParams, Await } from "react-router-dom";

const Vans = () => {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilters = searchParams.getAll("type");
  const options = ["Simple", "Luxury", "Rugged"];
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const total = vans.length;
  const totalPages = Math.ceil(total / limit);
  console.log(totalPages);

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
    const currentFilters = searchParams.getAll("type");
    if (currentFilters.includes(option.toLowerCase())) {
      const newFilters = currentFilters.filter(
        (f) => f !== option.toLowerCase()
      );
      setSearchParams(
        newFilters.length > 0 ? newFilters.map((f) => ["type", f]) : {}
      );
    } else {
      setSearchParams([
        ...currentFilters.map((f) => ["type", f]),
        ["type", option.toLowerCase()],
      ]);
    }
  };

  const handleClear = () => {
    setSearchParams({});
  };

  const typeColor = (type) => {
    switch (type) {
      case "simple":
        return "bg-[#E17654]";
      case "rugged":
        return "bg-[#115E59]";
      case "luxury":
        return "bg-[#161616]";
      default:
        return "bg-gray-500";
    }
  };

  const displayedProducts = vans.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="bg-white min-h-screen py-10 px-4 lg:px-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Explore Our Vans
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
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
                typeFilters.includes(o.toLowerCase())
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-orange-100 text-gray-700 hover:bg-orange-200"
              }`}
          >
            {o}
          </button>
        ))}
        {typeFilters.length > 0 && (
          <button
            onClick={handleClear}
            className="ml-2 underline text-gray-600 text-sm hover:text-gray-900"
          >
            Clear All
          </button>
        )}
      </div>

      <Suspense
        fallback={<div className="text-center text-lg">Loading vans...</div>}
      >
        <Await resolve={displayedProducts}>
          {(loadedVans) => {
            const displayedData =
              typeFilters.length > 0
                ? loadedVans.filter((van) =>
                    typeFilters.includes(van.type.toLowerCase())
                  )
                : loadedVans;

            return (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {displayedData.length <= 0 ? (
                  <div className="col-span-full text-center text-gray-600 text-lg">
                    No vans found. Try clearing filters.
                  </div>
                ) : (
                  displayedData.map((van) => (
                    <div
                      key={van.id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link
                        to={`${van.id}`}
                        state={{
                          search: `?${searchParams}`.toString(),
                          type: { typeFilters },
                        }}
                      >
                        <img
                          src={van?.imageUrl}
                          alt={van.name}
                          className="h-64 w-full rounded-t-2xl object-cover"
                        />
                      </Link>

                      <div className="p-5 flex  flex-col justify-between ">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-bold text-gray-900">
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
                          <span className="text-lg font-bold text-gray-900">
                            ${van.price}
                          </span>
                          <span className="text-gray-500 text-sm">/day</span>
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
            className="flex items-center px-3 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronsLeft size={18} />
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
            Prev
          </button>

          <span className="px-4 py-2 font-medium text-gray-700">
            Page <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Vans;
