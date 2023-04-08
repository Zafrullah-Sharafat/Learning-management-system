import { useSelector } from "react-redux";

export default function useAuth() {
  const authentication = { isLoggedIn: false, role: undefined };
  const user = useSelector((state) => state.auth.user);
  if (user?.id) {
    authentication.isLoggedIn = true;
    authentication.role = user.role;
  }
  return authentication;
}
