import { redirect } from "react-router-dom";

const RequireAuth = () => {
  const isLoggedIn = localStorage.getItem("loggedin");

  if (!isLoggedIn) {
    throw redirect("/login?message=You must log in to access this page");
  }
  
  return null; 
};

export default RequireAuth;

