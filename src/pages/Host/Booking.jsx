import React from "react";
import { getBookedVans } from "../../api";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  return await getBookedVans();
}

const Booking = () => {
  const vans = useLoaderData();

  return (
    <div className="p-5 bg-[#FFF7ED] min-h-screen">
      <div className="text-3xl font-bold pb-2">Bookings</div>
{vans && vans.length > 0 ? (
      <div>
        <div className="py-3 text-2xl font-bold text-gray-700">Pending</div>

       {vans.map((van, i) => (
          <div key={i} className="mb-6">
            <div className="text-gray-600 font-medium mb-2">
              Order: <span className="font-semibold">{van.orderId}</span>
            </div>

            <div className="space-y-4">
              {van.items.map((i,index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <img
                      className="h-60 w-full sm:w-36 sm:h-24 object-cover rounded-lg"
                      src={i?.imageUrl}
                      alt={i.name}
                      loading="lazy"
                    />

                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {i.name}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        ${i.price} <span className="text-xs">/day</span>
                      </p>

                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Date:</span> {i.start} - {i.end}
                      </p>

                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Income:</span> ${i.income}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Link className="flex items-center justify-center gap-1 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition w-full sm:w-auto">
                      Pending
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div>No order received yet!</div>
    )}
    </div>
  );
};

export default Booking;
