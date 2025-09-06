import { redirect } from "react-router-dom";
export default async function requireAuth() {
  const isLoggedIn = localStorage.getItem("loggedin");
  
  if (!isLoggedIn) {
    const redirectUrl = `/login?message=You must log in first.&redirectTo=${encodeURIComponent(location.pathname)}`;
    
    throw redirect(redirectUrl);
  }
  
  return null;
}

