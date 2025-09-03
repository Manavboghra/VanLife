import React, { useEffect, useState } from "react";
import { ArrowLeft, Star } from "react-feather";
import { useParams, Link, useLocation, useLoaderData } from "react-router-dom";
import { getVanById } from "../../api";

export async function loader({ params }) {
  return getVanById(params.id);
}

const VansDetails = () => {
  const Allvans = useLoaderData();
  const location = useLocation();
  const search = location.state?.search || "/vans";
  const type = location.state?.type || "all";
  const allReviews = Allvans.reviews || [];
  const totalReviews = allReviews.length;

  const count = allReviews.filter((r) => r.stars).length;
  const average = (
    allReviews.reduce((sum, r) => sum + r.stars, 0) / totalReviews
  ).toFixed(1);

  // const { id } = useParams();

  // const [Allvans,setAllVans] = useState("")

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const res = await fetch(`http://localhost:5000/vans/${id}`);
  //     const vanData = await res.json();
  //     setAllVans(vanData || []);
  //   };

  //   fetchReviews();
  // }, [id]);
  return (
    <div className="bg-[#FFF7ED] p-6">
  <div className="mb-10 font-medium text-xl">
    <Link to={`/vans${search}`}>
      <div className="flex items-center gap-2">
        <ArrowLeft size={16} />
        <span className="underline">
          Back to {type.typeFilters.join(" ")} vans
        </span>
      </div>
    </Link>
  </div>

  <div className="flex flex-col lg:flex-row gap-8">
    <div className="lg:w-2/5">
      <img
        src={Allvans.imageUrl}
        alt={Allvans.name}
        className="w-full h-auto rounded-md"
      />
    </div>

    <div className="lg:w-4/5 flex flex-col gap-4">
      <div
        className={`inline-block my-2 py-2 w-[40%] text-center rounded-md font-semibold text-white
        ${String(Allvans.type) === "simple" && "bg-[#E17654]"}
        ${String(Allvans.type) === "rugged" && "bg-[#115E59]"}
        ${String(Allvans.type) === "luxury" && "bg-[#161616]"}`}
      >
        {String(Allvans.type).charAt(0).toUpperCase() +
          String(Allvans.type).slice(1)}
      </div>

      <div className="font-bold text-2xl text-[#161616]">{Allvans.name}</div>
      <div className="text-lg">
        <b>${Allvans.price}</b>/day
      </div>

      <div className="font-medium text-[#161616] lg:text-lg text-sm">{Allvans.description}</div>
    </div>
  </div>

  <div className="pt-6 mt-6 lg:mt-8 w-full">
    <div className="flex items-center gap-4 mb-4">
      <div className="text-2xl font-bold text-gray-900">Reviews</div>
      <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
        <Star size={18} className="fill-yellow-500 text-yellow-500" />
        <span className="font-bold text-gray-800">{average}</span>
        <span className="text-gray-600">({count} reviews)</span>
      </div>
    </div>

    <div className="space-y-3">
      {allReviews.length > 0 ? (
        allReviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-50 shadow-md border border-gray-200 rounded-lg p-5"
          >
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < review.stars
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-800 mb-2">{review.comment}</p>
            <p className="text-sm text-gray-500 font-medium">
              — {review.reviewer}, {review.date}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No reviews available</p>
      )}
    </div>
  </div>

  <div className="bg-[#FF8C38] h-12 w-3/4 mx-auto rounded-md text-center mb-2 text-[18px] font-bold text-white flex items-center justify-center mt-6">
    Rent the van
  </div>
</div>



  );
};

export default VansDetails;
