import React from "react";
import HostNavbar from "../components/HostNavbar";
import { Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../api";
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

  if (currentUser?.hostId === "01") {
    return (
      <div className="bg-gray-50 h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-500">
          Sorry, you do not have this access.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white shadow-sm">
        <HostNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet context={{ vans }} />
      </main>
    </div>
  );
};

export default HostLayout;
