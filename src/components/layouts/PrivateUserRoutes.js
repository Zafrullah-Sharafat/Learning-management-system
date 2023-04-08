import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateUserRoutes({ children }) {
  const { isLoggedIn, role } = useAuth();
  let content = "";
  if (!isLoggedIn) {
    content = <Navigate to="/" />;
  } else if (role === "admin") {
    content = <Navigate to="/admin" />;
  } else {
    content = children;
  }
  return content;
}
