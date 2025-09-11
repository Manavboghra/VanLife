import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Star } from "react-feather";
import { DatePicker } from "antd";
import "antd/dist/reset.css";

const { MonthPicker } = DatePicker;

const Reviews = () => {
  const { vans = [] } = useOutletContext() || {};
  const [selectedMonth, setSelectedMonth] = useState(null);

  if (!vans) {
    return <h2 className="text-center text-gray-500 mt-10">Loading reviews...</h2>;
  }

  const getMonth = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

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
    <div className="flex-1 bg-gray-50 p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-3xl text-gray-800">Your Reviews</h1>
        {totalReviews > 0 && (
          <MonthPicker
            onChange={handleChange}
            placeholder="Filter by month"
            format="YYYY-MM"
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        )}
      </div>

      {totalReviews > 0 ? (
        <>
          {/* Stats Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            {starStats?.map(({ star, percentage, average }) => (
              <div key={star}>
                {average && star === 5 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-4xl font-bold text-gray-800">{average}</span>
                    <Star size={20} className="fill-amber-500 text-amber-500" />
                    <span className="text-gray-600">overall rating</span>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-2">
                  <div className="text-gray-600 w-20 text-sm font-medium">
                    {star} {star === 1 ? "star" : "stars"}
                  </div>
                  <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-gray-600">
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Reviews ({totalReviews})
            </h2>

            {vans.map((van) => (
              <div
                key={van.id}
                className="mb-10 bg-white shadow-sm rounded-xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{van.name}</h3>

                {(van?.reviews || [])?.length > 0 ? (
                  van.reviews
                    .filter(
                      (review) =>
                        !selectedMonth || getMonth(review.date) === selectedMonth
                    )
                    .map((review, idx) => (
                      <div
                        key={idx}
                        className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        {/* Stars */}
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

                        {/* Reviewer + Date */}
                        <div className="flex gap-6 mt-2 text-sm text-gray-600">
                          <div className="font-semibold">{review.reviewer}</div>
                          <div>
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>

                        {/* Comment */}
                        <p className="mt-2 text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
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
        <div className="text-gray-500 text-center py-20 text-lg">
          There are no reviews available yet.
        </div>
      )}
    </div>
  );
};

export default Reviews;
