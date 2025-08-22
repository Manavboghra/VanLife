import React from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Star } from "react-feather";
import { DatePicker } from "antd";
import "antd/dist/reset.css"; 

const { MonthPicker } = DatePicker;

const Reviews = () => {
  const vans = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedMonth = searchParams.get("month");

  const getMonth = (date) =>
    new Date(date).toLocaleDateString("en-US", { year:"numeric",month: "long" });

  const handleChange = (_, dateString) => {
    if (dateString) {
      const month = new Date(dateString).toLocaleDateString("en-US", {
        year:"numeric",
        month: "long",
      });
      setSearchParams({ month });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="bg-[#FFF7ED] p-5">
      <div className="font-bold text-2xl mb-4">Your reviews</div>

      {/* Month picker filter */}
      <div className="mb-6">
        <MonthPicker
          onChange={handleChange}
          placeholder="Filter by month"
          format="YYYY-MM"
        />
      </div>

      {/* Vans & Reviews */}
      {vans.map((van) => (
        <div key={van.id} className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold">{van.name}</h2>

          {van.reviews && van.reviews.length > 0 ? (
            van.reviews
              .filter(
                (review) =>
                  !selectedMonth || getMonth(review.date) === selectedMonth
              )
              .map((review, idx) => (
                <div key={idx} className="mt-2 p-3 rounded bg-white shadow">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.stars
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <div className="flex gap-8 mt-2 text-sm">
                    <div className="font-semibold">{review.reviewer}</div>
                    <div>
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
