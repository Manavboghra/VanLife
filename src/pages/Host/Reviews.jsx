import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Star } from "react-feather";
import { DatePicker } from "antd";
import "antd/dist/reset.css";

const { MonthPicker } = DatePicker;

const Reviews = () => {
  const {vans = []} = useOutletContext()||{}; 
  const [selectedMonth, setSelectedMonth] = useState(null);


  if (!vans) {
    return <h2>Loading reviews...</h2>;
  }
  


  const getMonth = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

  // Handler for the month picker
  const handleChange = (_, dateString) => {
    if (dateString) {
      const month = new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      setSelectedMonth(month);  
    } else {
      setSelectedMonth(null);
    }
  };

  const allReviews = vans.flatMap((van) => van?.reviews || []);
  const totalReviews = allReviews.length;

  const starCount = [5, 4, 3, 2, 1];
  const starStats =
    totalReviews > 0
      ? starCount.map((star) => {
          const count = allReviews.filter((r) => r.stars === star).length;
          const percentage = (count / totalReviews) * 100;
          const average = (
            allReviews.reduce((sum, r) => sum + r.stars, 0) / totalReviews
          ).toFixed(1);
          return { star, count, percentage, average };
        })
      : [];

  return (
    <div className="bg-[#FFF7ED] p-5 pt-0">
      <div className="font-bold text-3xl mb-4 p-1">Your reviews</div>

      {totalReviews > 0 ? (
        <>
          <div className="mb-6">
            <MonthPicker
              onChange={handleChange}
              placeholder="Filter by month"
              format="YYYY-MM"
            />
          </div>

          {starStats?.map(({ star, percentage, average }) => (
            <div key={star}>
              <div>
                {average && star === 5 && (
                  <div className="flex text-center items-center gap-1.5 p-1">
                    <div className="font-bold text-3xl pb-1 ">{average}</div>
                    <Star size={17} className="fill-amber-500 text-amber-500" />
                    overall rating
                  </div>
                )}
              </div>
              <div className="flex flex-row items-center gap-5 p-2 ">
                <div className="text-gray-600 w-16">
                  {star} {star === 1 ? "star" : "stars"}
                </div>
                <div className="flex-1 bg-gray-300 sm:h-4 h-2 rounded-2xl overflow-hidden">
                  <div
                    className="bg-amber-500 sm:h-4 h-2 rounded-2xl transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-right">{percentage.toFixed(0)}%</div>
              </div>
            </div>
          ))}

          {/* Individual Reviews List */}
          <div className="py-4">
            <div className="text-3xl">Reviews ({totalReviews})</div>
            {vans.map((van) => (
              <div key={van.id} className="mb-6 border-b py-4">
                <h2 className="text-lg font-semibold">{van.name}</h2>
                {(van?.reviews || [])?.length > 0 ? (
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
                  <p className="text-sm text-gray-500">No reviews yet for this van.</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 mt-4">
          There are no reviews available yet.
        </p>
      )}
    </div>
  );
};

export default Reviews;
