import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

const Vans = () => {
  const data = useLoaderData();
  const [filter, setFilter] = useState("");
  const options = ["Simple", "Luxury", "Rugged"];

  const handleClick = (option) => {
     setFilter((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option) 
        : [...prev, option]
    );
  };

  const handleClear = () => {
    setFilter("");
  };

const filteredData = filter.length > 0
  ? data.filter((van) => filter.includes(van.type.charAt(0).toUpperCase() + van.type.slice(1)))
  : data;


  return (
    <div className="bg-[#FFF7ED] ">
      <div className="font-bold p-4 pb-2 text-2xl">
        Explore our van options
      </div>
      <div className="pl-1 flex">
  {filteredData &&
    options.map((o) => (
      <div
        key={o}
        onClick={() => handleClick(o)}
        className={`active:bg-amber-200 inline-block mt-3 px-3 py-1 rounded-md mx-2 font-medium cursor-pointer 
          ${
            filter.includes(o)
              ? "bg-[#FF8C38] text-white"
              : "bg-[#FFEAD0] text-black"
          }`}
      >
        {o}
      </div>
    ))}
  <div
    onClick={handleClear}
    className="underline inline-block mt-4 pl-8 rounded-md mx-2 font-medium cursor-pointer "
  >
    Clear All
  </div>
</div>

      <div className="gap-3 pt-5 items-center grid grid-cols-2">
        {filteredData.map((data) => {
          return (
            <div key={data.id} className="p-4 rounded-lg shadow-md">
              {/* Van Image */}
              <Link to={`${data.id}`}>
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="sm:h-[400px] md:h-[300px] h-[180px] w-full object-cover rounded-md mb-3"
                />
              </Link>

              {/* Name & Price */}
              <div className="flex justify-between items-center text-sm md:text-xl sm:text-xl">
                <div className="font-semibold">{data.name}</div>
                <span>
                  <b>${data.price}</b>
                </span>
              </div>
              <div className="text-right text-xs text-gray-600">/day</div>

              {/* Van Type */}
              <div
                className={`inline-block mt-3 px-4 py-2 rounded-md font-semibold text-white
    ${String(data.type) === "simple" && "bg-[#E17654]"}
    ${String(data.type) === "rugged" && "bg-[#115E59]"}
    ${String(data.type) === "luxury" && "bg-[#161616]"}
  `}
              >
                {String(data.type).charAt(0).toUpperCase() +
                  String(data.type).slice(1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vans;

export const VansLoader = async () => {
  const res = await fetch("http://localhost:5000/vans");
  if (!res.ok) {
    throw Error("Could not found job list");
  }
  return res.json();
};
