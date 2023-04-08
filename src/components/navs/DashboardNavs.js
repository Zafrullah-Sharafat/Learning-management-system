import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";
import { logoutUser } from "../../features/auth/authSlice";

export default function DashboardNavs() {
  // Find the logged in user
  const user = useSelector((state) => state.auth.user);

  // Dependencies
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Logout function
  const logoutHandler = () => {
    localStorage.removeItem("auth");
    dispatch(logoutUser());
    navigate("/admin/login");
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to={user?.id ? `/admin` : `/admin/login`}>
          <img className="h-10" src={logo} alt="logo" />
        </Link>
        {user?.id && (
          <div className="flex items-center gap-3">
            <h2 className="font-bold">{user?.name}</h2>
            <button
              className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium"
              onClick={logoutHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
