import React from "react";
import { useLoaderData, Link, Outlet } from "react-router-dom";
import HostVansDetailsNavbar from "./HostVansDetailsNavbar";
import { ArrowLeft } from "react-feather";

const HostVansDetails = () => {
  const vans = useLoaderData();
  return (
    <div>
      <div className="bg-[#FFF7ED] w-full pb-14 p-6 ">
        <Link to={"/host/vans"}>
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="underline">Back to all vans</span>
          </div>
        </Link>
        <div className="bg-white rounded-md mt-7 h-full ">
          <div className=" flex gap-2">
            <div className="p-4">
              <img className="lg:h-52 h-30" src={vans.imageUrl} alt={vans.name} />
            </div>
            <div className="gap-2 mt-auto mb-auto  flex flex-col">
              <div
                className={`inline-block w-[55%] mt-4 py-[3%] text-center rounded-md font-semibold text-white
    ${String(vans.type) === "simple" && "bg-[#E17654]"}
    ${String(vans.type) === "rugged" && "bg-[#115E59]"}
    ${String(vans.type) === "luxury" && "bg-[#161616]"}
  `}
              >
                {String(vans.type).charAt(0).toUpperCase() +
                  String(vans.type).slice(1)}
              </div>
              <div className="font-bold text-xl text-[#161616]">
                {vans.name}
              </div>
              <div className="text-lg">
                <b>${vans.price}</b>/day
              </div>
            </div>
          </div>
          <div>
            <HostVansDetailsNavbar />
            <Outlet context={vans} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostVansDetails;
