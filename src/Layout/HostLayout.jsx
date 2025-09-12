import React, { useEffect, useMemo } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../api";
import requireAuth from "../utils/requireAuth";
import { getCurrentUser } from "../utils/auth";
import { notification } from "antd";
const Context = React.createContext({ name: "Default" });

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
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.error({
      message: `Account Error`,
      description: (
        <Context.Consumer>
          {() =>
            `Hello, ${currentUser.name}! Sorry, you do not have this access. Please login with host ID.`
          }
        </Context.Consumer>
      ),
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: "Guest" }), []);

  if (currentUser?.hostId === "01") {
    useEffect(() => {
      openNotification("topRight");
    }, []);

    return (
      <div>
        {contextHolder}
        <Context.Provider value={contextValue}>
          <div className="bg-gray-50 h-screen flex items-center justify-center">
            <div className="text-2xl font-semibold text-gray-500">
              Sorry, you do not have this access.
            </div>
          </div>
        </Context.Provider>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-50">
        <Outlet context={{ vans }} />
      </main>
    </div>
  );
};

export default HostLayout;
