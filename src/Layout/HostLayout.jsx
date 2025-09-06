import React, { useEffect, useState } from "react";
import HostNavbar from "../components/HostNavbar";
import { Outlet, useLoaderData } from "react-router-dom";
import { getHostVans} from "../api";
import requireAuth from "../utils/requireAuth";

export async function loader({ request }) {
  const pathname = new URL(request.url).pathname;
  console.log(pathname);

  // wait for auth check
  await requireAuth(pathname);

  // now continue with logic
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user?.hostId) {
    throw new Error("No hostId found for current user");
  }

  return getHostVans(user.hostId);
}
  



const HostLayout = () => {
  const vans = useLoaderData();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      <HostNavbar />
      <Outlet context={{ vans, currentUser }} />
    </div>
  );
};

export default HostLayout;
