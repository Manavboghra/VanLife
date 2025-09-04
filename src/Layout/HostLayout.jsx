import React, { useEffect, useState } from "react";
import HostNavbar from "../components/HostNavbar";
import { Outlet, useLoaderData } from "react-router-dom";
import { getVans } from "../api";
import requireAuth from "../utils/requireAuth";

export async function loader({ request }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth(pathname);
  return getVans();
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
