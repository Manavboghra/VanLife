import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Star } from "react-feather";

const HostReviews = () => {
  const van = useOutletContext();
  console.log(van)
  const [filterReview, setFilterReview] = useState(null);

  if (!van) {
    return <h2>Loading reviews...</h2>;
  }

  const starOptions = ["1", "2", "3", "4", "5"];
  const allReviews = van.reviews || [];
console.log(allReviews)
  const displayedReviews = filterReview
    ? allReviews.filter((review) => review.stars === parseInt(filterReview))
    : allReviews;

  const handleFilter = (type) => {
    if (filterReview !== type) {
      setFilterReview(type);
    } else {
      setFilterReview(null);
    }
  };

  return (
    <div className="p-4">
      {allReviews.length > 0 ? (
        <>
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
            <p className="text-sm p-5 text-gray-500">
              No reviews available for this rating.
            </p>
          )}
        </>
      ) : (
        <p className="text-md pt-4 text-gray-600">
          This van has no reviews yet.
        </p>
      )}
      <div>Add new review</div>
    </div>
  );
};

export default HostReviews;
