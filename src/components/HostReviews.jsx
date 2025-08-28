import React from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Star } from "react-feather";

const HostReviews = () => {
  const van = useOutletContext(); // This might be undefined on the first render
  const [searchParams, setSearchParams] = useSearchParams();

  // --- 1. Add Loading Guard ---
  // If the 'van' object from the context isn't available yet,
  // display a loading message to prevent a crash.
  if (!van) {
    return <h2>Loading reviews...</h2>;
  }

  const starOptions = ["1", "2", "3", "4", "5"];
  const filterReview = searchParams.get("star");

  // --- 2. Safely Access Reviews ---
  // Use a default empty array `[]` in case `van.reviews` doesn't exist.
  // This guarantees `allReviews` is always an array, preventing errors.
  const allReviews = van.reviews || [];

  const displayedReviews = filterReview
    ? allReviews.filter((review) => review.stars === parseInt(filterReview))
    : allReviews;

  const handleFilter = (type) => {
    if (filterReview !== type) {
      setSearchParams({ star: type });
    } else {
      setSearchParams({}); // Clear the filter if clicking the active one
    }
  };

  return (
    <div className="p-4">
      {/* --- 3. Improved Rendering Logic --- */}
      {/* First, check if there are any reviews at all. */}
      {allReviews.length > 0 ? (
        <>
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap mb-4">
            <h3 className="font-semibold self-center">Filter by:</h3>
            {starOptions.map((option) => (
              <button
                key={option}
                className={`inline-block px-3 py-1 rounded-md font-medium cursor-pointer transition-colors duration-200
                  ${
                    filterReview === option
                      ? "bg-[#FF8C38] text-white"
                      : "bg-[#FFEAD0] hover:bg-orange-300"
                  }
                `}
                onClick={() => handleFilter(option)}
              >
                <Star
                  size={16}
                  className={`inline mr-1.5 align-text-bottom ${
                    filterReview === option && "fill-yellow-300 text-black"
                  }`}
                />
                {option}
              </button>
            ))}
          </div>

          {/* Displayed Reviews */}
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review, idx) => (
              <div key={idx} className="mt-2 py-4 border-b last:border-b-0">
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
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <div className="font-semibold text-black">
                    {review.reviewer}
                  </div>
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
            // This message shows if filters result in no matches
            <p className="text-sm p-5 text-gray-500">
              No reviews available for this rating.
            </p>
          )}
        </>
      ) : (
        // This message shows if the van has no reviews at all
        <p className="text-md pt-4 text-gray-600">
          This van has no reviews yet.
        </p>
      )}
    </div>
  );
};

export default HostReviews;