import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../features/auth/authApi";
import { loginUser } from "../../../features/auth/authSlice";

export default function AdminLoginForm() {
  // Dependencies
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { data: loggedInUser, isSuccess, isError, error: loginError }] =
    useLoginMutation();

  // Local States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Login handler function
  const loginHandler = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    // Login the user
    login(data);
  };

  // Side effects
  useEffect(() => {
    // If user is found
    if (isSuccess) {
      const { user } = loggedInUser;
      if (!user?.id || user?.role === "student") {
        setError("Could not find user!"); // Students are not allowed to log in using this form
      } else {
        localStorage.setItem("auth", JSON.stringify(loggedInUser));
        dispatch(loginUser(loggedInUser));
        navigate("/admin");
      }
    }
    // If error occured
    else if (isError) {
      setError(loginError?.data);
    }
  }, [navigate, isSuccess, isError, loginError, loggedInUser, dispatch]);

  return (
    <form className="mt-8 mb-2 space-y-6" onSubmit={loginHandler}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input rounded-md mb-1"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input mb-2 rounded-md"
            placeholder="Password"
          />
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Sign in
          </button>
        </div>

        {/* Show if there have any Error */}
        {error && error.length > 0 && (
          <div className="flex items-center mb-2 justify-end">
            <div className="text-sm">
              <h2 className="font-medium error-text hover:text-violet-500">
                {error}
              </h2>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
