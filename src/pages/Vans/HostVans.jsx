import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const HostVans = ({ propVans }) => {
  const contextVans = useOutletContext() || [];
  const vans = propVans || contextVans; 

  console.log(vans[1].hostId)
    const [currentUser, setCurrentUser] = useState(null);
  

  // const user = localStorage.getItem("currentUser");
  // console.log(user("hostId"))


    useEffect(() => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }, []);
  console.log(currentUser.hostId)


  const filter = vans.filter((van)=>van.hostId === "123" )
  console.log(filter)
  return (
    <div className="bg-[#FFF7ED] p-5">
      <div className="font-bold text-3xl">Your listed vans</div>
      <div className="gap-3 pt-4 flex flex-col w">
        {filter.map((van) => (
          <Link key={van.id} to={`${van.id}`}>
            <div className="bg-white rounded-md items-center gap-3 flex p-3">
              <div className="bg-gray-200 rounded sm:h-20 lg:h-30 h-20 w-25 lg:w-40 flex-shrink-0">
                <img
                  className="sm:h-17 lg:h-30 h-20 w-40 object-cover rounded"
                  src={van?.imageUrl}
                  alt={van.name}
                  loading="lazy"
                />
              </div>
              <div>
                <div className="font-medium text-sm">{van.name}</div>
                <div className="font-medium text-[#4D4D4D] text-xs">
                  ${van.price}/day
                </div>
              </div>
            </div>
          </Link>
        ))}
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
