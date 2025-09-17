import React, { useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deleteVan } from "../../api";
import { Edit, Trash2 } from "react-feather";

const UpdateVans = () => {
  const { vans: initialVans = [] } = useOutletContext() || {};
  const [vans, setVans] = useState(initialVans);
  const [deleteId, setDeleteId] = useState(null);
  const [isToggleCancel, setIsToggleCancel] = useState(false);
  const ref = useRef(null);

  const handleEditClick = () => {
    ref.current?.focus();
  };

  const confirmDelete = async () => {
    try {
      await deleteVan(deleteId);
      setVans((prev) => prev.filter((van) => van.id !== deleteId));
      setIsToggleCancel(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      console.log("Failed to delete item");
    }
  };

  const cancelDelete = () => {
    setIsToggleCancel(false);
    setDeleteId(null);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="font-bold text-3xl text-gray-800 mb-6">
        Your Listed Vans
      </div>

      <div className="space-y-4">
        {vans.length > 0 ? (
          vans.map((van) => (
            <div
              key={van.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  className="h-60 w-full sm:w-36 sm:h-full object-cover rounded-lg"
                  src={van?.imageUrl}
                  alt={van.name}
                  loading="lazy"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {van.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    ${van.price} <span className="text-xs">/day</span>
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      van.type === "luxury"
                        ? "bg-blue-900 text-white "
                        : van.type === "rugged"
                        ? "bg-blue-600 text-white "
                        : "bg-blue-400 text-white "
                    }`}
                  >
                    {van.type}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  ref={ref}
                  to={`${van.id}`}
                  onClick={handleEditClick}
                  className="flex items-center justify-center gap-1 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition w-full sm:w-auto"
                >
                  <Edit size={16} />
                  Edit
                </Link>
                <button
                  onClick={() => {
                    setDeleteId(van.id);
                    setIsToggleCancel(true);
                  }}
                  className="flex items-center justify-center gap-1 bg-red-400 hover:bg-red-500 !text-white px-4 py-2 rounded-lg text-sm transition w-full sm:w-auto"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No vans listed yet.</p>
        )}
      </div>

      {isToggleCancel && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="font-semibold text-lg mb-2 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 text-sm">
              Are you sure you want to delete this van? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3 mt-5">
              <button
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm transition"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 !text-white px-4 py-2 rounded-lg text-sm transition"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVans;
