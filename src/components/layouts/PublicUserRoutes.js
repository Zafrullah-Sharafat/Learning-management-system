import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicUserRoutes({ children }) {
  const { isLoggedIn, role } = useAuth();
  let content = "";
  if (isLoggedIn && role === "student") {
    content = <Navigate to="/videoplayer/1" />;
  } else if (isLoggedIn && role === "admin") {
    content = <Navigate to="/admin" />;
  } else {
    content = children;
  }

  return content;
}
