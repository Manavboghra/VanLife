import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const HostVans = () => {
  const vans = useLoaderData();
  return (
    <div className="bg-[#FFF7ED] p-5">
      <div className="font-bold text-3xl">Your listed vans</div>
      <div className="gap-3 pt-4 flex flex-col w">
        {vans.map((van) =>
          (
            <Link key={van.id} to={`${van.id}`}>
              <div className="bg-white rounded-md items-center gap-3 flex p-3">
                <div>
                  <img className="sm:h-17 lg:h-30 h-20" src={van.imageUrl} alt={van.name} />
                </div>
                <div>
                  <div className="font-medium text-sm">{van.name}</div>
                  <div className="font-medium text-[#4D4D4D] text-xs">
                    ${van.price}/day
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default HostVans;

// export const HostVansLoader = async ({params}) => {
//   const {hostid} = params
//   const res = await fetch("http://localhost:5000/vans/");
//   if (!res.ok) {
//     throw Error("Could not found job list");
//   }
//   return res.json();
// };

