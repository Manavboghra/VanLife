// import { redirect } from "react-router-dom";

// const RequireAuth = () => {
//   const isLoggedIn = localStorage.getItem("loggedin");

//   if (!isLoggedIn) {
//     throw redirect("/login?message=You must log in to access this page");
//   }
  
//   return null; 
// };

// export default RequireAuth;


// requireAuth.js
import { redirect } from "react-router-dom";

export default async function requireAuth() {
  //  const pathname = new URL(request.url).pathname;
  //  console.log(pathname)
  const isLoggedIn = localStorage.getItem("loggedin");

  if (!isLoggedIn) {
    
    throw redirect(`/login?redirectTo=${encodeURIComponent(location.pathname)}`);
}

  return null;
}

