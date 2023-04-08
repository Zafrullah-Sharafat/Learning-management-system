import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateAdminRoutes({ children }) {
  const { isLoggedIn, role } = useAuth();
  let content = "";
  if (!isLoggedIn) {
    content = <Navigate to="/admin/login" />;
  } else if (role === "student") {
    content = <Navigate to="/videoplayer/1" />;
  } else {
    content = children;
  }
  return content;
}
