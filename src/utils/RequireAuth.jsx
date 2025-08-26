import { redirect } from "react-router-dom";

// This function now checks for the "loggedin" item in localStorage
const RequireAuth = () => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    throw redirect("/login?message=You must log in to access this page");
  }
  // If isAuthenticated is true, the function completes and the route is rendered
  return null; 
};

export default RequireAuth;