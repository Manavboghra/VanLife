import React, { useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deleteVan } from "../../api";

const UpdateVans = () => {
  const { vans: initialVans = []} = useOutletContext() || {};
  const [vans, setVans] = useState(initialVans);
  const ref = useRef(null);

  const handleEditClick = () => {
    ref.current.focus();
  };

  const handleDelete = async (vanId) => {
    try {
      await deleteVan(vanId);
      setVans((prev) => prev.filter((van) => van.id !== vanId));
    } catch (err) {
      console.error(err);
      console.log("Failed to delete item");
    }
  };

  return (
    <div className="bg-[#FFF7ED] p-5 pt-0">
      <div className="font-bold text-3xl">Your listed vans</div>
      <div className="gap-3 pt-4 flex flex-col ">
        {vans.map((van) => (
          <div
            key={van.id}
            className="bg-white flex flex-row justify-between items-center "
          >
            <div className=" rounded-md items-center gap-3   p-3 flex">
              <div className="bg-gray-200 rounded sm:h-20 lg:h-30 h-20 w-25 lg:w-40 flex-shrink-0">
                <img
                  className="sm:h-17 lg:h-30 h-20 w-40 object-cover rounded"
                  src={van?.imageUrl}
                  alt={van.name}
                  loading="lazy"
                />
              </div>

              <div>
                <div className="font-medium text-sm">{van.name}</div>
                <div className="font-medium text-[#4D4D4D] text-xs">
                  ${van.price}/day
                </div>
              </div>
            </div>
            <div className="flex ">
              <Link key={van.id} to={`${van.id}`}>
                <div
                  ref={ref}
                  onClick={handleEditClick}
                  className="m-0 lg:mx-2 bg-gray-100 rounded-md p-2"
                >
                  Edit
                </div>
              </Link>

              <button
                onClick={() => handleDelete(van.id)}
                className="mx-2 bg-gray-100 rounded-md p-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateVans;
