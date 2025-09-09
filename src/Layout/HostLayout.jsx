import React, { useEffect, useState } from "react";
import HostNavbar from "../components/HostNavbar";
import { Outlet, useLoaderData } from "react-router-dom";
import { getHostVans} from "../api";
import requireAuth from "../utils/requireAuth";
import { getCurrentUser } from "../utils/auth";

export async function loader({ request }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth(pathname);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user?.hostId) {
    throw new Error("No hostId found for current user");
  }

  return await getHostVans(user.hostId);
}
  



const HostLayout = () => {
  const vans = useLoaderData();
  const currentUser = getCurrentUser();
  // const [currentUser, setCurrentUser] = useState(null);
  // useEffect(() => {
  //   const user = localStorage.getItem("currentUser");
  //   if (user) {
  //     setCurrentUser(JSON.parse(user));
  //   }
  // }, []);

   if (currentUser?.hostId === "01") {
    return (
      <div className="bg-[#FFF7ED] h-full  flex items-center justify-center p-10">
        <div className="text-2xl font-semibold text-gray-500">
          Sorry, you do not have this access.
        </div>
      </div>
    );
  }

  return (
    <div>
      <HostNavbar />
      <Outlet context={{ vans}} />
    </div>
  );
};

export default HostLayout;
