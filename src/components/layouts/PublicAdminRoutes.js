import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicAdminRoutes({ children }) {
  const { isLoggedIn, role } = useAuth();
  let content = "";
  if (isLoggedIn && role === "admin") {
    content = <Navigate to="/admin" />;
  } else if (isLoggedIn && role === "student") {
    content = <Navigate to="/videoplayer/1" />;
  } else {
    content = children;
  }

  return content;
}
