import React, { useEffect, useState } from "react";
import {
  useLoaderData,
  Link,
  Outlet,
  useParams,
  redirect,
} from "react-router-dom";
import HostVansDetailsNavbar from "./HostVansDetailsNavbar";
import { ArrowLeft } from "react-feather";
import { getVanById } from "../api";

export async function loader({ params }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const van = await getVanById(params.id);

  if (!van) {
    throw new Response("Not Found", { status: 404 });
  }

  if (van.hostId !== user.hostId) {
    return redirect("/host/vans");
  }

  return van;
}

const HostVansDetails = () => {
  const vans = useLoaderData();

  if (!vans) {
    return (
      <div className="p-6 bg-white">
        <h2>Sorry, we couldn't find that van.</h2>
        <Link to={"/host/vans"}>
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="underline">Back to all vans</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white w-full pb-14 p-6 ">
        <Link to={"/host/vans"}>
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="underline">Back to all vans</span>
          </div>
        </Link>
        <div className="bg-white rounded-md mt-7 h-full ">
          <div className=" flex gap-2 items-center p-4">
            <div className="">
              {vans.imageUrl ? (
                <img
                  className="lg:h-40 h-32 rounded-md"
                  src={vans.imageUrl}
                  alt={vans.name || "Van image"}
                />
              ) : (
                <div className="lg:h-40 h-32 w-48 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="gap-2 flex flex-col">
              {vans.type && (
                <div
                  className={`inline-block w-auto px-4 py-2 text-center rounded-md font-semibold text-white
                        ${vans.type === "simple" && "bg-blue-400"}
                        ${vans.type === "rugged" && "bg-blue-600"}
                        ${vans.type === "luxury" && "bg-blue-900"}
                    `}
                >
                  {vans.type.charAt(0).toUpperCase() + vans.type.slice(1)}
                </div>
              )}
              {vans.name && (
                <div className="font-bold text-2xl text-[#161616]">
                  {vans.name}
                </div>
              )}
              {vans.price && (
                <div className="text-lg font-bold">
                  ${Number(vans.price)}/day
                </div>
              )}
            </div>
          </div>
          <div className="">
            <HostVansDetailsNavbar />
            <Outlet context={vans} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostVansDetails;
