import { redirect } from "react-router-dom";
export default async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("loggedin");
  
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn) {
    const redirectUrl = `/login?message=You must log in first.&redirectTo=${encodeURIComponent(pathname)}`;
    
    throw redirect(redirectUrl);
  }
  
  return null;
}

