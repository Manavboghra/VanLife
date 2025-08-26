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
  // const [vans, setVans] = useState([]);
  // const { id } = useParams();
  // console.log(id);
  // useEffect(() => {
  //   fetch("http://localhost:5000/vans/" + id)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setVans(data);
  //     });
  // }, []);

  const vans = useLoaderData();
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
            src={vans.imageUrl}
            alt={vans.name}
            className="mx-auto lg:w-3/6 md:h-full"
          />
        </div>
        <div
          className={`inline-block mt-10 py-2 w-[20%] text-center rounded-md font-semibold text-white
    ${String(vans.type) === "simple" && "bg-[#E17654]"}
    ${String(vans.type) === "rugged" && "bg-[#115E59]"}
    ${String(vans.type) === "luxury" && "bg-[#161616]"}
  `}
        >
          {String(vans.type).charAt(0).toUpperCase() +
            String(vans.type).slice(1)}
        </div>
        <div className="font-bold text-[26px] text-[#161616]">{vans.name}</div>
        <div className="text-lg">
          <b>${vans.price}</b>/day
        </div>
        <div className=" font-medium text-[#161616] mb-4 text-sm">
          {vans.description}
        </div>
        <div className="bg-[#FF8C38] h-12 w-full rounded-md content-center text-center text-[18px] font-bold text-white">
          Rent the van
        </div>
      </div>
    </div>
  );
};

export default VansDetails;

export const VansDetailsLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`http://localhost:5000/vans/${id}`);
  if (!res.ok) {
    throw Error("Could not found job list");
  }
  return res.json();
};
