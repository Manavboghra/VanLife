import React from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Star } from "react-feather";

const HostReviews = () => {
  const van = useOutletContext();
  const starOptions = ["1", "2", "3", "4", "5"];
  const [searchParams, setSearchParams] = useSearchParams();
  const filterReview = searchParams.get("star");

  let displayedReviews = van.reviews;

  if (filterReview) {
    displayedReviews = van.reviews.filter(
      (review) => review.stars === parseInt(filterReview)
    );
  }

  const handleFilter = (type) => {
    if (filterReview !== type) {
      setSearchParams({ star: type });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <div key={van.id} className="mb-6 pt-4">
        <div className="pt-2 pl-4 flex gap-2">
          {starOptions.map((o) => (
            <div key={o}>
              <button
                className={`inline-block mt-3 px-3 py-1 rounded-md mx-2 font-medium cursor-pointer
                  ${
                    filterReview === o
                      ? "bg-[#FF8C38]"
                      : "bg-[#FFEAD0]"
                  }
                `}
                onClick={() => handleFilter(o)}
              >
                <Star size={16} className={`inline mr-1 ${filterReview === o && "fill-[#dcec31]  text-black"}`} />
                {o}
              </button>
            </div>
          ))}
        </div>

        {displayedReviews && displayedReviews.length > 0 ? (
          displayedReviews.map((review, idx) => (
            <div key={idx} className="mt-2 p-5">
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
          <p className="text-sm p-5 text-gray-500">No reviews available for this rating.</p>
        )}
      </div>
    </div>
  );
};

export default HostReviews;
