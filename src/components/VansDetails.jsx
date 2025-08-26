import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import {
  useParams,
  Link,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router-dom";
const VansDetails = () => {


  const Allvans = useLoaderData();
  const location = useLocation();
  const search = location.state?.search || "/vans";
  const type = location.state?.type || "all";
  return (
    <div>
      <div className="bg-[#FFF7ED] flex flex-col gap-2 pb-14 p-6 ">
        <div className=" mb-10 font-medium text-xl">
          <Link to={`/vans${search}`}>
            <div className="flex items-center gap-2">
              <ArrowLeft size={16} />
              <span className="underline">
                Back to {type.typeFilters.join(" ")} vans
              </span>
            </div>
          </Link>
        </div>
        <div className="">
          <img
            src={Allvans.imageUrl}
            alt={Allvans.name}
            className="mx-auto lg:w-3/6 md:h-full"
          />
        </div>
        <div
          className={`inline-block mt-10 py-2 w-[20%] text-center rounded-md font-semibold text-white
    ${String(Allvans.type) === "simple" && "bg-[#E17654]"}
    ${String(Allvans.type) === "rugged" && "bg-[#115E59]"}
    ${String(Allvans.type) === "luxury" && "bg-[#161616]"}
  `}
        >
          {String(Allvans.type).charAt(0).toUpperCase() +
            String(Allvans.type).slice(1)}
        </div>
        <div className="font-bold text-[26px] text-[#161616]">{Allvans.name}</div>
        <div className="text-lg">
          <b>${Allvans.price}</b>/day
        </div>
        <div className=" font-medium text-[#161616] mb-4 text-sm">
          {Allvans.description}
        </div>
        <div className="bg-[#FF8C38] h-12 w-full rounded-md content-center text-center text-[18px] font-bold text-white">
          Rent the van
        </div>
      </div>
    </div>
  );
};

export default VansDetails;


