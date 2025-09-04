import { redirect } from "react-router-dom";
export default async function requireAuth(pathname) {
  const isLoggedIn = localStorage.getItem("loggedin");
  
  console.log(pathname)

  if (!isLoggedIn) {
    const redirectUrl = `/login?message=You must log in first.&redirectTo=${encodeURIComponent(pathname)}`;
    
    throw redirect(redirectUrl);
  }
  
  return null;
}

