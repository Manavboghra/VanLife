import React from "react";
import {
  useLoaderData,
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";

const Vans = () => {
  const data = useLoaderData();
  // const location = useLocation();
  // console.log(location)
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilters = searchParams.getAll("type");
  const options = ["Simple", "Luxury", "Rugged"];

  const displayedData =
    typeFilters.length > 0
      ? data.filter((van) => typeFilters.includes(van.type.toLowerCase()))
      : data;

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

  return (
    <div className="bg-[#FFF7ED]">
      <div className="font-bold p-4 pb-2 text-2xl">Explore our van options</div>

      <div className="pl-1 flex">
        {options.map((o) => (
          
            <div
              key={o}
              onClick={() => handleClick(o)}
              className={`inline-block mt-3 px-3 py-1 rounded-md mx-2 font-medium cursor-pointer
                ${
                  typeFilters.includes(o.toLowerCase())
                    ? "bg-[#FF8C38] text-white"
                    : "bg-[#FFEAD0] text-black"
                }`}
            >
              {o}
            </div>
          
        ))}
        <div
          onClick={handleClear}
          className="underline inline-block mt-4 pl-8 rounded-md mx-2 font-medium cursor-pointer"
        >
          Clear All
        </div>
      </div>

      <div className="gap-3 pt-5 items-center grid grid-cols-2">
        {displayedData.length <= 0 ? (
          <div className="text-5xl mx-auto my-auto mt-10">
            Items are not available...
          </div>
        ) : (
          displayedData.map((van) => (
            <div key={van.id} className="p-4 rounded-lg shadow-md">
              <Link
                to={`${van.id}`}
                state={{
                  search: `?${searchParams}`.toString(),
                  type: { typeFilters },
                }}
              >
                <img
                  src={van.imageUrl}
                  alt={van.name}
                  className="sm:h-[400px] md:h-[300px] h-[180px] w-full object-cover rounded-md mb-3"
                />
              </Link>
              <div className="flex justify-between items-center text-sm md:text-xl sm:text-xl">
                <div className="font-semibold">{van.name}</div>
                <span>
                  <b>${van.price}</b>
                </span>
              </div>
              <div className="text-right text-xs text-gray-600">/day</div>
              <div
                className={`inline-block mt-3 px-4 py-2 rounded-md font-semibold text-white
                  ${van.type === "simple" && "bg-[#E17654]"}
                  ${van.type === "rugged" && "bg-[#115E59]"}
                  ${van.type === "luxury" && "bg-[#161616]"}
                `}
              >
                {van.type.charAt(0).toUpperCase() + van.type.slice(1)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Vans;

export const VansLoader = async () => {
  try {
    const res = await fetch("http://localhost:5000/vans");
    if (!res.ok) {
      throw new Error("Could not find the van list. Please try again later.");
    }
    return res.json();
  } catch (error) {
    throw new Error("Please check your network connection and make sure the server is running.");
  }
};
