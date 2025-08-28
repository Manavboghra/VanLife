// RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuthCom({ children }) {
  const isLoggedIn = localStorage.getItem("loggedin");
  const location = useLocation();

  if (!isLoggedIn) {
    return( <Navigate 
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} 
        state={{ message: "You must log in to access this page" }}
        replace 
      />)
  }

  return children;
}
